<template>
	<div class="login-page">
		<h3 class="title">Жүйеге кіру</h3>

		<div class="group">
			<label class="label" for="idInput">{{ loginLabel }}</label>
			<Input
				id="idInput"
				class="field"
				:value="formData.login"
				@change="value => (formData.login = value)"
			/>
		</div>

		<div class="group">
			<label class="label" for="passwordInput">Құпия сөз</label>
			<Input
				id="passwordInput"
				class="field"
				:value="formData.password"
				@change="value => (formData.password = value)"
			/>
		</div>

		<Button class="primary-btn" @click="handleLogin">Кіру</Button>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
// Router
import { useRoute, useRouter } from 'vue-router';
// Hooks
import { useRequest } from 'vue-hooks-plus';
// Store
import { useUserStore } from '@/store';
// Component
import Input from '@/components/Input/index.vue';
import Button from '@/components/Button/index.vue';
// Service
import { API_Login } from '@/service/user-api';

const route = useRoute();
const router = useRouter();
const { for: userType = 'user' } = route.query;

const user = useUserStore();

const formData = reactive({
	login: '',
	password: '',
});

const { runAsync } = useRequest(API_Login, {
	manual: true,
});

const loginLabel = computed(() => {
	if (userType === 'user') {
		return 'Телефон нөмер';
	}

	return 'Қызыметкер ID';
});

const handleLogin = () => {
	runAsync({
		...formData,
		is_staff: userType !== 'user',
	})
		.then(({ data }) => {
			user.setUser(data);
			localStorage.setItem('user', JSON.stringify(user.toJson));
			router.push('/ticket');
		})
		.catch(error => {
			alert(error.message);
		});
};
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.login-page {
	width: 100%;
	padding: 0 16px;

	@include centerPositioned($top: 40%);
	@include flex($direction: column, $alignItems: center);

	.title {
		font-size: 40px;
		font-weight: 700;
		margin-bottom: 32px;
	}

	.group,
	.group .field,
	.primary-btn {
		width: 100%;
	}

	.group {
		@include flex($direction: column, $gap: 4px);
		margin-bottom: 16px;
	}

	.primary-btn {
		margin-top: 16px;
	}
}
</style>
