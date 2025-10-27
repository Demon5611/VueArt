<template>
  <button :disabled="pending" @click="onPay">
    {{ pending ? 'Создание платежа...' : buttonText }}
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { createPayment } from '@/services/payments';

const props = defineProps({
  amount: { type: Number, required: true },
  description: { type: String, default: 'Оплата заказа' },
  currency: { type: String, default: 'RUB' },
  buttonText: { type: String, default: 'Оплатить' },
  returnPath: { type: String, default: '/payment/success' },
});

const pending = ref(false);

async function onPay() {
  try {
    pending.value = true;
    const payment = await createPayment({
      amount: props.amount,
      description: props.description,
      currency: props.currency,
      returnPath: props.returnPath,
    });
    if (payment?.confirmation_url) {
      window.location.href = payment.confirmation_url;
    }
  } catch (e) {
    alert(e?.message || 'Ошибка при создании платежа');
  } finally {
    pending.value = false;
  }
}
</script>