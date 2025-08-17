<template>
  <BasketUI
    :items="items"
    @update:qty="onUpdateQty"
    @remove="onRemove"
    @checkout="onCheckout"
    @go-catalog="$router.push('/')"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCartStore } from "@/store/cart";
import BasketUI from "@/components/ui/BasketUI.vue";

const cart = useCartStore();
onMounted(() => cart.hydrate());

const items = computed(() => cart.items);

function onUpdateQty(id: string, qty: number) {
  cart.updateQty(id, qty);
}

function onRemove(item: { id: string }) {
  cart.remove(item.id);
}

function onCheckout(payload: any) {
  console.log("checkout payload", payload);
}
</script>
