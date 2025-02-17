<template>
  <div>
    <footer :class="[{ 'footer-visible': isVisible }, 'footer']">
      © 2023 Production by D.S.
    </footer>
  </div>
</template>

<script setup>


const props = defineProps({
  isVisible: Boolean
});
</script>