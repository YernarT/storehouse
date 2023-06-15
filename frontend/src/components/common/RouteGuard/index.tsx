import { I_Route } from '@/def_types/route';

// React & React 路由
import { Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
// 全局状态
import { useRecoilValue } from 'recoil';
import { S_UserIsAuthenticated } from '@/store';

// 登录页 路径
const loginURL = '/';

interface RouteGuradProps {
	routes: I_Route[];
}
// 路由守卫 V5
export default function RouteGuard({ routes }: RouteGuradProps) {
	// 当前用户状态
	const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);

	// 当前路径
	const { pathname } = useLocation();
	// 匹配路由
	const matchRoute =
		routes.find(({ path }) => path === pathname) ||
		(routes.find(({ path }) => path === '*') as I_Route);

	// 路由需要登陆 && 但用户未登录
	if (matchRoute.auth && !isAuthenticated) {
		return (
			// @ts-ignore
			<Redirect
				to={{
					pathname: loginURL,
					state: { redirectURL: pathname },
				}}
			/>
		);
	}

	return (
		// @ts-ignore
		<Switch>
			{routes.map((route, idx) => (
				// @ts-ignore
				<Route
					key={idx}
					exact={route.exact}
					path={route.path}
					render={() => {
						const Component = route.component;
						// @TODO: before mound page
						return (
							// @ts-ignore
							<Suspense fallback={route.fallback}>
								{/* @ts-ignore */}
								<Component />
							</Suspense>
						);
					}}
				/>
			))}
		</Switch>
	);
}
