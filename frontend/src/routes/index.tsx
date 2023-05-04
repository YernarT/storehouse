import { I_Route } from '@/def_types/route';

import { lazy } from 'react';
import { CommonSkeleton } from '@/components/skeleton';

const routes: I_Route[] = [
	{
		path: '/',
		component: lazy(() => import('@/pages/IntroPage')),
		fallback: <CommonSkeleton />,
		auth: false,
		exact: true,
	},

	{
		path: '/ticket',
		component: lazy(() => import('@/pages/TicketPage')),
		fallback: <CommonSkeleton />,
		auth: true,
		exact: true,
	},

	{
		path: '/login',
		component: lazy(() => import('@/pages/LoginPage')),
		fallback: <CommonSkeleton />,
		auth: false,
		exact: true,
	},

	{
		path: '/profile',
		component: lazy(() => import('@/pages/ProfilePage')),
		fallback: <CommonSkeleton />,
		auth: true,
		exact: true,
	},

	{
		path: '*',
		component: lazy(() => import('@/pages/PageNotFound')),
		fallback: <CommonSkeleton />,
		auth: false,
		exact: false,
	},
];

export default routes;
