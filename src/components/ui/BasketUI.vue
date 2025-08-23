<template>
  <section class="basket" aria-labelledby="basket-title">
    <header class="basket__header">
      <h2 id="basket-title">Корзина</h2>
      <span v-if="items.length" class="basket__count">{{ totalCount }} шт.</span>
    </header>

    <!-- Пустая корзина -->
    <div v-if="!items.length" class="basket__empty">
      <p>Ваша корзина пуста</p>
      <button class="btn link" @click="$emit('go-catalog')">Перейти в каталог</button>
    </div>

    <!-- Список товаров -->
    <ul v-else class="basket__list">
      <li v-for="item in items" :key="item.id" class="basket__item">
        <img v-if="item.image" :src="item.image" :alt="item.title" class="item__img" loading="lazy" decoding="async" />

        <div class="item__main">
          <div class="item__title">{{ item.title }}</div>

          <div class="item__meta">
            <!-- Количество -->
            <div class="qty">
              <button
                class="qty__btn"
                type="button"
                :disabled="item.qty <= 1 || item.disabled"
                @click="$emit('update:qty', item.id, Math.max(1, item.qty - 1))"
                aria-label="Уменьшить количество"
              >−</button>

              <input class="qty__input" :value="item.qty" readonly aria-label="Количество" />

              <button
                class="qty__btn"
                type="button"
                :disabled="item.disabled || (item.stock != null && item.qty >= item.stock)"
                @click="$emit('update:qty', item.id, (item.stock != null ? Math.min(item.stock, item.qty + 1) : item.qty + 1))"
                aria-label="Увеличить количество"
              >+</button>
            </div>

            <!-- Цена -->
            <div class="price">
              <span class="price__each">{{ formatCurrency(item.price) }}</span>
              <span class="price__sum">{{ formatCurrency(item.price * item.qty) }}</span>
            </div>
          </div>

          <!-- Действия -->
          <div class="item__actions">
            <button class="link" type="button" @click="$emit('remove', item)">Удалить</button>
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

    <!-- Итого и оплата -->
    <div v-if="items.length" class="summary">
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
        <strong>{{ deliveryPrice == null ? '—' : formatCurrency(deliveryPrice) }}</strong>
      </div>
      <div class="summary__row summary__total">
        <span>Итого</span>
        <strong>{{ formatCurrency(total) }}</strong>
      </div>

      <!-- Способ оплаты -->
      <div class="pay">
        <label class="pay__label">Способ оплаты</label>
        <div class="pay__methods">
          <label v-for="m in paymentMethods" :key="m.value" class="pay__method">
            <input type="radio" name="pay-method" :value="m.value" v-model="payMethod" />
            <span>{{ m.label }}</span>
          </label>
        </div>
      </div>

      <div class="summary__cta">
        <button class="btn btn--primary" type="button" :disabled="!canCheckout" @click="onCheckout">
          Оплатить {{ formatCurrency(total) }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs, watch } from 'vue'

type Item = {
  id: string
  title: string
  price: number
  qty: number
  image?: string
  disabled?: boolean
  stock?: number | null
}

// compiler macros: defineProps/defineEmits/withDefaults — не импортируются
const props = withDefaults(defineProps<{
  items?: Item[]
  promo?: string
  discountPercent?: number
  deliveryPrice?: number | null
  currency?: string
  locale?: string
  paymentMethods?: { value: string; label: string }[]
  promoPlaceholder?: string
}>(), {
  items: () => [],
  promo: '',
  discountPercent: 0,
  deliveryPrice: 0,
  currency: 'RUB',
  locale: 'ru-RU',
  paymentMethods: () => ([
    { value: 'sbp',        label: 'СБП (QR)' },
    { value: 'card',       label: 'Банковская карта' },
    { value: 'sberpay',    label: 'СберПэй' },
    { value: 'tinkoffpay', label: 'Tinkoff Pay' },
    { value: 'mirpay',     label: 'Mir Pay' },
  ]),
  promoPlaceholder: 'Введите промокод',
})

const emit = defineEmits<{
  (e: 'update:qty', id: string, qty: number): void
  (e: 'remove', item: Item): void
  (e: 'apply-promo', code: string): void
  (e: 'checkout', payload: any): void
  (e: 'go-catalog'): void
}>()

const state = reactive({
  localPromo: props.promo,
  promoError: '',
  payMethod: 'sbp',
})
watch(() => props.promo, (v) => { state.localPromo = v })

const { localPromo, promoError, payMethod } = toRefs(state)

const totalCount = computed(() => props.items.reduce((a, i) => a + i.qty, 0))
const subtotal   = computed(() => props.items.reduce((a, i) => a + i.qty * i.price, 0))
const discountPct = computed(() => Math.min(Math.max(props.discountPercent, 0), 100))
const discountAmount = computed(() => Math.floor((subtotal.value * discountPct.value) / 100))
const total = computed(() => {
  const delivery = props.deliveryPrice == null ? 0 : props.deliveryPrice
  return Math.max(0, subtotal.value - discountAmount.value) + delivery
})
const canCheckout = computed(() => props.items.length > 0 && total.value > 0 && !!payMethod.value)

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).format(n)
  } catch {
    return `${n.toFixed(2)} ${props.currency}`
  }
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
  emit('checkout', {
    items: props.items.map(i => ({ id: i.id, qty: i.qty, price: i.price })),
    totals: {
      subtotal: subtotal.value,
      discount: discountAmount.value,
      delivery: props.deliveryPrice == null ? 0 : props.deliveryPrice,
      total: total.value,
      currency: props.currency,
    },
    promo: state.localPromo || null,
    payment: { method: state.payMethod },
  })
}
</script>
