from rest_framework import serializers
from item.models import Item, Tag
from user.models import User

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




class TagSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    name = serializers.CharField(label='Тег атауы', max_length=12, trim_whitespace=True, error_messages={
        'blank': 'Тег атауы бос болмауы керек',
        'required': 'Тег атауы бос болмауы керек',
        'max_length': 'Тег атауы 12 таңбадан аспауы керек',
    })
    color = serializers.CharField(label='Шрифт түсі', max_length=22, trim_whitespace=True, error_messages={
        'blank': 'Шрифт түсі бос болмауы керек',
        'required': 'Шрифт түсі бос болмауы керек',
        'max_length': 'Шрифт түсі 22 таңбадан аспауы керек',
    })
    background_color = serializers.CharField(label='Фон түсі', max_length=22, trim_whitespace=True, error_messages={
        'blank': 'Фон түсі түсі бос болмауы керек',
        'required': 'Фон түсі түсі бос болмауы керек',
        'max_length': 'Фон түсі түсі 22 таңбадан аспауы керек',
    })
    creator = serializers.PrimaryKeyRelatedField(label='Құрушысы', queryset=User.objects.all(), write_only=True)

    def validated_color(self, value):
        print('color: ', value)
        return super().validate(value)
    
    def validated_background_color(self, value):
        print('background_color: ', value)
        return super().validate(value)

    class Meta:
        model = Tag
        fields = '__all__'