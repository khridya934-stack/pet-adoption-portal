from django.contrib import admin
from .models import VaccinationRecord


@admin.register(VaccinationRecord)
class VaccinationRecordAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'pet',
        'vaccine_name',
        'vaccination_date',
        'next_due_date',
        'veterinarian',
        'created_by',
    )

    list_filter = (
        'vaccine_name',
        'vaccination_date',
    )

    search_fields = (
        'pet__name',
        'vaccine_name',
        'veterinarian',
    )