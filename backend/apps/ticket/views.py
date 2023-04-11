from django.http import JsonResponse
from utils.api_view import APIView

from ticket.models import Ticket


class TicketView(APIView):

    def get(self, request):
        ticket_list = [ticket.to_json() for ticket in Ticket.objects.all()]

        return JsonResponse(ticket_list, safe=False, status=200)
