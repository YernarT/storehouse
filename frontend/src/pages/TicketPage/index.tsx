// Types
import type { I_Ticket } from '@/def_types/ticket';
import type { I_User } from '@/def_types/user';


// React
import { useState, useRef } from 'react';
// Recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { A_User, A_Page } from '@/store';

// Hooks
import { useRequest, useMemoizedFn, useUpdateEffect } from 'ahooks';
// API
import { API_GetAllTicket, API_CheckTicket } from '@/service/ticket-api';
// Utils
import { isObject, has } from 'lodash';

// Antd component
import { Empty, App, Modal, Descriptions } from 'antd';
// Custom component
import { QRScan, TicketCard } from '@/components/ticket';

// Scoped style
import classes from './style.module.scss';

export default function TicketPage() {
	const user = useRecoilValue(A_User);
	const [page, setPage] = useRecoilState(A_Page);
	const { message: AntdMessage } = App.useApp();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [checkedTicket, setCheckedTicket] = useState<I_Ticket & { buyer: I_User } | null>(null);
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

	// 已扫描
	const isScanned = useRef(false);
	// 处理扫描结果
	const handleScan = useMemoizedFn((result: string) => {
		// 已经扫描, 跳过逻辑
		if (isScanned.current) {
			return;
		}

		AntdMessage.info('Билет тексерілуде...');
		setPage({ scannerIsVisible: false });
		isScanned.current = true;

		try {
			result = JSON.parse(result);
		} catch (err) {
			AntdMessage.error('QR код билет емес');
			return;
		}

		if (isObject(result) && has(result, 'ticket') && has(result, 'buyer')) {
			checkTicket(result)
				.then(data => {
					// 检查票有没有过期
					if (new Date().getTime() > new Date(data.expirationDate).getTime()) {
						AntdMessage.warning('Билет мерзімі өтіп кеткен');
					} else {
						setCheckedTicket(data);
						setIsModalOpen(true);
					}
				})
				.catch(err => {
					AntdMessage.error(err.message);
				})
			return;
		}

		AntdMessage.error('QR код жасанды');
	});

	// 扫描结束后重置变量
	useUpdateEffect(() => {
		if (page.scannerIsVisible === false && isScanned.current === true) {
			isScanned.current = false;
		}
	}, [page.scannerIsVisible])

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
			{user.isStaff &&
				<Modal title="QR код нәтижесі"
					footer={null}
					open={isModalOpen}
					onCancel={() => setIsModalOpen(false)}
				>
					<Descriptions column={1}>
						<Descriptions.Item label="Билет">{checkedTicket?.name}</Descriptions.Item>
						<Descriptions.Item label="Сатып алушы">{checkedTicket?.buyer.fullname || 'Аты жоқ'}</Descriptions.Item>
						<Descriptions.Item label="Сатып алушы нөмері">{checkedTicket?.buyer.phone}</Descriptions.Item>
						<Descriptions.Item label="Сатып алған уақыт">{new Date(checkedTicket?.purchaseTime as any as string).toLocaleString()}</Descriptions.Item>
					</Descriptions>
				</Modal>}
		</main>
	);
}
