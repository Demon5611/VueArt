<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal" @click="handleOverlayClick">
      <transition name="modal-animation-inner">
        <div class="modal-inner" @click.stop>
          <i class="far fa-times-circle" @click="$emit('close')"></i>

          <slot />

          <img
            src="../assets/iconClose.png"
            class="close-icon"
            @click="$emit('close')"
            alt="Close modal"
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  modalActive: Boolean,
});

const emit = defineEmits(["close"]);

const handleOverlayClick = () => {
  emit("close");
};
</script>

<style scoped>
</style>
