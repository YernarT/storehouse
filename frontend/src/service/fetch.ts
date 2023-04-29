/**
 * TODO:
 * 1. beforeFetch
 * 2. afterFetch
 * 3. error type
 */

const HOST = 'http://127.0.0.1';
const PORT = '8000';

const BASE_URL = `${HOST}:${PORT}/api`;

import { localStorage, objectToUrlParams, convertKeysCase } from '@/utils';
import { defaultUserState } from '@/store/user-atom';

function requestWithData(method: 'POST' | 'PATCH' | 'PUT' | 'DELETE') {
	return async <T>(url: string, data?: object): Promise<T> => {
		if (data) {
			data = convertKeysCase(data, 'snake');
		}

		// before fetch
		const { token } = localStorage.get('user', defaultUserState);
		url = `${BASE_URL}${url}`;

		const response = await fetch(url, {
			method,
			body: JSON.stringify(data),
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		}).catch(() => {
			return { isSuccess: false, message: 'Сервер уақытша жабық' };
		});

		if (response instanceof Response) {
			data = await response.json();

			if (response.status >= 200 && response.status < 300) {
				return convertKeysCase(data!, 'camel') as any as T;
			}

			return await Promise.reject(data);
		}

		return await Promise.reject(response);
	};
}

export default {
	async get<T>(url: string, params?: object): Promise<T> {
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
				'Content-Type': 'application/json',
			},
		}).catch(() => {
			return { isSuccess: false, message: 'Сервер уақытша жабық' };
		});

		if (response instanceof Response) {
			const data = await response.json();

			if (response.status >= 200 && response.status < 300) {
				return convertKeysCase(data!, 'camel') as any as T;
			}

			return await Promise.reject(data);
		}

		return await Promise.reject(response);
	},

	post: requestWithData('POST'),
	patch: requestWithData('PATCH'),
	put: requestWithData('PUT'),
	delete: requestWithData('DELETE'),
};
