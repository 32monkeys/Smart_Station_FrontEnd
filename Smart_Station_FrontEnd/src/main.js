import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import apiClient from './api/client'

const app = createApp(App)

// Axios: expose the client as this.$apiClient in Vue Options API components.
app.config.globalProperties.$apiClient = apiClient

app.use(router)

app.mount('#app')
