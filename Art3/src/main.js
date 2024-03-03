window.__VUE_OPTIONS_API__ = true;
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import './scss/main.scss';


const app = createApp(App);
createApp(App).mount('#app')