from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # user
    path('api/', include('user.urls')),
    # ticket
    path('api/', include('ticket.urls')),
]
