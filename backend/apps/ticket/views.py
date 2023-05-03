from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from ticket.serializers import TicketSerializer, CheckTiketSerializer
from ticket.models import Ticket

from utils.authentication import LoginRequiredAuthentication


class TicketViewSet(ModelViewSet):
    """
    Ticket API 
    """
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class CheckTicketView(APIView):

    # authentication_classes = [LoginRequiredAuthentication]
    
    def post(self, request):
        serializer = CheckTiketSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ticket = TicketSerializer(instance=Ticket.objects.get(id=request.data.get('ticket')))
        ticket.context['request'] = request

        return Response(data=ticket.data)
    