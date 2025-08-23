import { createApp } from 'vue';
import App from './App.vue';

//引入element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
//引用echarts
import ECharts from 'vue-echarts';
import 'echarts';

//引用vueRouter
import router from './router/index';
import './styles/index.scss';

import { createPinia } from 'pinia';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.component('VChart', ECharts);
app.use(createPinia());
app.mount('#app');
app.use(ElementPlus, { locale: zhCn });
