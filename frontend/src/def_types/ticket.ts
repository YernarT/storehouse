import type { I_User } from '@/def_types/user';

export interface I_Ticket {
	id: number;
	name: string;
	buyer: I_User;
	isMine: boolean;
	purchaseTime: Date;
	expirationDate: Date;
}
