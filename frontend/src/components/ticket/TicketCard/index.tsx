// Types
import { I_Ticket } from '@/def_types/ticket';

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

export default function TicketCard({ ticket }: TicketCardProps) {
	const user = useRecoilValue(A_User);
	console.log('ticket: ', ticket);

	return (
		<div className={classes.ticketCard}>
			<div className="body">
				<div className="name">Билет: {ticket.name}</div>
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

			{/* <el-drawer v-model="isOpen" title="QR Code" direction="btt" size="50%">
			<img :src="generateQR(ticket.id)" alt="QR Code" />
		</el-drawer> */}
		</div>
	);
}

{
	/* 

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
</script> */
}
