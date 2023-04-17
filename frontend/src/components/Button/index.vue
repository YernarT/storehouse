<template>
	<button
		class="button"
		:class="{ 'button--disabled': isDisable, 'button--icon-btn': isIconBtn }"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
defineProps({
	isDisable: {
		type: Boolean,
		default: false,
	},

	isIconBtn: {
		type: Boolean,
		default: false,
	},
});
</script>

<style scoped lang="scss">
@import '@/assets/style/variable.scss';
@import '@/assets/style/mixins.scss';

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

	&--icon-btn {
		@include flexCenter();

		:deep(svg) {
			width: 32px;
			height: 32px;
		}
	}

	&--disabled {
		background: darken($color: $primaryColor, $amount: 0.1);
	}
}
</style>
