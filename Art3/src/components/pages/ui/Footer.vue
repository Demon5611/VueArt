<template >
    <div>
        <div :class="{ 'footer-visible': isFooterVisible, footer: true }">© 2023 Production by D.S.</div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isFooterVisible = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  isFooterVisible.value = scrollY > 100; // если true, то 'footer-visible'
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped>    
</style>

<!-- анимации появления футера после скролла, вы можете использовать JavaScript и CSS-переходы. Вам нужно отслеживать событие скролла и добавлять или удалять класс в зависимости от того, насколько прокручена страница. 

:class в Vue, которая позволяет вам управлять классами HTML-элемента на основе условий.
'footer-visible': isFooterVisible - если isFooterVisible равно true, то класс footer-visible будет применен.

footer: true - всегда применяет класс footer, независимо от значения isFooterVisible.

Таким образом, если isFooterVisible равно true, то у вашего элемента будет два класса: footer-visible и footer. Если isFooterVisible равно false, то будет применен только класс footer.

const scrollY = window.scrollY; - Эта строка получает текущее значение вертикальной прокрутки страницы от верха страницы. window.scrollY возвращает количество пикселей, на которое документ прокручен вертикально. -->
