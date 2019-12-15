import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js'
import { PopupWidget } from '../src/index.js'

new Vue({
  el: '#app',
  data: {
  	message: 'hello'
  },
  components: {
  	PopupWidget
  }


})
