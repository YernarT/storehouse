// React
import { useState } from 'react';

// Hooks
import { useRequest } from 'ahooks';
// API
import { API_GetAllTicket } from '@/service/ticket-api';

// Antd component
import { Empty } from 'antd';
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
			{ticketList.length === 0 && <Empty description="Билет жоқ" />}
		</main>
	);
}
