// Types
import { I_Ticket } from '@/def_types/ticket';

// React
import { useState } from 'react';
// Recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { A_User, A_Page } from '@/store';

// Hooks
import { useRequest } from 'ahooks';
// API
import { API_GetAllTicket } from '@/service/ticket-api';

// Antd component
import { Empty } from 'antd';
// Custom component
import { QRScan, TicketCard } from '@/components/ticket';

// Scoped style
import classes from './style.module.scss';

export default function TicketPage() {
	const user = useRecoilValue(A_User);
	const [page, setPage] = useRecoilState(A_Page);
	const [ticketList, setTicketList] = useState<I_Ticket[]>([]);

	// fetch ticket list
	useRequest(API_GetAllTicket, {
		onSuccess(data) {
			setTicketList(data);
		},
	});

	return (
		<main className={classes.ticketPage}>
			{!page.scannerIsVisible &&
				ticketList.map(ticket => (
					<TicketCard key={ticket.id} ticket={ticket} />
				))}
			{!page.scannerIsVisible && ticketList.length === 0 && (
				<Empty description="Билет жоқ" />
			)}

			{user.isStaff && page.scannerIsVisible && <QRScan />}
		</main>
	);
}
