<template>
	<input class="input" :type="type" @change="handleChange" />
</template>

<script setup lang="ts">
defineProps({
	type: {
		type: String,
		default: 'text',
	},

	value: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['change']);

const handleChange = (payload: Event) => {
	emit('change', (payload.target as HTMLInputElement).value);
};
</script>

<style scoped lang="scss">
@import '@/assets/style/variable.scss';

.input {
	padding: 12px 16px;
	color: inherit;

	outline: none;
	border: 1px solid #cad6e4;
	border-radius: var(--border-radius);

	transition: border-color var(--transition);

	&:focus {
		border-color: var(--c-primary);
	}
}
</style>
