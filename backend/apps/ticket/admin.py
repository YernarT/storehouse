from django.contrib import admin
from ticket.models import Ticket, UserTicket

# Register your models here.


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    readonly_fields = ('id', )


@admin.register(UserTicket)
class UserTicketAdmin(admin.ModelAdmin):
    pass
