<template>
  <section class="basket">
    <header>
      <h2>Корзина</h2>
      <span v-if="items.length">{{ totalCount }} шт.</span>
    </header>

    <div v-if="!items.length">
      <p>Ваша корзина пуста</p>
      <button @click="$emit('go-catalog')">Перейти в каталог</button>
    </div>

    <ul v-else>
      <li v-for="item in items" :key="item.id">
        {{ item.title }} — {{ item.qty }} × {{ item.price }} ₽
        <button @click="$emit('update:qty', item.id, item.qty - 1)">−</button>
        <button @click="$emit('update:qty', item.id, item.qty + 1)">+</button>
        <button @click="$emit('remove', item)">Удалить</button>
      </li>
    </ul>

    <div v-if="items.length">
      <strong>Итого: {{ total }} ₽</strong>
      <button @click="onCheckout">Оплатить</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps, defineEmits } from 'vue'

type Item = { id: string; title: string; price: number; qty: number }

const props = withDefaults(defineProps<{
  items?: Item[]
}>(), {
  items: () => [],
})

const emit = defineEmits<{
  (e: 'update:qty', id: string, qty: number): void
  (e: 'remove', item: Item): void
  (e: 'checkout', payload: any): void
  (e: 'go-catalog'): void
}>()

const totalCount = computed(() => props.items.reduce((a, i) => a + i.qty, 0))
const total = computed(() => props.items.reduce((a, i) => a + i.qty * i.price, 0))

function onCheckout() {
  emit('checkout', {
    items: props.items,
    total: total.value,
  })
}
</script>
