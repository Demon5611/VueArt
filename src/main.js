import { createApp } from 'vue';
import App from './App.vue';
import router from './services/route';  
import './scss/main.scss';
import { createPinia } from 'pinia'


window.__VUE_OPTIONS_API__ = true; // Если она установлена в true, можно использовать традиционный Options API (с data, methods, computed, и т.д.), который был в Vue 2.
window.__VUE_PROD_DEVTOOLS__ = false; // Обычно в production-разработке отключают Devtools для повышения производительности и безопасности.


const app = createApp(App);
app.use(createPinia())
app.use(router);
app.mount('#app');
