import type { NamedExoticComponent } from 'react';

export interface I_Route {
	path: string | string[];
	component:
		| React.LazyExoticComponent<() => JSX.Element>
		| React.LazyExoticComponent<NamedExoticComponent<object>>;
	fallback: JSX.Element;
	auth: boolean;
	title?: string;
	exact: boolean;
}
