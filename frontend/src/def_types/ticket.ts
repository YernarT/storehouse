import type { I_User } from '@/def_types/user';

export interface I_Ticket {
	id: number;
	name: string;
	buyer: I_User;
	purchaseTime: Date;
	expirationDate: Date;
}
