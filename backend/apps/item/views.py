from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from item.serializers import ItemSerializer
from item.models import Item, Tag, ItemTag

from user.serializers import UserSerializer

from utils.authentication import LoginRequiredAuthentication
from utils.custom_exception import CustomException


class ItemViewSet(ModelViewSet):
    """
    Item API 
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
