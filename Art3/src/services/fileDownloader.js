let cachedFiles = {};

// Функция для скачивания CV с кешированием
export const downloadCVWithCache = (fileUrl, fileName) => {
  // Проверяем, был ли файл уже скачан
  if (!cachedFiles[fileName]) {
    // Если файла нет в кеше, загружаем его
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    cachedFiles[fileName] = true;
  } else {
    // Если файл уже был скачан, выводим сообщение
    alert(`Файл "${fileName}" уже был скачан. Проверьте папку "Загрузки".`);
    console.log(`Файл "${fileName}" уже был скачан.`);
  }
};
