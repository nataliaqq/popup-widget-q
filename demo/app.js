import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js'
Vue.use(httpVueLoader)

new Vue({
  el: '#app',
  components: {
  	'popup-widget': httpVueLoader('./src/PopupWidget.vue')
  }
})
