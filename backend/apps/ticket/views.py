from django.http import JsonResponse
from utils.api_view import APIView

from ticket.models import Ticket


class TicketView(APIView):

    def get(self, _):
        ticket_list = [ticket.to_json() for ticket in Ticket.objects.all()]

        data = {
            'is_success': True,
            'data': ticket_list
        }

        return JsonResponse(data, safe=False, status=200)
