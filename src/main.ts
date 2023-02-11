import { createApp } from 'vue'
import '../src/assets/styles/main.scss'
import App from './App.vue'
import {
    focusDirective,
    customOnDirective,
    clickOutsideDirective,
  } from './directives/index.js'

const app = createApp(App)
app.directive('focus', focusDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)

app.mount('#app')