#!/usr/bin/env node
/* eslint-disable no-console */
// Standalone Node.js CLI equivalent of the provided bash script.
// Usage:
//   API_URL=http://127.0.0.1:3020 node create_unit_node.js
// Requires Node 18+ (global fetch).

const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const COLORS = {
  RED: '\u001b[0;31m',
  GREEN: '\u001b[0;32m',
  YELLOW: '\u001b[1;33m',
  BLUE: '\u001b[0;34m',
  NC: '\u001b[0m',
};

const API_URL = process.env.API_URL || 'http://127.0.0.1:3020';

function log(message) {
  console.log(`${COLORS.BLUE}[INFO]${COLORS.NC} ${message}`);
}

function success(message) {
  console.log(`${COLORS.GREEN}[SUCCESS]${COLORS.NC} ${message}`);
}

function error(message) {
  console.error(`${COLORS.RED}[ERROR]${COLORS.NC} ${message}`);
}

function warning(message) {
  console.warn(`${COLORS.YELLOW}[WARNING]${COLORS.NC} ${message}`);
}

async function performApiRequest(method, endpoint, data, description) {
  log(`${description}...`);
  try {
    const url = `${API_URL}${endpoint}`;
    const init = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (method !== 'GET' && data !== undefined) {
      init.body = typeof data === 'string' ? data : JSON.stringify(data);
    }

    const response = await fetch(url, init);
    const bodyText = await response.text();

    let body;
    try {
      body = bodyText ? JSON.parse(bodyText) : {};
    } catch (e) {
      body = { raw: bodyText };
    }

    if (response.ok) {
      success(`${description} - OK`);
      return { ok: true, status: response.status, body };
    }

    error(`${description} - FAILED (HTTP: ${response.status})`);
    return { ok: false, status: response.status, body };
  } catch (e) {
    error(`${description} - FAILED (${e.message})`);
    return { ok: false, status: 0, body: { error: e.message } };
  }
}

function extractId(json) {
  if (!json) return undefined;
  const id = json.id ?? json?.data?.id;
  return id && id !== 'null' ? id : undefined;
}

function extractNodeTypeId(boardResponseJson, nodeTypeName) {
  const nodeTypes = boardResponseJson?.data?.nodeTypes;
  if (Array.isArray(nodeTypes)) {
    const found = nodeTypes.find((nt) => nt?.name === nodeTypeName);
    return found?.id;
  }
  if (boardResponseJson?.name === nodeTypeName && boardResponseJson?.id) {
    return boardResponseJson.id;
  }
  return undefined;
}

async function createUnitTypeIfNotExists(typeName, description) {
  log(`Проверка существования Unit Type: ${typeName}`);
  const list = await performApiRequest('GET', '/unit-types', undefined, 'Получение Unit Types');
  if (list.ok) {
    const names = (list.body?.data?.items ?? []).map((t) => t?.name).filter(Boolean);
    if (names.some((n) => n === typeName)) {
      log(`Unit Type '${typeName}' уже существует`);
      return true;
    }
  }
  const payload = { name: typeName, description };
  const create = await performApiRequest('POST', '/unit-types', payload, `Создание Unit Type '${typeName}'`);
  return create.ok;
}

async function autoCleanupDeadUnits() {
  log('Проверка и очистка мертвых Unit\'ов...');
  const unitsResp = await performApiRequest('GET', '/organizational-units', undefined, 'Получение Unit\'ов для очистки');
  if (!unitsResp.ok) {
    warning('Не удалось получить список Unit\'ов для очистки');
    return;
  }
  const items = unitsResp.body?.data?.items ?? [];
  const deadUnits = [];

  for (const unit of items) {
    const unitId = unit?.id;
    const unitName = unit?.name;
    const unitType = unit?.type;
    const boardId = unit?.boardId;
    const parentId = unit?.parentId;

    let isDead = false;
    let reason = '';

    if (boardId && boardId !== 'null') {
      const boardResp = await performApiRequest('GET', `/boards/${boardId}`, undefined, `Проверка доски ${boardId}`);
      if (!boardResp.ok || boardResp.body?.success === false) {
        isDead = true;
        reason = 'доска не существует';
      }
    }

    if (/^(U[0-9]+-Test|Test-.*|^Test$|^T-UNIT$)$/.test(unitName ?? '')) {
      if ((parentId === null || parentId === 'null' || !parentId) && (boardId === null || boardId === 'null' || !boardId)) {
        isDead = true;
        reason = 'тестовый Unit без связей';
      }
    }

    if ((boardId === null || boardId === 'null' || !boardId) && (parentId === null || parentId === 'null' || !parentId) && unitType !== 'Stream') {
      isDead = true;
      reason = 'сиротский Project Unit';
    }

    if (isDead && unitId) {
      log(`Мертвый Unit найден: ${unitName} (${unitType}) - ${reason}`);
      deadUnits.push({ id: unitId, name: unitName });
    }
  }

  if (deadUnits.length === 0) {
    success('Мертвые Unit\'ы не найдены');
    return;
  }

  log(`Найдено ${deadUnits.length} мертвых Unit'ов для очистки`);
  let deleted = 0;
  for (const du of deadUnits) {
    log(`Удаление мертвого Unit'а: ${du.name}`);
    const resp = await performApiRequest('DELETE', `/organizational-units/${du.id}`, undefined, 'Удаление Unit');
    if (resp.ok && (resp.body?.success ?? true)) {
      success(`Unit '${du.name}' удален`);
      deleted += 1;
    } else {
      warning(`Unit '${du.name}' не удален (API ограничения)`);
    }
  }
  success(`Очищено ${deleted} из ${deadUnits.length} мертвых Unit'ов`);
}

async function createNodeTypesAndHierarchy(boardId, boardName) {
  log(`=== Создание Node Types для доски: ${boardName} ===`);

  const initiativeResp = await performApiRequest('POST', `/boards/${boardId}/node-types`, { name: 'Initiative', allowsRecursion: false, displayOrder: 1 }, 'Создание Initiative');
  if (!initiativeResp.ok) return null;
  const initiativeId = extractNodeTypeId(initiativeResp.body, 'Initiative');
  success(`Initiative создан с ID: ${initiativeId}`);

  const epicResp = await performApiRequest('POST', `/boards/${boardId}/node-types`, { name: 'Epic', allowsRecursion: false, displayOrder: 2 }, 'Создание Epic');
  if (!epicResp.ok) return null;
  const epicId = extractNodeTypeId(epicResp.body, 'Epic');
  success(`Epic создан с ID: ${epicId}`);

  const featureResp = await performApiRequest('POST', `/boards/${boardId}/node-types`, { name: 'Feature', allowsRecursion: false, displayOrder: 3 }, 'Создание Feature');
  if (!featureResp.ok) return null;
  const featureId = extractNodeTypeId(featureResp.body, 'Feature');
  success(`Feature создан с ID: ${featureId}`);

  const taskResp = await performApiRequest('POST', `/boards/${boardId}/node-types`, { name: 'Task', allowsRecursion: false, displayOrder: 4 }, 'Создание Task');
  if (!taskResp.ok) return null;
  const taskId = extractNodeTypeId(taskResp.body, 'Task');
  success(`Task создан с ID: ${taskId}`);

  log(`=== Создание Hierarchy Rules для доски: ${boardName} ===`);
  await performApiRequest('POST', `/boards/${boardId}/hierarchy-rules`, { parentTypeId: initiativeId, childTypeId: epicId, parentTypeName: 'Initiative', childTypeName: 'Epic' }, 'Создание правила Initiative → Epic');
  await performApiRequest('POST', `/boards/${boardId}/hierarchy-rules`, { parentTypeId: epicId, childTypeId: featureId, parentTypeName: 'Epic', childTypeName: 'Feature' }, 'Создание правила Epic → Feature');
  await performApiRequest('POST', `/boards/${boardId}/hierarchy-rules`, { parentTypeId: featureId, childTypeId: taskId, parentTypeName: 'Feature', childTypeName: 'Task' }, 'Создание правила Feature → Task');

  return { initiativeId, epicId, featureId, taskId };
}

async function createUnitWithBoards(rl) {
  console.log(`${COLORS.BLUE}=== Создание Unit'а с досками ===${COLORS.NC}`);
  console.log();

  const unitName = (await rl.question(`${COLORS.YELLOW}Введите имя Unit'а:${COLORS.NC} `)).trim();

  console.log('Доступные типы Unit:');
  console.log('1) Project');
  console.log('2) Stream');
  console.log('3) Team');
  console.log('4) Trace2');
  const typeChoice = (await rl.question(`${COLORS.YELLOW}Выберите тип Unit (1-4):${COLORS.NC} `)).trim();
  const unitType = ({ '1': 'Project', '2': 'Stream', '3': 'Team', '4': 'Trace2' }[typeChoice]) || 'Project';

  log(`Создаем Unit: ${unitName} (тип: ${unitType})`);

  log('=== ШАГ 1: Проверка и создание Unit Type ===');
  const okType = await createUnitTypeIfNotExists(unitType, `Unit type for ${unitType} organizational units`);
  if (!okType) {
    error(`Не удалось создать Unit Type '${unitType}'`);
    process.exit(1);
  }

  log('=== ШАГ 2: Создание Organizational Unit ===');
  const unitPayload = { type: unitType, name: unitName, description: 'Автоматически созданный Unit' };
  const unitResp = await performApiRequest('POST', '/organizational-units', unitPayload, 'Создание Organizational Unit');
  if (!unitResp.ok) {
    error('Не удалось создать Organizational Unit');
    process.exit(1);
  }
  const unitId = extractId(unitResp.body);
  if (!unitId) {
    error('Не удалось получить ID созданного Unit');
    error(`Ответ API: ${JSON.stringify(unitResp.body)}`);
    process.exit(1);
  }
  success(`Organizational Unit создан с ID: ${unitId}`);

  const boardsCountStr = await rl.question(`${COLORS.YELLOW}Введите количество досок в Unit:${COLORS.NC} `);
  const boardsCount = Number.parseInt(boardsCountStr, 10) || 0;

  const boardIds = [];
  const childUnitIds = [];

  if (unitType === 'Stream') {
    log('=== Создание дочерних Unit\'ов для Stream Unit\'а ===');
    for (let i = 1; i <= boardsCount; i += 1) {
      console.log();
      const childUnitName = (await rl.question(`${COLORS.YELLOW}Введите имя дочернего Unit'а ${i}:${COLORS.NC} `)).trim();

      log(`=== ШАГ ${i + 2}: Создание дочернего Unit'а ${i} ===`);
      log(`Создаем дочерний Unit: ${childUnitName}`);

      const childPayload = { name: childUnitName, type: 'Project', description: `Дочерний Unit для ${unitName}`, parentId: unitId };
      const childResp = await performApiRequest('POST', '/organizational-units', childPayload, 'Создание дочернего Unit\'а');
      if (!childResp.ok) {
        error(`Не удалось создать дочерний Unit ${childUnitName}`);
        continue;
      }
      const childId = extractId(childResp.body);
      if (!childId) {
        error('Не удалось получить ID созданного дочернего Unit\'а');
        continue;
      }
      success(`Дочерний Unit создан с ID: ${childId}`);
      childUnitIds.push(childId);

      const boardName = (await rl.question(`${COLORS.YELLOW}Введите имя доски для ${childUnitName}:${COLORS.NC} `)).trim();
      log(`Создание доски '${boardName}' для дочернего Unit'а '${childUnitName}'`);
      const boardPayload = { name: boardName, organizationalUnitId: childId };
      const boardResp = await performApiRequest('POST', '/boards', boardPayload, 'Создание Board для дочернего Unit\'а');
      if (!boardResp.ok) {
        error(`Не удалось создать доску ${boardName}`);
        continue;
      }
      const boardId = extractId(boardResp.body);
      if (!boardId) {
        error('Не удалось получить ID созданной доски');
        continue;
      }
      success(`Board создан с ID: ${boardId}`);
      boardIds.push(boardId);

      await createNodeTypesAndHierarchy(boardId, boardName);
      success(`Дочерний Unit '${childUnitName}' с доской '${boardName}' полностью настроен!`);
    }
  } else {
    for (let i = 1; i <= boardsCount; i += 1) {
      console.log();
      const boardName = (await rl.question(`${COLORS.YELLOW}Введите имя доски ${i}:${COLORS.NC} `)).trim();
      log(`=== ШАГ ${i + 2}: Создание доски ${i} ===`);
      log(`Создаем доску: ${boardName}`);

      const boardPayload = { name: boardName, organizationalUnitId: unitId };
      const boardResp = await performApiRequest('POST', '/boards', boardPayload, 'Создание Board');
      if (!boardResp.ok) {
        error(`Не удалось создать доску ${boardName}`);
        continue;
      }
      const boardId = extractId(boardResp.body);
      if (!boardId) {
        error('Не удалось получить ID созданной доски');
        continue;
      }
      success(`Board создан с ID: ${boardId}`);
      boardIds.push(boardId);

      await createNodeTypesAndHierarchy(boardId, boardName);
      success(`Доска '${boardName}' полностью настроена!`);
    }
  }

  if (unitType === 'Stream') {
    log('=== Stream Unit создан с дочерними Unit\'ами ===');
    log(`Stream Unit '${unitName}' содержит ${childUnitIds.length} дочерних Unit'ов`);
    log('Каждый дочерний Unit имеет свою доску с полной структурой');
  } else {
    log('=== Project Unit создан с досками ===');
    log(`Project Unit '${unitName}' содержит ${boardIds.length} досок`);
  }

  success(`=== Unit '${unitName}' успешно создан! ===`);
  log(`Unit ID: ${unitId}`);

  if (unitType === 'Stream') {
    log(`Количество дочерних Unit'ов: ${childUnitIds.length}`);
    log(`Количество досок: ${boardIds.length}`);
    if (childUnitIds.length > 0) {
      log('Созданные дочерние Unit\'ы:');
      childUnitIds.forEach((id, index) => log(`  - Дочерний Unit ${index + 1}: ${id}`));
    }
  } else {
    log(`Количество досок: ${boardIds.length}`);
    if (boardIds.length > 0) {
      log('Созданные доски:');
      boardIds.forEach((id, index) => log(`  - Доска ${index + 1}: ${id}`));
    }
  }
}

async function addBoardToExistingUnit(rl) {
  console.log(`${COLORS.BLUE}=== Добавление доски к существующему Unit'у ===${COLORS.NC}`);
  console.log();

  log('Получение списка Unit\'ов...');
  const unitsResp = await performApiRequest('GET', '/organizational-units', undefined, 'Получение Unit\'ов');
  if (!unitsResp.ok) {
    error('Не удалось получить список Unit\'ов');
    return;
  }
  const items = unitsResp.body?.data?.items ?? [];
  const total = items.length;
  if (total === 0) {
    warning('Unit\'ы не найдены');
    return;
  }

  console.log(`${COLORS.YELLOW}Доступные Unit'ы:${COLORS.NC}`);
  items.forEach((u, i) => {
    console.log(`${i + 1}) ${u?.name} (${u?.type})`);
  });
  const choiceStr = await rl.question(`${COLORS.YELLOW}Выберите Unit для добавления доски (1-${total}):${COLORS.NC} `);
  const idx = Number.parseInt(choiceStr, 10) - 1;
  if (idx < 0 || idx >= total) {
    error('Неверный выбор Unit\'а');
    return;
  }

  const selected = items[idx];
  let unitId = selected?.id;
  const unitName = selected?.name;
  const unitType = selected?.type;
  log(`Выбран Unit: ${unitName} (тип: ${unitType}, ID: ${unitId})`);

  const boardName = (await rl.question(`${COLORS.YELLOW}Введите имя новой доски:${COLORS.NC} `)).trim();
  if (!boardName) {
    error('Имя доски не может быть пустым');
    return;
  }

  let boardId;
  if (unitType === 'Stream') {
    log(`Создание дочернего Project Unit'а для Stream Unit'а '${unitName}'`);

    const childPayload = { name: boardName, type: 'Project', description: `Дочерний Unit для ${unitName}`, parentId: unitId };
    const childResp = await performApiRequest('POST', '/organizational-units', childPayload, 'Создание дочернего Project Unit\'а');
    if (!childResp.ok) {
      error(`Не удалось создать дочерний Unit ${boardName}`);
      return;
    }
    const childId = extractId(childResp.body);
    if (!childId) {
      error('Не удалось получить ID созданного дочернего Unit\'а');
      return;
    }
    success(`Дочерний Unit создан с ID: ${childId}`);

    log('Создание доски для дочернего Unit\'а');
    const boardPayload = { name: boardName, organizationalUnitId: childId };
    const boardResp = await performApiRequest('POST', '/boards', boardPayload, 'Создание Board для дочернего Unit\'а');
    if (!boardResp.ok) {
      error(`Не удалось создать доску ${boardName}`);
      return;
    }
    boardId = extractId(boardResp.body);
    if (!boardId) {
      error('Не удалось получить ID созданной доски');
      return;
    }
    success(`Board создан с ID: ${boardId}`);
  } else {
    log(`Создание доски '${boardName}' для Unit'а '${unitName}'`);
    const boardPayload = { name: boardName, organizationalUnitId: unitId };
    const boardResp = await performApiRequest('POST', '/boards', boardPayload, 'Создание Board');
    if (!boardResp.ok) {
      error(`Не удалось создать доску ${boardName}`);
      return;
    }
    boardId = extractId(boardResp.body);
    if (!boardId) {
      error('Не удалось получить ID созданной доски');
      return;
    }
    success(`Board создан с ID: ${boardId}`);
  }

  await createNodeTypesAndHierarchy(boardId, boardName);
  success(`=== Доска '${boardName}' успешно добавлена к Unit'у '${unitName}'! ===`);
  log(`Board ID: ${boardId}`);
  log(`Unit ID: ${unitId}`);
}

async function main() {
  console.log(`${COLORS.BLUE}🚀 Универсальный скрипт создания Unit'ов${COLORS.NC}`);
  console.log(`${COLORS.BLUE}📋 Поддерживает Stream и Project Unit'ы${COLORS.NC}`);
  console.log(`${COLORS.BLUE}🧹 Автоматически очищает мертвые Unit'ы перед созданием${COLORS.NC}`);
  console.log();

  if (typeof fetch !== 'function') {
    error('Требуется Node 18+ (нужен глобальный fetch)');
    process.exit(1);
  }

  const rl = readline.createInterface({ input, output });
  try {
    log('=== АВТОМАТИЧЕСКАЯ ОЧИСТКА МЕРТВЫХ UNIT\'ОВ ===');
    await autoCleanupDeadUnits();

    console.log(`${COLORS.YELLOW}Выберите действие:${COLORS.NC}`);
    console.log('1) Создать новый Unit с досками');
    console.log('2) Добавить доску к существующему Unit\'у');
    console.log('3) Выход');
    const action = (await rl.question(`${COLORS.YELLOW}Введите номер действия (1-3):${COLORS.NC} `)).trim();

    switch (action) {
      case '1':
        await createUnitWithBoards(rl);
        break;
      case '2':
        await addBoardToExistingUnit(rl);
        break;
      case '3':
        console.log('Выход из скрипта');
        process.exit(0);
        break;
      default:
        error('Неверный выбор. Создаем новый Unit по умолчанию');
        await createUnitWithBoards(rl);
        break;
    }
  } finally {
    await rl.close();
  }
}

if (require.main === module) {
  main().catch((e) => {
    error(e?.stack || e?.message || String(e));
    process.exit(1);
  });
}
