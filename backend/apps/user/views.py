from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from user.serializers import (
    UserSerializer, UpdateUserSerializer, LoginSerializer)
from user.models import User

from utils.jwt import create_jwt


class UserViewSet(ModelViewSet):
    """
    User API 
    """
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'partial_update':
            return UpdateUserSerializer

        return UserSerializer

    def get_serializer_context(self):
        """
        update context object
        """
        context = super().get_serializer_context()
        context.update({'request': self.request})

        return context

    def create(self, request, *args, **kwargs):
        """
        register user
        """
        response = super().create(request, *args, **kwargs)
        response.data['token'] = create_jwt({'uid': response.data['id']})

        return response


class LoginAPIView(APIView):
    """
    Login API
    """
    authentication_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.is_correct()
        token = create_jwt({'uid': user.id})

        data = UserSerializer(instance=user).data
        data['token'] = token

        return Response({'data': data, 'Formatted': 1})
