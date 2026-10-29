from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied

from .models import VaccinationRecord
from .serializers import VaccinationRecordSerializer
from .permission import IsPetOwnerOrReadOnly


class VaccinationRecordViewSet(viewsets.ModelViewSet):
    serializer_class = VaccinationRecordSerializer
    permission_classes = [IsPetOwnerOrReadOnly]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated(), IsPetOwnerOrReadOnly()]

    def get_queryset(self):
        return VaccinationRecord.objects.all()

    def perform_create(self, serializer):
        pet = serializer.validated_data["pet"]

        if pet.owner != self.request.user:
            raise PermissionDenied(
                "You can only add vaccination records for your own pets."
            )

        serializer.save(created_by=self.request.user)