from rest_framework import serializers
from item.models import Item, Tag, ItemTag
from user.models import User

from utils.custom_exception import CustomException
from utils.is_valid_datetime import is_valid_datetime


def validate_datetime_format(value):
    is_valid, value = is_valid_datetime(value.strip('"'), '%Y-%m-%d %H:%M:%S')

    if not is_valid:
        raise CustomException(
            'Уақыт форматы дұрыс емес, болу керек: YYYY-MM-DD hh:mm:ss')

    return value


class ItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    name = serializers.CharField(label='Зат атауы', max_length=30, trim_whitespace=True, error_messages={
        'blank': 'Зат атауы бос болмауы керек',
        'required': 'Зат атауы бос болмауы керек',
        'max_length': 'Зат атауы 30 таңбадан аспауы керек',
    })
    production_date = serializers.CharField(
        label='Өндірілген күн', max_length=30, required=False, allow_null=True)
    expiration_date = serializers.CharField(
        label='Мерзімнің өту күні', max_length=30)

    def create(self, validated_data):
        return super().create({**validated_data, 'owner': self.context['request'].user})

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context.get('request').user

        return data

    def validate_production_date(self, value):
        return validate_datetime_format(value)
    
    def validate_expiration_date(self, value):
        return validate_datetime_format(value)

    class Meta:
        model = Item
        exclude = ['owner']


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
