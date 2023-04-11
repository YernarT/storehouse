from django.db import models


class User(models.Model):
    phone = models.CharField(max_length=11, verbose_name='Телефон нөмер')
    fullname = models.CharField(
        max_length=40, default='', blank=True, verbose_name='Аты-жөні')
    is_staff = models.BooleanField(verbose_name='Қызыметші?')
    password = models.CharField(max_length=254, verbose_name='Құпиясөз')

    class Meta:
        db_table = 'user'
        verbose_name = 'Аккауант'
        verbose_name_plural = 'Аккауанттар'

    def __str__(self):
        return f'{self.phone}'
    
    def to_json(self):
        return {
            'id': self.id,
            'phone': self.phone,
            'fullname': self.fullname,
            'is_staff': self.is_staff,
        }
