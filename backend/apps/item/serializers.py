from rest_framework import serializers
from item.models import Item, Tag, ItemTag
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

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context.get('request').user

        print('user: ', user, user.is_authenticated)
        print('data: ', data)

        return data

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

    def validated_color(self, value):
        print('color: ', value)
        return super().validate(value)

    def validated_background_color(self, value):
        print('background_color: ', value)
        return super().validate(value)

    def create(self, validated_data):
        return super().create({**validated_data, 'creator': self.context['request'].user})

    def to_representation(self, instance):
        data = super().to_representation(instance)
        associated_items = ItemTag.objects.filter(tag=instance).all()
        data['associated_items'] = list(
            map(lambda ai: ai.id, associated_items))

        return data

    class Meta:
        model = Tag
        exclude = ['creator']


class DeleteTagSerialzier(serializers.Serializer):
    ids = serializers.ListField(min_length=1, child=serializers.IntegerField())
