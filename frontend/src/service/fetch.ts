/**
 * TODO:
 * 1. beforeFetch
 * 2. afterFetch
 * 3. error type
 */

// const HOST = 'http://192.168.100.7';
// const HOST = 'http://192.168.31.222';
// const HOST = 'http://192.168.218.157';
const HOST = 'http://192.168.100.7';
const PORT = '8000';

const BASE_URL = `${HOST}:${PORT}/api`;

import { localStorage, objectToUrlParams, convertKeysCase } from '@/utils';
import { defaultUserState } from '@/store/user';

export default {
	async get<T>(url: string, params?: object): Promise<{ data: T }> {
		if (params) {
			url += `?${objectToUrlParams(params)}`;
		}

		// before fetch
		const { token } = localStorage.get('user', defaultUserState);
		url = `${BASE_URL}${url}`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		}).catch(() => {
			return { 'isSuccess': false, message: 'Сервер уақытша жабық' };
		});

		if (response instanceof Response) {
			const data = await response.json();

			if (response.status >= 200 && response.status < 300) {
				return convertKeysCase(data!, 'camel') as any as { data: T };
			}

			return await Promise.reject(data);
		}

		return await Promise.reject(response);
	},

	async post<T>(url: string, data?: object): Promise<{ data: T }> {
		if (data) {
			data = convertKeysCase(data, 'snake');
		}

		// before fetch
		const { token } = localStorage.get('user', defaultUserState);
		url = `${BASE_URL}${url}`;

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				Authorization: token,
			},
		}).catch(() => {
			return { 'isSuccess': false, message: 'Сервер уақытша жабық' };
		});

		if (response instanceof Response) {
			data = await response.json();

			if (response.status >= 200 && response.status < 300) {
				return convertKeysCase(data!, 'camel') as any as { data: T };
			}

			return await Promise.reject(data);
		}

		return await Promise.reject(response);
	},
};
