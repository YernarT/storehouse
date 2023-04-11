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
                user = User.objects.get(phone=login, password=password)
            except User.DoesNotExist:
                user = User.objects.create(phone=login, password=password, is_staff=False)

        data = user.to_json()
        data['token'] = create_token(user.id)

        return JsonResponse(data, status=200)
