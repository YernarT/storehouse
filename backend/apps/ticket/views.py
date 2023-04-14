from django.http import JsonResponse
from utils.api_view import APIView

from ticket.models import Ticket, UserTicket


class TicketView(APIView):

    def get(self, request):
        ticket_list = [ticket.to_json() for ticket in Ticket.objects.all()]

        params = self.get_params(request)
        filter_param = params.get('filter')

        data = {
            'is_success': True,
            'data': ticket_list
        }

        if filter_param == 'me':
            user = self.get_user(request)
            me_ticket_list = [user_ticket.to_json()
                              for user_ticket in UserTicket.objects.filter(buyer=user).all()]

            data['data'] = me_ticket_list

        return JsonResponse(data, safe=False, status=200)


'''













'''
