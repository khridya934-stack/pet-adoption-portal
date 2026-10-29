from rest_framework import serializers
from .models import AdoptionRequest


class AdoptionRequestSerializer(serializers.ModelSerializer):
    application_username = serializers.CharField(
        source="applicant.username",
        read_only=True
    )

    class Meta:
        model = AdoptionRequest
        fields = "__all__"
        read_only_fields = ["applicant", "status"]

    def validate_phone(self, value):
        phone = value.strip()
        if not phone.isdigit() or len(phone) != 10:
            raise serializers.ValidationError(
                "Enter a valid 10-digit phone number."
            )
        return phone

    def validate_address(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Address cannot be empty."
            )
        return value.strip()

    def validate_occupation(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Occupation cannot be empty."
            )
        return value.strip()

    def validate_experience(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Pet care experience cannot be empty."
            )
        return value.strip()

    def validate_reason(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Reason for adoption cannot be empty."
            )
        return value.strip()

    def validate_pet(self, pet):
        if pet.is_adopted:
            raise serializers.ValidationError(
                "This pet has already been adopted."
            )

        return pet

    def validate(self, attrs):
        request = self.context["request"]
        pet = attrs.get("pet")

        if AdoptionRequest.objects.filter(
            pet=pet,
            applicant=request.user
        ).exists():
            raise serializers.ValidationError(
                "You have already submitted an adoption request for this pet."
            )

        return attrs