import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loading from '@/components/loading'


const app = createApp(App)

app.config.globalProperties.$imagePath = 'http://localhost/RPG_World_Laravel/public/uploads/'

app.use(store).use(router).use(loading).mount('#app')
