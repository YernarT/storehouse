<template>
	<StreamBarcodeReader class="scanner" @decode="onDecode" @loaded="onLoaded" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { StreamBarcodeReader } from 'vue-barcode-reader';

const emit = defineEmits(['resolve', 'reject']);

type timerId = ReturnType<typeof setInterval>;

const timer = reactive<{
	id: timerId | null;
	seconds: number;
}>({ id: null, seconds: 10 });

const onDecode = (value: string) => {
	emit('resolve', value);
};

const onLoaded = () => {
	timer.id = setInterval(() => {
		if (timer.seconds === 0) {
			clearInterval(timer.id as timerId);
			timer.id = null;
			timer.seconds = 10;
			emit('reject');
		} else {
			timer.seconds -= 1;
		}
	}, 1000);
};
</script>

<style style lang="scss"></style>
