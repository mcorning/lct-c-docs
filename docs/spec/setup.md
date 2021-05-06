# LCT Setup

## VuexORM

Install Vuex, vuex-orm, and vuex-orm-localforage at the same time.

```bash
npm i vuex @vuex-orm/core vuex-orm-localforage
```

Don't forget to update your main.js to register Vuex:

```js
import store from './store';    // loading store.js loads all the other dependent files for Vuex-ORM
new Vue({
  vuetify,
  store,                        // <=====    It's easy to overlook this step. If you do, you will see a runtime error similar to "Fetch() is not a method."
  render: (h) => h(App),
}).$mount('#app');

```

## Socket.io

The client interacts with server over web sockets. We use socket.io because it's a bit easier to use, and it has some features we will incorporate in future versions of LCT.

A good introduction to using Socket.io, Vue, and Heroku is available: https://github.com/alexwidua/vue-socketio-heroku-starter
