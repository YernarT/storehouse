import type { I_User } from '@/def_types/user';

import fetch from '@/service/fetch';

export interface API_LoginData {
	login: string;
	password: string;
	isStaff: boolean;
}

export const API_Login = (data: API_LoginData) =>
	fetch.post<I_User>('/login', data);
