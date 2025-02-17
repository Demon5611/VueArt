<template>
  <div>
    <Suspense>
      <template #default>
        <Mainpage id="mainpage" />
      </template>
      <template #fallback>
        <div>Загрузка главной страницы...</div>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <Blog id="blog" />
      </template>
      <template #fallback>
        <div>Загрузка блога...</div>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <Galarypage id="gallery" />
      </template>
      <template #fallback>
        <div>Загрузка галереи...</div>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <Contactpage id="contacts" />
      </template>
      <template #fallback>
        <div>Загрузка контактов...</div>
      </template>
    </Suspense>
  </div>
</template>
  
  <script setup>
import { defineAsyncComponent } from "vue";

const Mainpage = defineAsyncComponent(() =>
  import("@/components/pages/MainPage.vue")
);
const Blog = defineAsyncComponent(() =>
  import("@/components/pages/BlogPage.vue")
);
const Galarypage = defineAsyncComponent(() =>
  import("@/components/pages/GalaryPage.vue")
);
const Contactpage = defineAsyncComponent(() =>
  import("@/components/pages/ContactPage.vue")
);
</script>
  