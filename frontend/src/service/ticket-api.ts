import type { I_Ticket } from '@/def_types/ticket';

import fetch from '@/service/fetch';

export const API_GetAllTicket = () => fetch.get<I_Ticket[]>('/ticket/');

export interface API_BuyTicketData {
	ticket: number;
}

export const API_BuyTicket = (data: API_BuyTicketData) =>
	fetch.post<I_Ticket>('/user-ticket/', data);

export interface API_CheckTicketData {
	ticket: number;
	buyer: number;
}

export const API_CheckTicket = (data: API_CheckTicketData) =>
	fetch.post<I_Ticket>('/ticket/check', data);
