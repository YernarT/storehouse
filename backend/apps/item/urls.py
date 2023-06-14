from django.urls import path
from rest_framework import routers
from django.conf import settings

from item.views import ItemViewSet

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r'item', ItemViewSet)

urlpatterns = router.urls + [
    # path('item/check', CheckInventoryView.as_view()),
    # path('item/buy', BuyInventoryView.as_view())
]

app_name = 'item'
