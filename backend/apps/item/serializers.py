from rest_framework import serializers
from item.models import Item

from utils.custom_exception import CustomException


class ItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    name = serializers.CharField(label='Билет атауы', max_length=40, trim_whitespace=True, error_messages={
        'blank': 'Билет атауы бос болмауы керек',
        'required': 'Билет атауы бос болмауы керек',
        'max_length': 'Билет атауы 40 таңбадан аспауы керек',
    })
    expiration_date = serializers.DateTimeField(label='Мерзімнің өту күні')

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     user = self.context.get('request').user

    #     if user.is_authenticated:
    #         user_ticket = UserTicket.objects.filter(
    #             buyer=user, ticket=instance).first()
    #         if user_ticket:
    #             data['is_mine'] = True
    #             data['purchase_time'] = user_ticket.purchase_time
    #         else:
    #             data['is_mine'] = False

    #         # 添加管理员数据
    #         if user.is_staff:
    #             data['total_sold'] = UserTicket.objects.filter(ticket=instance).count()

    #     return data

    class Meta:
        model = Item
        fields = '__all__'


