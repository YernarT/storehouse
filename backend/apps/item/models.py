from django.db import models


class Item(models.Model):
    '''Зат'''
    name = models.CharField(max_length=30, verbose_name='Атау')
    description = models.CharField(max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    image = models.FileField(upload_to='item/image/',
                             null=True, blank=True, verbose_name='Сурет')
    quantity = models.PositiveIntegerField(null=True, blank=True, verbose_name='Саны')
    production_date = models.DateTimeField(null=True, blank=True, verbose_name='Өндірілген күн')
    expiration_date = models.DateTimeField(verbose_name='Мерзімнің өту күн')
    owner = models.ForeignKey(
        to='user.User', on_delete=models.CASCADE, verbose_name='Иесі')
    supplier = models.CharField(null=True, blank=True, max_length=60, verbose_name='Жеткізуші')
    purchase_price = models.PositiveIntegerField(
        null=True, blank=True, verbose_name='Сатып алынған баға')
    selling_price = models.PositiveIntegerField(verbose_name='Сату баға')
    shelf_position = models.CharField(null=True, blank=True, max_length=60, verbose_name='Сөренің орны')

    class Meta:
        db_table = 'item'
        verbose_name = 'Зат'
        verbose_name_plural = 'Заттар'

    def __str__(self):
        return f'({self.id}) {self.name}'


class Tag(models.Model):
    '''Тег'''
    name = models.CharField(max_length=12, verbose_name='Атау')
    color = models.CharField(max_length=22, verbose_name='Шрифт түсі')
    background_color = models.CharField(max_length=22, verbose_name='Фон түсі')
    creator = models.ForeignKey(
        'user.User', on_delete=models.CASCADE, verbose_name='Құрушысы')

    class Meta:
        db_table = 'tag'
        verbose_name = 'Тег'
        verbose_name_plural = 'Тегтер'

    def __str__(self) -> str:
        return f'({self.id}) {self.name}'


class ItemTag(models.Model):
    '''Зат тег'''
    item = models.ForeignKey(
        'item.Item', on_delete=models.CASCADE, verbose_name='Зат')
    tag = models.ForeignKey(
        'item.Tag', on_delete=models.CASCADE, verbose_name='Тег')

    class Meta:
        db_table = 'item_tag'
        verbose_name = 'Зат тег'
        verbose_name_plural = 'Зат тег'

    def __str__(self) -> str:
        return f'({self.id}) {self.item.id}-{self.tag.id}'
