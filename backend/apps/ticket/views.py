from django.http import JsonResponse
from utils.api_view import APIView

from ticket.models import Ticket, UserTicket


class TicketView(APIView):

    def get(self, request):
        user = self.get_user(request)

        ticket_list = [ticket for ticket in Ticket.objects.all()]

        for ticket in ticket_list:
            ticket.is_mine = True if UserTicket.objects.filter(
                ticket=ticket, buyer=user) else False

        ticket_list = [ticket.to_json() for ticket in ticket_list]

        data = {
            'is_success': True,
            'data': ticket_list
        }

        return JsonResponse(data, safe=False, status=200)


class UserTicketView(APIView):

    def post(self, request):
        user = self.get_user(request)
        data = self.get_data(request)
        ticket_id = data.get('ticket')
        ticket = Ticket.objects.get(id=ticket_id)

        UserTicket.objects.create(buyer=user, ticket=ticket)

        data = {'is_success': True}

        return JsonResponse(data, status=201)
