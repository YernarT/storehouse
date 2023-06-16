from django.urls import path
from rest_framework import routers
from django.conf import settings

from item.views import ItemViewSet, TagViewSet

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r'item', ItemViewSet)
router.register(r'tag', TagViewSet)

urlpatterns = router.urls

app_name = 'item'
