<template>
  <div v-if="isVisible" class="scroll-to-top" @click="scrollToTop" @keydown="handleKeyDown" role="button" tabindex="0">
    <img alt="arrow_up"  src="../../icons/arrow_up.svg" style= "color:white"/>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  components: {
  },
  // setup используется для настройки и инициализации компонента.
  setup() {
    const isVisible = ref(false);
    // ref - это функция из Composition API, которая используется для создания реактивных переменных. 
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    const handleScroll = () => {
      isVisible.value = window.pageYOffset > 100;
    };
    // проверяет, прокрутилась ли страница на более чем 100 пикселей от верхнего края.

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    // что задали, то и вернули 
    return {
      isVisible,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
</style>


<!-- <img alt="arrow_up"  src="../../icons//arrow_up.svg" style= "color:white"/>
можно сделать динамичную иконку. создается шаблон в отдельном файле и сюда подставляется шаблон с нужным именем. имя тынется из локальной базы иконок
https://mkay11.medium.com/heres-a-simple-solution-to-incorporate-inline-svgs-in-vue-vite-da5897a480f7
еще
https://v3.ru.vuejs.org/ru/cookbook/editable-svg-icons.html#%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B8-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80 -->