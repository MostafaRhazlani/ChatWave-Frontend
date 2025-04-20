import './assets/main.css'
import './plugins/axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '11a2427456ac23d6f64c',
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ` + localStorage.getItem('token')
        }
    }


});

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.mount('#app');