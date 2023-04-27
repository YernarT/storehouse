from django.contrib.auth.hashers import check_password

from rest_framework import serializers
from user.models import User

from utils.custom_exception import CustomException


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    fullname = serializers.CharField(
        label='Аты-жөні', max_length=40, required=False, trim_whitespace=True, error_messages={
            'max_length': 'Аты-жөні 40 таңбадан аспауы керек',
        })
    phone = serializers.CharField(label='Телефон нөмер', max_length=11, trim_whitespace=True, error_messages={
        'blank': 'Телефон нөмер бос болмауы керек',
        'required': 'Телефон нөмер бос болмауы керек',
        'max_length': 'Телефон нөмер 11 таңбадан аспауы керек',
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


class LoginSerializer(serializers.Serializer):
    login = serializers.CharField(
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
    is_staff = serializers.BooleanField(label='Қызметші?', error_messages={
        'invalid': 'is_staff өрісі boolean типте болуы керек',
        'blank': 'is_staff өрісін толтыру міндетті',
        'required': 'is_staff өрісін толтыру міндетті',
    })

    def is_correct(self):
        """Жүйеге кіру деректерінің дұрыстығын тексеру"""
        login = self.initial_data['login']
        password = self.initial_data['password']
        is_staff = self.initial_data['is_staff']

        if is_staff:
            user_by_id = User.objects.filter(id=login).first()
            user_by_phone = User.objects.filter(phone=login).first()
            user = None

            if user_by_id:
                user = user_by_id
            if user_by_phone:
                user = user_by_phone

            if user is None:
                return CustomException(message='Жүйеге кіру сәтсіз аяқталды')
        else:
            try:
                user = User.objects.get(phone=login)
            except User.DoesNotExist:
                user = User.objects.create(
                    phone=login, password=password, is_staff=False)

        if not check_password(password, user.password):
            raise CustomException(message='Жүйеге кіру сәтсіз аяқталды')

        return user
