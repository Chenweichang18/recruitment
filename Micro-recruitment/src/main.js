import Vue from 'vue'
import App from './App'
import animate from 'animate.css'
Vue.use(animate)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
