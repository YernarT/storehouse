<template>
	<nav class="bottom-navbar">
		<Button v-if="user.isStaff" is-icon-btn @click="$emit('scan')">
			<Icon name="md-qrcodescanner" />
		</Button>
		<Button v-else @click="$emit('filter')"> Менің билетім </Button>
	</nav>
</template>

<script setup lang="ts">
// Store
import { useUserStore } from '@/store';
// Component
import Button from '@/components/Button/index.vue';

const user = useUserStore();
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.bottom-navbar {
	@include positioned($position: fixed, $left: 0, $bottom: 0, $zIndex: 100);

	width: 100%;
	height: 72px;
	background: #fff;
	box-shadow: rgba(17, 17, 26, 0.1) 0 -1px 0;

	@include flexCenter();
}
</style>
