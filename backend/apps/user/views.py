from django.http import JsonResponse
from utils.api_view import APIView
from utils.token import create_token, check_token

from user.models import User


class LoginView(APIView):

    def post(self, request):
        data = self.get_data(request)
        login = data.get('login')
        password = data.get('password')
        is_staff = data.get('is_staff')

        if is_staff:
            try:
                user = User.objects.get(id=login, password=password)
            except User.DoesNotExist:
                data = {'is_success': False,
                        'message': 'ID немесе құпия сөз қате'}
                return JsonResponse(data, status=400)
        else:
            try:
                user = User.objects.get(phone=login)
            except User.DoesNotExist:
                user = User.objects.create(
                    phone=login, password=password, is_staff=False)
            else:
                if user.password != password:
                    data = {'is_success': False,
                            'message': 'Телефон нөмер немесе құпиясөз қате'}
                    return JsonResponse(data, status=400)

        user_json = user.to_json()
        user_json['token'] = create_token(user.id)
        data = {
            'is_success': True,
            'data': user_json
        }

        return JsonResponse(data, status=200)
