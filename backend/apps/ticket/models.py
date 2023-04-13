from django.db import models


class Ticket(models.Model):
    name = models.CharField(max_length=40, verbose_name='Билет атауы')
    expiration_date = models.DateTimeField(verbose_name='Мерзімнің өту күні')

    class Meta:
        db_table = 'ticket'
        verbose_name = 'Билет'
        verbose_name_plural = 'Билеттер'

    def __str__(self):
        return f'{self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'expiration_date': self.expiration_date,
        }


class UserTicket(models.Model):
    buyer = models.ForeignKey(
        to='user.User', on_delete=models.CASCADE, verbose_name='Сатып алушы')
    ticket = models.ForeignKey(
        to='ticket.Ticket', on_delete=models.SET_NULL, null=True,  verbose_name='Билет')
    purchase_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Сатып алған уақыт')

    class Meta:
        db_table = 'user_ticket'
        verbose_name = 'Билет сатып алушы'
        verbose_name_plural = 'Билет сатып алғандар'

    def __str__(self):
        return f'{self.buyer} - {self.ticket}'
    
    def to_json(self):
        return {
            'id': self.id,
            'buyer': self.buyer.to_json(),
            'ticket': self.ticket.to_json(),
            'purchase_time': self.purchase_time,
        }
