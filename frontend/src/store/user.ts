import { defineStore } from 'pinia';

export const defaultUserState = {
	id: 0,
	token: '',
	phone: '',
	fullname: '',
	isStaff: false,
};

export const useUserStore = defineStore('user', {
	state: () => {
		const localData = localStorage.getItem('user');

		if (localData) {
			return JSON.parse(localData);
		}

		return defaultUserState;
	},

	getters: {
		isLoggedIn: state => state.token !== '',
	},
});
