<template>
	<div class="intro-page">
		<h1 class="title"><span>QR</span> Билет</h1>
		<h3 class="subtitle">QR кодға негізделген билет жүйесі</h3>

		<div class="action-group">
			<Button @click="toLogin('user')">Пайдаланушы ретінде кіру</Button>
			<Button @click="toLogin('staff')">Қызыметші ретінде кіру</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import Button from '@/components/Button/index.vue';

const router = useRouter();

const toLogin = (for_: 'user' | 'staff') => {
	router.push(`/auth/login?for=${for_}`);
};
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.intro-page {
	width: 100%;
	padding: 0 16px;

	@include centerPositioned($top: 40%);
	@include flex($direction: column, $alignItems: center);

	.title {
		font-size: 40px;
		font-weight: 700;
	}
	.subtitle {
		font-size: 26px;
		font-weight: 700;
		text-align: center;
	}

	.action-group {
		margin-top: 40px;
		@include flex($direction: column, $alignItems: center, $gap: 16px);

		.button {
			width: 100%;
		}
	}
}
</style>
