from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password


class User(models.Model):
    '''User model'''

    phone = models.CharField(max_length=11, unique=True, verbose_name='Телефон нөмер')
    fullname = models.CharField(
        max_length=40, default='', blank=True, verbose_name='Аты-жөн')
    is_staff = models.BooleanField(verbose_name='Қызметші?')
    password = models.CharField(max_length=254, verbose_name='Құпиясөз')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Тіркелген уақыт')

    class Meta:
        db_table = 'user'
        verbose_name = 'Аккауант'
        verbose_name_plural = 'Аккауанттар'

    def __str__(self):
        if self.is_staff:
            return f'{self.phone} (қызметші)'

        return f'({self.id}) {self.phone}'

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True


@receiver(pre_save, sender=User)
def user_pre_save(sender, instance, **kwargs):
    '''Пайдаланушыларды сақтамас бұрын құпия сөздерді шифрлау'''
    # pbkdf2_sha256$
    if not instance.password.startswith('pbkdf2_sha256$'):
        instance.password = make_password(instance.password)
