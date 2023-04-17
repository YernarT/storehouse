import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// Store
import { createPinia } from 'pinia';
import { useUserStore } from '@/store';

// App
import App from '@/components/App.vue';
// Icons
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdQrcodescanner } from 'oh-vue-icons/icons';
// UI Lib
import ElementPlus from 'element-plus';

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

addIcons(MdQrcodescanner);

// Extend
app.use(router).use(pinia).use(ElementPlus);
app.component('Icon', OhVueIcon);

// Route guard
router.beforeEach(guard => {
	const user = useUserStore();

	if (guard.meta.requiresAuth && !user.isLoggedIn) return '/';
});

app.mount('#app');
