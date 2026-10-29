from django.contrib import admin
from .models import AdoptionRequest

@admin.register(AdoptionRequest)
class AdoptionRequestAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'pet',
        'applicant',
        'phone',
        'occupation',
        'status',
        'created_at',
    )
    
    list_filter = ('status',)
    search_fields = (
        'pet__name',
        'applicant__username',
        'phone',
    )
