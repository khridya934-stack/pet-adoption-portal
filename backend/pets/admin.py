from django.contrib import admin
from .models import Pet


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'pet_type',
        'breed',
        'gender',
        'is_adopted',
        'owner',
    )

    search_fields = ('name', 'breed')

    list_filter = ('pet_type', 'gender', 'is_adopted')