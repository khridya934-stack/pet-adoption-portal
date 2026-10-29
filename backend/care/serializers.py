from rest_framework import serializers
from .models import VaccinationRecord


class VaccinationRecordSerializer(serializers.ModelSerializer):

    pet_name = serializers.CharField(
        source="pet.name",
        read_only=True
    )

    class Meta:
        model = VaccinationRecord
        fields = [
            "id",
            "pet",
            "pet_name",
            "vaccine_name",
            "vaccination_date",
            "next_due_date",
            "veterinarian",
            "created_by",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "pet_name",
        ]