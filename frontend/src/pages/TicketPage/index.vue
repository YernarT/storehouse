<template>
	<div class="ticket-page">
		<div v-show="!state.showScan" class="ticket-list">
			<TicketCard
				v-for="ticket in state.ticketList"
				:key="ticket.id"
				:ticket="ticket"
				class="ticket"
				@buy="handleBuy"
			/>
		</div>

		<QRScan v-if="user.isStaff && state.showScan" @resolve="handleScan" />
		<BottomNavbar
			@scan="state.showScan = !state.showScan"
			@filter="handleFilter"
		/>
	</div>
</template>

<script setup lang="ts">
import type { I_Ticket } from '@/def_types/ticket';

import { reactive } from 'vue';

// Components
import QRScan from '@/components/QRScan/index.vue';
import TicketCard from '@/components/TicketCard/index.vue';
import BottomNavbar from '@/components/BottomNavbar/index.vue';
// UI Lib
import { ElNotification } from 'element-plus';
// Hooks
import { useRequest } from 'vue-hooks-plus';
// Store
import { useUserStore } from '@/store';
// Service
import { API_GetAllTicket } from '@/service/ticket-api';

const state = reactive({
	showScan: false,
	ticketList: [] as I_Ticket[],
});
const user = useUserStore();

useRequest(API_GetAllTicket, {
	onSuccess({ data }) {
		state.ticketList = data;
	},
});

const handleScan = (value: string) => {
	state.showScan = false;

	ElNotification({
		title: 'QR Нәтиже',
		message: value,
	});
};

const handleFilter = () => {
	console.log(state.ticketList);
	console.log(typeof state.ticketList);
	state.ticketList = state.ticketList.filter(ticket => ticket.isMine);
};

const handleBuy = (ticket: I_Ticket) => {
	state.ticketList = state.ticketList.map(item => {
		if (item.id === ticket.id) {
			item.isMine = true;
		}

		return ticket;
	});
};
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.ticket-page {
	height: 100%;
	overflow: auto;

	.ticket-list {
		@include flex($direction: column, $gap: 16px);
		padding: 16px;
		padding-bottom: calc(16px + 72px);

		.ticket {
		}
	}
}
</style>
