import { createApp } from 'vue'
import '../src/assets/styles/main.scss'
import App from './App.vue'
import {
    focusDirective,
    customOnDirective,
    clickOutsideDirective,
  } from '../src/directives/index.js'


import {login, signup, getCurrentSession, logout} from './Services/appwrite.service.js'

//@ts-ignore
window.login = login
//@ts-ignore
window.signup = signup
//@ts-ignore
window.getCurrentSession = getCurrentSession
//@ts-ignore
window.logout = logout

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.directive('focus', focusDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)

app.mount('#app')
