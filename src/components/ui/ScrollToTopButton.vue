<template>
  <div
    v-if="isVisible"
    class="scroll-to-top"
    @click="scrollToTop"
    @keydown="handleKeyDown"
    role="button"
    tabindex="0"
  >
    <img alt="arrow_up" src="@/assets/arrow_up.svg" style="color: white" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useScrollStore } from "@/store/useScrollStore";

const { scrollY } = useScrollStore();
const isVisible = computed(() => scrollY.value > 100);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

