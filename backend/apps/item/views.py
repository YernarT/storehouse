from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from item.models import Item, Tag, ItemTag
from item.serializers import ItemSerializer, TagSerializer, DeleteTagSerialzier

from user.serializers import UserSerializer

from utils.authentication import LoginRequiredAuthentication
from utils.custom_exception import CustomException


class ItemViewSet(ModelViewSet):
    """
    Item API 
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class TagViewSet(ModelViewSet):
    """
    Tag API 
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    authentication_classes = [LoginRequiredAuthentication]

    def get_queryset(self, ):
        if self.request.method == 'GET':
            user = self.request.user
            return self.queryset.filter(creator=user).all()

        return self.queryset

    def get_serializer_class(self):
        if self.request.method == 'DELETE':
            return DeleteTagSerialzier

        return super().get_serializer_class()

    def destroy(self, request, *args, **kwargs):
        for tag_id in request.data['ids']:
            target_tag = Tag.objects.filter(id=tag_id).first()
            target_tag and target_tag.delete()

        return Response({'Formatted': 1})
