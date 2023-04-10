import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// Store
import { createPinia } from 'pinia';
import { useUserStore } from '@/store';

// App
import App from '@/components/App.vue';

// Global css files
import '@/assets/style/variable.css';
import '@/assets/style/reset.css';

// Routes
import routes from '@/routes';

// Router
const router = createRouter({
	routes,
	history: createWebHistory(),
});
// Store
const pinia = createPinia();
// App
const app = createApp(App);

// Use
app.use(router).use(pinia);

// Route guard
router.beforeEach(guard => {
	const user = useUserStore();

	if (guard.meta.requiresAuth && !user.isLoggedIn) return '/';
});

app.mount('#app');
