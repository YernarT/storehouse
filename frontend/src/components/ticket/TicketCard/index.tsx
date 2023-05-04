// Types
import { I_Ticket } from '@/def_types/ticket';

// React
import { memo, useMemo } from 'react';
// Recoil
import { useRecoilValue } from 'recoil';
import { A_User } from '@/store';

// Antd component
import { Button } from 'antd';

// Scoped style
import classes from './style.module.scss';

interface TicketCardProps {
	ticket: I_Ticket;
}

export default memo(function TicketCard({ ticket }: TicketCardProps) {
	const user = useRecoilValue(A_User);

	const qrCode = useMemo(() => {
		const codeData = JSON.stringify({
			ticket: ticket.id,
			buyer: user.id
		});

		return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${codeData}`;
	}, [ticket])

	return (
		<div className={classes.ticketCard}>
			<div className="body">
				<div className="name">Билет: {ticket.name}</div>
				{ticket.totalSold && <div className="name">Жалпы сатылды: {ticket.totalSold}</div>}
			</div>

			{!user.isStaff && (
				<div className="footer">
					{ticket.isMine ? (
						<Button>QR Code</Button>
					) : (
						<Button>Сатып алу</Button>
					)}
				</div>
			)}
		</div>
	);
});
