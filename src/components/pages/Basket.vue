<template>
  <section class="basket" aria-labelledby="basket-title">
    <header class="basket__header">
      <h2 id="basket-title">Корзина</h2>
      <span class="basket__count" v-if="items.length">{{ totalCount }} шт.</span>
    </header>

    <!-- Пустое состояние -->
    <div v-if="!items.length" class="basket__empty">
      <p>Ваша корзина пуста.</p>
      <slot name="empty-cta">
        <button class="btn" type="button" @click="$emit('go-catalog')">Перейти в каталог</button>
      </slot>
    </div>

    <!-- Список товаров -->
    <ul v-else class="basket__list">
      <li v-for="item in items" :key="item.id" class="basket__item">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          class="item__img"
          loading="lazy"
          decoding="async"
        />
        <div class="item__main">
          <div class="item__title">
            <slot name="item-title" :item="item">
              {{ item.title }}
            </slot>
          </div>

          <div class="item__meta">
            <div class="qty">
              <button
                class="qty__btn"
                type="button"
                :disabled="item.qty <= 1 || item.disabled"
                @click="changeQty(item, item.qty - 1)"
                aria-label="Уменьшить количество"
              >−</button>

              <input
                class="qty__input"
                :value="item.qty"
                inputmode="numeric"
                pattern="[0-9]*"
                aria-label="Количество"
                @change="onQtyInput(item, $event)"
              />

              <button
                class="qty__btn"
                type="button"
                :disabled="item.disabled || (item.stock != null && item.qty >= item.stock)"
                @click="changeQty(item, item.qty + 1)"
                aria-label="Увеличить количество"
              >+</button>
            </div>

            <div class="price">
              <span class="price__each">{{ formatCurrency(item.price) }}</span>
              <span class="price__sum">{{ formatCurrency(item.price * item.qty) }}</span>
            </div>
          </div>

          <div class="item__actions">
            <button class="link" type="button" @click="$emit('remove', item)">Удалить</button>
            <slot name="item-actions" :item="item" />
          </div>
        </div>
      </li>
    </ul>

    <!-- Промокод -->
    <div v-if="items.length" class="promo">
      <label class="promo__label" for="promo">Промокод</label>
      <div class="promo__row">
        <input
          id="promo"
          class="promo__input"
          v-model.trim="localPromo"
          :placeholder="promoPlaceholder"
          @keydown.enter.prevent="applyPromo"
        />
        <button class="btn" type="button" @click="applyPromo" :disabled="!localPromo">Применить</button>
      </div>
      <p v-if="promoError" class="promo__error">{{ promoError }}</p>
    </div>

    <!-- Итого -->
    <aside v-if="items.length" class="summary">
      <div class="summary__row">
        <span>Товары ({{ totalCount }})</span>
        <strong>{{ formatCurrency(subtotal) }}</strong>
      </div>
      <div class="summary__row" v-if="discountAmount > 0">
        <span>Скидка</span>
        <strong class="summary__discount">− {{ formatCurrency(discountAmount) }}</strong>
      </div>
      <div class="summary__row">
        <span>Доставка</span>
        <strong>{{ deliveryPrice == null ? "—" : formatCurrency(deliveryPrice) }}</strong>
      </div>
      <div class="summary__total">
        <span>Итого</span>
        <strong>{{ formatCurrency(total) }}</strong>
      </div>

      <!-- Выбор оплаты -->
      <div class="pay">
        <label class="pay__label">Способ оплаты</label>
        <div class="pay__methods">
          <label
            v-for="m in paymentMethods"
            :key="m.value"
            class="pay__method"
          >
            <input
              type="radio"
              name="pay-method"
              :value="m.value"
              v-model="payMethod"
            />
            <span>{{ m.label }}</span>
          </label>
        </div>
      </div>

      <button
        class="btn btn--primary summary__cta"
        type="button"
        :disabled="!canCheckout"
        @click="onCheckout"
      >
        Оплатить {{ formatCurrency(total) }}
      </button>

      <slot name="trust" />
    </aside>
  </section>
</template>

<script setup>
import { computed, reactive, toRefs, watch } from 'vue'

/**
 * Типы пропсов
 * items: [{ id, title, price, qty, image?, disabled?, stock? }]
 * promo: строка промокода из родителя (опционально)
 * discountPercent: скидка в процентах (рассчитывается как fallback, если промокод валиден в родителе)
 * deliveryPrice: стоимость доставки, null/undefined если еще не вычислена
 * currency: 'RUB' по умолчанию
 * paymentMethods: [{ value: 'sbp'|'card'|'sberpay'|'tinkoffpay'|'mirpay', label: '...' }]
 */
const props = defineProps({
  items: { type: Array, default: () => [] },
  promo: { type: String, default: '' },
  discountPercent: { type: Number, default: 0 },
  deliveryPrice: { type: Number, default: 0 },
  currency: { type: String, default: 'RUB' },
  locale: { type: String, default: 'ru-RU' },
  paymentMethods: {
    type: Array,
    default: () => ([
      { value: 'sbp', label: 'СБП (QR)' },
      { value: 'card', label: 'Банковская карта' },
      { value: 'sberpay', label: 'СберПэй' },
      { value: 'tinkoffpay', label: 'Tinkoff Pay' },
      { value: 'mirpay', label: 'Mir Pay' },
    ])
  },
  promoPlaceholder: { type: String, default: 'Введите промокод' },
})

const emit = defineEmits([
  'update:qty',          // (itemId, nextQty)
  'remove',              // (item)
  'apply-promo',         // (code) -> родитель возвращает в пропсах валидность/скидку при следующем рендере
  'checkout',            // (payload)
  'go-catalog',          // пусто
])

const state = reactive({
  localPromo: props.promo || '',
  promoError: '',
  payMethod: 'sbp',
})

watch(() => props.promo, (v) => { state.localPromo = v || '' })

const { localPromo, promoError, payMethod } = toRefs(state)

const totalCount = computed(() =>
  props.items.reduce((acc, it) => acc + Number(it.qty || 0), 0)
)

const subtotal = computed(() =>
  props.items.reduce((acc, it) => acc + Number(it.price || 0) * Number(it.qty || 0), 0)
)

// скидка по проценту (если её считает родитель иначе — можно передать 0)
const discountAmount = computed(() =>
  Math.floor((subtotal.value * Math.min(Math.max(props.discountPercent, 0), 100)) / 100)
)

const total = computed(() => {
  const delivery = props.deliveryPrice == null ? 0 : Number(props.deliveryPrice)
  return Math.max(0, subtotal.value - discountAmount.value) + delivery
})

const canCheckout = computed(() =>
  props.items.length > 0 && total.value > 0 && !!payMethod.value
)

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(n || 0)
  } catch {
    return `${(n || 0).toFixed(2)} ${props.currency}`
  }
}

function changeQty(item, next) {
  const safe = Math.max(1, Number.isFinite(next) ? next : 1)
  emit('update:qty', item.id, safe)
}

function onQtyInput(item, e) {
  const v = parseInt(String(e.target.value).replace(/\D+/g, ''), 10)
  if (Number.isFinite(v) && v > 0) changeQty(item, v)
  else changeQty(item, 1)
}

function applyPromo() {
  state.promoError = ''
  if (!state.localPromo) {
    state.promoError = 'Введите промокод'
    return
  }
  emit('apply-promo', state.localPromo)
}

function onCheckout() {
  const payload = {
    items: props.items.map(i => ({ id: i.id, qty: i.qty, price: i.price })),
    totals: {
      subtotal: subtotal.value,
      discount: discountAmount.value,
      delivery: props.deliveryPrice == null ? 0 : Number(props.deliveryPrice),
      total: total.value,
      currency: props.currency,
    },
    promo: state.localPromo || null,
    payment: {
      method: state.payMethod,
    },
  }
  emit('checkout', payload)
}
</script>

<style scoped>
.basket { display: grid; gap: 16px; max-width: 960px; margin: 0 auto; padding: 12px; }
.basket__header { display: flex; align-items: baseline; justify-content: space-between; }
.basket__count { color: #666; font-size: 14px; }
.basket__empty { padding: 24px; text-align: center; border: 1px dashed #ddd; border-radius: 12px; }
.basket__list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.basket__item { display: grid; grid-template-columns: 96px 1fr; gap: 12px; padding: 12px; border: 1px solid #eee; border-radius: 12px; background: #fff; }
.item__img { width: 96px; height: 96px; object-fit: cover; border-radius: 10px; background: #f6f6f6; }
.item__main { display: grid; gap: 8px; }
.item__title { font-weight: 600; }
.item__meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.qty { display: inline-flex; align-items: center; gap: 6px; }
.qty__btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid #ddd; background: #fafafa; cursor: pointer; }
.qty__btn:disabled { opacity: .5; cursor: not-allowed; }
.qty__input { width: 48px; text-align: center; padding: 6px 8px; border: 1px solid #ddd; border-radius: 8px; }
.price { display: flex; gap: 12px; align-items: baseline; }
.price__each { color: #666; font-size: 14px; }
.price__sum { font-weight: 600; }
.item__actions { display: flex; gap: 12px; }
.link { background: none; border: none; color: #0070f3; cursor: pointer; padding: 0; }
.promo { display: grid; gap: 6px; }
.promo__row { display: flex; gap: 8px; }
.promo__input { flex: 1; border: 1px solid #ddd; border-radius: 8px; padding: 8px 10px; }
.promo__error { color: #c62828; font-size: 13px; }
.summary { margin-top: 8px; border-top: 1px solid #eee; padding-top: 12px; display: grid; gap: 8px; }
.summary__row { display: flex; align-items: center; justify-content: space-between; }
.summary__discount { color: #2e7d32; }
.summary__total { display: flex; align-items: center; justify-content: space-between; font-size: 18px; padding-top: 4px; }
.pay { margin-top: 4px; display: grid; gap: 6px; }
.pay__methods { display: flex; gap: 10px; flex-wrap: wrap; }
.pay__method { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border: 1px solid #ddd; border-radius: 10px; background: #fff; cursor: pointer; }
.btn { border: 1px solid #ddd; border-radius: 10px; padding: 10px 14px; background: #fff; cursor: pointer; }
.btn--primary { background: #111; color: #fff; border-color: #111; }
.summary__cta { margin-top: 4px; }
@media (max-width: 560px) {
  .basket__item { grid-template-columns: 72px 1fr; }
  .item__img { width: 72px; height: 72px; }
}
</style>
