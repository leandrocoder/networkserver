import Vue from 'vue'


var App = typeof window['require'] == 'function' ? require('./App.vue') : require('./Error.vue');

new Vue({ // eslint-disable-line no-new
	el: '#app',
	render: (h) => h(App)
})
