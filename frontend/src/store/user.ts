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

		toJson: state => ({
			id: state.id,
			token: state.token,
			phone: state.phone,
			fullname: state.fullname,
			isStaff: state.isStaff,
		}),
	},

	actions: {
		setUser(user: typeof defaultUserState) {
			this.id = user.id;
			this.token = user.token;
			this.phone = user.phone;
			this.fullname = user.fullname;
			this.isStaff = user.isStaff;
		},
	},
});
