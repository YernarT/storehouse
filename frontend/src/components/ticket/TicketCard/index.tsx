// Types
import { I_Ticket } from '@/def_types/ticket';

// React
import { memo, useMemo, useState } from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { A_User } from '@/store';

// Hooks
import { useRequest } from 'ahooks';
// API
import { API_BuyTicket } from '@/service/ticket-api';

// Antd component
import { Button, Drawer, App } from 'antd';

// Scoped style
import classes from './style.module.scss';

interface TicketCardProps {
	ticket: I_Ticket;
	onBuy?: (ticketId: number) => void
}

export default memo(function TicketCard({ ticket, onBuy }: TicketCardProps) {
	const user = useRecoilValue(A_User);
	const { message: AntdMessage } = App.useApp()
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const qrCode = useMemo(() => {
		const codeData = JSON.stringify({
			ticket: ticket.id,
			buyer: user.id
		});

		return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codeData}`;
	}, [ticket])

	const showQR = () => setIsDrawerOpen(true);

	const { runAsync } = useRequest(API_BuyTicket, { manual: true });

	const handleBuy = () => {
		runAsync({ ticket: ticket.id }).then(() => {
			AntdMessage.success('Сәтті сатып алынды');
			onBuy?.(ticket.id);
		}).catch((err) => {
			AntdMessage.error(err.message);
		})
	}


	return (
		<div className={classes.ticketCard}>
			<div className="body">
				<div className="name">Билет: {ticket.name}</div>
				{ticket.totalSold && <div className="name">Жалпы сатылды: {ticket.totalSold}</div>}
			</div>

			{!user.isStaff && (
				<div className="footer">
					{ticket.isMine ? (
						<Button onClick={showQR}>QR Code</Button>
					) : (
						<Button onClick={handleBuy}>Сатып алу</Button>
					)}
				</div>
			)}

			<Drawer
				title="QR код"
				placement='bottom'
				open={isDrawerOpen}
				closable={false}
				onClose={() => setIsDrawerOpen(false)}
			>
				<img src={qrCode} alt="QR code" />
			</Drawer>
		</div>
	);
});
