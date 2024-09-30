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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-inner {
  background: white;
  border-radius: 8px;
  position: relative;
  
  max-width: 90%;
  max-height: 90%;
  box-sizing: border-box;
  overflow: hidden;
}

.close-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  z-index: 1001;
}

.far.fa-times-circle {
  font-size: 24px;
}
/* Анимация плавного появления/исчезновения модального окна */
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 1s ease, transform 1s ease; /* Плавное появление */
}

.modal-animation-enter,
.modal-animation-leave-to {
  opacity: 0; /* Начальная прозрачность */
  transform: scale(0.9); /* Уменьшенный масштаб */
}

.modal-animation-enter-to {
  opacity: 1; /* Конечная прозрачность */
  transform: scale(1); /* Нормальный масштаб */
}

.modal-animation-leave {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 768px) {
  .modal-inner {
    max-width: 90%;
    max-height: 65%;
  }

  .modal-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Масштабируем изображение по размеру модального окна */
  }

  .close-icon {
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 576px) {
  .modal-inner {
    width: 95%;
    max-height: 60%;
  }

  .close-icon {
    top: 10px;
    right: 10px;
    width: 18px;
    height: 18px;
  }
}
</style>
