from django.urls import path
from ticket.views import TicketView, UserTicketView

urlpatterns = [
    path('ticket', TicketView.as_view()),
    path('user-ticket', UserTicketView.as_view())
]
