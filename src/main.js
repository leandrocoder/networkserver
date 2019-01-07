/*
import Vue from 'vue'

var App = typeof window['require'] == 'function' ? require('./App.vue') : require('./Error.vue');

new Vue({ // eslint-disable-line no-new
	el: '#app',
	render: (h) => h(App)
})
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var isElectron = typeof window['require'] == 'function';
var App = isElectron ? require('./App.vue') : require('./Error.vue');

let routes = [];
if (isElectron == true)
{
	routes = [
		{ path: '/', component: require("./components/Home.vue") }
	]
}

const router = new VueRouter({
  routes: routes
})

new Vue({
	el: '#app',
	router,
	render: (h) => h(App)
})
