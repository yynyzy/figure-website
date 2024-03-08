import { createApp } from 'vue';
import 'element-plus/dist/index.css'
import '@/assets/style/init.css';
import '@/assets/style/default.css';
import App from './App.vue';
import componentsPlugin from './components';
import {
  router,
  VueAxios,
  createPinia,
} from './FrontendCore';


const app = createApp(App);

app.
use(router).
use(VueAxios).
use(componentsPlugin).
use(createPinia()).
mount('#app');


export default app;
