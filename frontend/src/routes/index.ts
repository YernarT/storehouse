import IntroPage from '@/pages/IntroPage/index.vue';
import LoginPage from '@/pages/LoginPage/index.vue';

export default [
	{
		path: '/',
		component: IntroPage,
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/auth/login',
		component: LoginPage,
		meta: {
			requiresAuth: false,
		},
	},
];
