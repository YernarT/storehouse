// Types
import { I_Ticket } from '@/def_types/ticket';

// React
import { useState } from 'react';
// Recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { A_User, A_Page } from '@/store';

// Hooks
import { useRequest, useMemoizedFn } from 'ahooks';
// API
import { API_GetAllTicket, API_CheckTicket } from '@/service/ticket-api';
// Utils
import { isObject, has } from 'lodash';

// Antd component
import { Empty, App } from 'antd';
// Custom component
import { QRScan, TicketCard } from '@/components/ticket';

// Scoped style
import classes from './style.module.scss';

export default function TicketPage() {
	const user = useRecoilValue(A_User);
	const [page, setPage] = useRecoilState(A_Page);
	const { message: AntdMessage } = App.useApp();
	const [ticketList, setTicketList] = useState<I_Ticket[]>([]);

	// fetch ticket list
	useRequest(API_GetAllTicket, {
		onSuccess(data) {
			setTicketList(data);
		},
	});

	// check ticket
	const { runAsync: checkTicket } = useRequest(API_CheckTicket, {
		manual: true,
	});

	const handleScan = useMemoizedFn((result: string) => {
		AntdMessage.success('QR код анықталды', 0.5, () => {
			AntdMessage.info('Билет тексерілуде...');
		});
		setPage({ scannerIsVisible: false });

		try {
			result = JSON.parse(result);
		} catch (err) {
			console.log(err);
			AntdMessage.error('QR код билет емес');
			return;
		}

		if (isObject(result) && has(result, 'ticket') && has(result, 'buyer')) {
			checkTicket(result)
				.then(data => {
					console.log('data: ', data);
				})
				.catch(err => {
					AntdMessage.error(err.message);
				})
			return;
		}

		AntdMessage.error('QR код билет емес');
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

			{user.isStaff && page.scannerIsVisible && <QRScan onResolve={handleScan} />}
		</main>
	);
}
