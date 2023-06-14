from django.contrib import admin
from item.models import Item, Tag, ItemTag


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    readonly_fields = ('id', )


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    readonly_fields = ('id', )

@admin.register(ItemTag)
class ItemTagAdmin(admin.ModelAdmin):
    readonly_fields = ('id', )
