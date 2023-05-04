from rest_framework import serializers
from ticket.models import Ticket, UserTicket

from utils.custom_exception import CustomException


class TicketSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    name = serializers.CharField(label='Билет атауы', max_length=40, trim_whitespace=True, error_messages={
        'blank': 'Билет атауы бос болмауы керек',
        'required': 'Билет атауы бос болмауы керек',
        'max_length': 'Билет атауы 40 таңбадан аспауы керек',
    })
    expiration_date = serializers.DateTimeField(label='Мерзімнің өту күні')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context.get('request').user

        if user.is_authenticated:
            user_ticket = UserTicket.objects.filter(
                buyer=user, ticket=instance).first()
            if user_ticket:
                data['is_mine'] = True
                data['purchase_time'] = user_ticket.purchase_time
            else:
                data['is_mine'] = False

        return data

    class Meta:
        model = Ticket
        fields = '__all__'


class CheckTiketSerializer(serializers.Serializer):
    ticket = serializers.IntegerField(label='Билет ID', error_messages={
        'blank': 'Билет ID бос болмауы керек',
        'required': 'Билет ID бос болмауы керек',
    })
    buyer = serializers.IntegerField(label='Сатып алушы', error_messages={
        'blank': 'Сатып алушы ID бос болмауы керек',
        'required': 'Сатып алушы ID бос болмауы керек',
    })

    def is_this_user_ticket(self) -> bool:
        buyer = self.data.get('buyer')
        ticket = self.data.get('ticket')

        try:
            user_ticket = UserTicket.objects.get(buyer=buyer, ticket=ticket)
        except UserTicket.DoesNotExist:
            return False          

        return True
