<template>
	<div class="ticket-card">
		<div class="body">
			<div class="name">Билет: {{ ticket.name }}</div>
		</div>

		<div v-if="!user.isStaff" class="footer">
			<Button v-if="!ticket.isMine" @click="handleBuy">Сатып алу</Button>
			<Button v-else="!ticket.isMine" @click="isOpen = true">QR Code</Button>
		</div>

		<el-drawer v-model="isOpen" title="QR Code" direction="btt" size="50%">
			<img :src="generateQR(ticket.id)" alt="QR Code" />
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
// Types
import { I_Ticket } from '@/def_types/ticket';

import { ref } from 'vue';
// Hooks
import { useRequest } from 'vue-hooks-plus';
// Store
import { useUserStore } from '@/store';
// Service
import { API_BuyTicket } from '@/service/ticket-api';
// Components
import Button from '@/components/Button/index.vue';

const props = defineProps<{ ticket: I_Ticket }>();
const emit = defineEmits(['buy']);
const user = useUserStore();

const isOpen = ref(false);

const { runAsync } = useRequest(API_BuyTicket, {
	manual: true,
});

const handleBuy = () => {
	runAsync({ ticket: props.ticket.id })
		.then(() => {
			emit('buy', props.ticket);
		})
		.catch(error => {
			alert(error.message);
		});
};

const generateQR = (ticketId: number) =>
	`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`;
</script>

<style scoped lang="scss">
.ticket-card {
	width: 100%;
	border-radius: var(--border-radius);
	box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

	.body,
	.footer {
		padding: 16px;
	}

	.footer {
		border-top: 1px solid #eee;
	}
}
</style>
