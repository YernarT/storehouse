<template>
	<button class="button">
		<slot></slot>
	</button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '@/assets/style/variable.scss';

.button {
	color: #fff;
	text-align: center;

	padding: 14px 20px;
	outline: none;
	border: none;
	border-radius: var(--border-radius);
	background-color: var(--c-primary);

	cursor: pointer;
	transition: background-color var(--transition);

	&:active {
		background-color: lighten($color: $primaryColor, $amount: 10%);
	}
}
</style>
