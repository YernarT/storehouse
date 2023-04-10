import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// App
import App from '@/components/App.vue';

// Global css files
import '@/assets/style/variable.css';
import '@/assets/style/reset.css';

// Routes
import routes from '@/routes';

const router = createRouter({
	routes,
	history: createWebHistory(),
});

createApp(App).use(router).mount('#app');
