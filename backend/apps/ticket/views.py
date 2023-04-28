from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from ticket.serializers import TicketSerializer
from ticket.models import Ticket


class TicketViewSet(ModelViewSet):
    """
    Ticket API 
    """
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
