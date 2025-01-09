import './styles/index.scss';
import {createApp} from 'vue'
import Cookies from 'js-cookie';
import ElementPlus from 'element-plus'
import  ElementPlusRu from 'element-plus/es/locale/lang/ru'
import 'element-plus/dist/index.css'
import router from './router';
import i18n from './lang'; // Internationalization
import App from './views/App.vue'
import './permission'; // permission control
import 'bootstrap-icons/font/bootstrap-icons.scss'


import Icon from './components/Icon/Icon.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(i18n)

app.config.globalProperties.productionTip = false;

app.use(ElementPlus, {
    locale: ElementPlusRu,
  size: Cookies.get('size') || 'medium', // set element-plus default size
  i18n: (key, value) => i18n.t(key, value),
});

// pinia
import {createPinia} from 'pinia'
app.use(createPinia())

// element svg icon
import ElSvgIcon from '@/components/ElSvgIcon.vue'

app.component('ElSvgIcon', ElSvgIcon)

app.component('Icon', Icon)

app.use(router).mount('#app')
