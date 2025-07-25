import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ApolloPlugin from './plugins/apollo'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ApolloPlugin)

app.mount('#app')
