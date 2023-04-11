from django.urls import path
from user.views import LoginView

urlpatterns = [
    path('user/login', LoginView.as_view())
]
