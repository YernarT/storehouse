// Types
import { I_Ticket } from '@/def_types/item';

// React
import { useState } from 'react';

// Hooks
import { useRequest } from 'ahooks';
// API
import { API_GetAllTicket } from '@/service/item-api';

// Antd component
import { Empty } from 'antd';
// Custom component
import { TicketCard } from '@/components/ticket';

// Scoped style
import classes from './style.module.scss';

export default function MyTicket() {
	const [ticketList, setTicketList] = useState<I_Ticket[]>([]);

	// fetch ticket list
	useRequest(API_GetAllTicket, {
		onSuccess(data) {
			setTicketList(data.filter(ticket=>ticket.isMine));
		},
	});

	return (
		<div className={classes.myTicket}>
			{ticketList.map(ticket => (
				<TicketCard key={ticket.id} ticket={ticket} />
			))}
			{ticketList.length === 0 && <Empty description="Билет жоқ" />}
		</div>
	);
}
