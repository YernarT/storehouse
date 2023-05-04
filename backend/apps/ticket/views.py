from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from ticket.serializers import TicketSerializer, CheckTiketSerializer
from ticket.models import Ticket

from utils.authentication import LoginRequiredAuthentication
from utils.custom_exception import CustomException


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

        if not serializer.is_this_user_ticket():
            raise CustomException(message='Билет бұл пайдаланушыға тиесілі емес')

        ticket = TicketSerializer(instance=Ticket.objects.get(id=request.data.get('ticket')))
        ticket.context['request'] = request
            
        return Response(data=ticket.data)
