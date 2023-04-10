<template>
	<div class="safe-area">
		<router-view />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.safe-area {
	width: 100%;
	height: 100%;

	@include centerPositioned();

	@media screen and (min-width: 520px) {
		width: 430px;
		height: 680px;
		border-radius: var(--border-radius);
		box-shadow: rgba(50, 50, 93, 0.25) 0 50px 100px -20px,
			rgba(0, 0, 0, 0.3) 0 30px 60px -30px;
	}
}
</style>
