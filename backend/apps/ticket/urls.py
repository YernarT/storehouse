from django.urls import path
from ticket.views import TicketView

urlpatterns = [
    path('ticket', TicketView.as_view())
]
