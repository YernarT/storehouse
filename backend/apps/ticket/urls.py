from django.urls import path
from rest_framework import routers
from django.conf import settings

from ticket.views import TicketViewSet

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r'ticket', TicketViewSet)

urlpatterns = router.urls

app_name = 'ticket'
