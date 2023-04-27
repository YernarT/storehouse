export interface I_Ticket {
	id: number;
	name: string;
	isMine: boolean;
	purchaseTime: Date;
	expirationDate: Date;
}
