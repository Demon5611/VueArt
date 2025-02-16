<template>
  <div class="app">
    <Navbar />
    <ScrollToTopButton />
    <Suspense>
      <template #default>
        <LazyMainpage />
      </template>
      <template #fallback>
        <div class="loading">Загрузка...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <LazyBlog />
      </template>
      <template #fallback>
        <div class="loading">Загрузка...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <LazyGalarypage />
      </template>
      <template #fallback>
        <div class="loading">Загрузка...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <LazyContactpage />
      </template>
      <template #fallback>
        <div class="loading">Загрузка...</div>
      </template>
    </Suspense>

    <div ref="endOfAppPage" class="end-marker"></div>

    <Suspense>
      <template #default>
        <LazyFooter :isVisible="isFooterVisible" />
      </template>
      <template #fallback>
        <div class="loading">Загрузка футера...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import Navbar from "./components/pages/ui/Navbar.vue";
import ScrollToTopButton from "./components/pages/ui/ScrollToTopButton.vue";

const LazyMainpage = defineAsyncComponent(() =>
  import("./components/pages/Mainpage.vue")
);
const LazyBlog = defineAsyncComponent(() =>
  import("./components/pages/Blog.vue")
);
const LazyGalarypage = defineAsyncComponent(() =>
  import("./components/pages/Galarypage.vue")
);
const LazyContactpage = defineAsyncComponent(() =>
  import("./components/pages/Contactpage.vue")
);
const LazyFooter = defineAsyncComponent(() =>
  import("./components/pages/ui/Footer.vue")
);

const isFooterVisible = ref(false);
const endOfAppPage = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isFooterVisible.value = entry.isIntersecting;
    },
    {
      root: null,
      threshold: 1.0,
    }
  );

  if (endOfAppPage.value) {
    observer.observe(endOfAppPage.value);
  }

  onUnmounted(() => {
    if (endOfAppPage.value) {
      observer.unobserve(endOfAppPage.value);
    }
  });
});
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>
