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
