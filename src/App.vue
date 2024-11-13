<template>
  <div class="app">
    <Navbar />
    <ScrollToTopButton />
    <Mainpage />
    <Blog />
    <Galarypage />
    <Contactpage />
    <div ref="endOfAppPage" class="end-marker"></div>
    <Footer :isVisible="isFooterVisible" />
  </div>
</template>

<script setup>
import Navbar from './components/pages/ui/Navbar.vue'
import ScrollToTopButton from './components/pages/ui/ScrollToTopButton.vue'
import Footer from './components/pages/ui/Footer.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import Mainpage from './components/pages/Mainpage.vue'
import Galarypage from './components/pages/Galarypage.vue'
import Blog from './components/pages/Blog.vue'
import Contactpage from './components/pages/Contactpage.vue'

const isFooterVisible = ref(false)

const endOfAppPage = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isFooterVisible.value = entry.isIntersecting
    },
    {
      root: null,
      threshold: 1.0
    }
  )

  if (endOfAppPage.value) {
    observer.observe(endOfAppPage.value)
  }

  onUnmounted(() => {
    if (endOfAppPage.value) {
      observer.unobserve(endOfAppPage.value)
    }
  })
})
</script>

