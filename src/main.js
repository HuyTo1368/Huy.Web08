import { createApp } from 'vue'
import App from './App.vue'
import MISAenum from './js/enum'

let app = createApp(App);

app.config.globalProperties.MISAenum = MISAenum
app.use(MISAenum);
app.mount('#app')

