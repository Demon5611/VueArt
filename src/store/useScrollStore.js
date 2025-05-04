import { ref, onMounted, onUnmounted } from "vue";
import throttle from "lodash.throttle";

const scrollY = ref(0);
let isListening = false;

// throttled scroll handler
const onScroll = throttle(() => {
  scrollY.value = window.scrollY;
}, 100);

export function useScrollStore() {
  onMounted(() => {
    if (!isListening) {
      window.addEventListener("scroll", onScroll);
      isListening = true;
    }
  });

  onUnmounted(() => {
    if (isListening) {
      window.removeEventListener("scroll", onScroll);
      isListening = false;
    }
  });

  return {
    scrollY,
  };
}
