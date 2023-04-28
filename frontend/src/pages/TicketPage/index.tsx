// React
import { useState } from 'react';

// Hooks
import { useRequest } from 'ahooks';
// API
import { API_GetAllTicket } from '@/service/ticket-api';

// Custom component
import { TicketCard } from '@/components/ticket';

// Scoped style
import classes from './style.module.scss';
import { I_Ticket } from '@/def_types/ticket';

export default function TicketPage() {
	const [ticketList, setTicketList] = useState<I_Ticket[]>([]);

	// fetch ticket list
	useRequest(API_GetAllTicket, {
		onSuccess(data) {
			setTicketList(data);
		},
	});

	return (
		<main className={classes.ticketPage}>
			{ticketList.map(ticket => (
				<TicketCard key={ticket.id} ticket={ticket} />
			))}
		</main>
	);
}

{
	/* <template>
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

		<QRScan
			v-if="user.isStaff && state.showScan"
			@resolve="handleScan"
			@reject="handleScanError"
		/>
		<BottomNavbar
			@scan="state.showScan = !state.showScan"
			@filter="handleFilter"
		/>

		<el-drawer
			v-model="state.showScanResult"
			title="QR Нәтиже"
			direction="btt"
			size="50%"
		>
			<div class="qr-result">
				<div v-if="!state.scanResult.isSuccess" class="error">
					{{ state.scanResult.message }}
				</div>
				<div v-else class="success">
					{{ state.scanResult.message }}
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import type { I_Ticket } from '@/def_types/ticket';

import { reactive } from 'vue';

// Components
import QRScan from '@/components/QRScan/index.vue';
import TicketCard from '@/components/TicketCard/index.vue';
import BottomNavbar from '@/components/BottomNavbar/index.vue';
// Hooks
import { useRequest } from 'vue-hooks-plus';
// Store
import { useUserStore } from '@/store';
// Service
import { API_GetAllTicket } from '@/service/ticket-api';

const state = reactive({
	showScan: false,
	showScanResult: false,
	scanResult: {
		isSuccess: true,
		message: '',
	},
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
	state.showScanResult = true;
	state.scanResult.isSuccess = true;
	state.scanResult.message = `Билет: ${value}`;
};

const handleScanError = () => {
	state.showScan = false;
	state.showScan = false;
	state.showScanResult = true;
	state.scanResult.isSuccess = false;
	state.scanResult.message = 'QR код танылмады';
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
	}

	.qr-result {
		.error {
			color: #e20d0d;
		}
	}
}
</style> */
}
