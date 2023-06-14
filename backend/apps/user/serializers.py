from django.contrib.auth.hashers import check_password

from rest_framework import serializers
from user.models import User

from utils.custom_exception import CustomException


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    phone = serializers.CharField(label='Телефон нөмер', max_length=11, trim_whitespace=True, error_messages={
        'blank': 'Телефон нөмер бос болмауы керек',
        'required': 'Телефон нөмер бос болмауы керек',
        'max_length': 'Телефон нөмер 11 саннан құралу керек',
    })
    password = serializers.CharField(
        label='Құпиясөз', write_only=True, max_length=254, trim_whitespace=True, error_messages={
            'blank': 'Құпиясөз бос болмауы керек',
            'required': 'Құпиясөз бос болмауы керек',
            'max_length': 'Құпиясөз 254 таңбадан аспауы керек',
        })
    is_staff = serializers.BooleanField(label='Қызметші?', required=False, error_messages={
        'invalid': 'is_staff өрісі boolean типте болуы керек'
    })
    create_time = serializers.DateTimeField(
        label='Тіркелген уақыт', read_only=True)

    def validate_phone(self, value):
        """Телефон нөмерге тексеріс"""
        for char in value:
            if not char.isnumeric():
                raise serializers.ValidationError(
                    'Телефон нөмір тек сандардан құралу керек')

        same_phone_user = None
        try:
            same_phone_user = User.objects.get(phone=value)
        except User.DoesNotExist:
            pass

        if same_phone_user:
            raise serializers.ValidationError('Телефон нөмір тіркелген')

        return super().validate(value)

    class Meta:
        model = User
        fields = '__all__'


class UpdateUserSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(label='Телефон нөмер', max_length=11, trim_whitespace=True, error_messages={
        'blank': 'Телефон нөмер бос болмауы керек',
        'required': 'Телефон нөмер бос болмауы керек',
        'max_length': 'Телефон нөмер 11 саннан құралу керек',
    })

    def validate_phone(self, value):
        """Телефон нөмерге тексеріс"""
        for char in value:
            if not char.isnumeric():
                raise serializers.ValidationError(
                    'Телефон нөмір тек сандардан құралу керек')

        # phone number not changed
        user = self.context.get('request').user
        if value == user.phone:
            return value

        same_phone_user = None
        try:
            same_phone_user = User.objects.get(phone=value)
        except User.DoesNotExist:
            pass

        if same_phone_user:
            raise serializers.ValidationError('Телефон нөмір тіркелген')

        return super().validate(value)

    class Meta:
        model = User
        fields = ['phone']


class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField(
        label='Логин', max_length=11, trim_whitespace=True, error_messages={
            'blank': 'Телефон нөмір бос болмауы керек',
            'required': 'Телефон нөмір бос болмауы керек',
            'max_length': 'Телефон нөмір 11 таңбадан аспауы керек',
        })
    password = serializers.CharField(
        label='Құпиясөз', write_only=True, max_length=254, trim_whitespace=True, error_messages={
            'blank': 'Құпиясөз бос болмауы керек',
            'required': 'Құпиясөз бос болмауы керек',
            'max_length': 'Құпиясөз 254 таңбадан аспауы керек',
        })

    def is_correct(self):
        """Жүйеге кіру деректерінің дұрыстығын тексеру"""
        phone = self.initial_data['phone']
        password = self.initial_data['password']

        try:
            user = User.objects.get(phone=phone)
        except User.DoesNotExist:
            raise CustomException(message='Телефон нөмер тіркелмеген')

        if not check_password(password, user.password):
            raise CustomException(message='Құпиясөз қате')

        return user
