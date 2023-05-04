from django.urls import path
from rest_framework import routers
from django.conf import settings

from ticket.views import TicketViewSet, CheckTicketView, BuyTicketView

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r'ticket', TicketViewSet)

urlpatterns = router.urls + [
    path('ticket/check', CheckTicketView.as_view()),
    path('ticket/buy', BuyTicketView.as_view())
]

app_name = 'ticket'
