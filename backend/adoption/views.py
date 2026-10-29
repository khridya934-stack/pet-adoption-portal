from django.db.models import Q
from django.db import transaction
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import AdoptionRequest
from .serializers import AdoptionRequestSerializer
from .utils import send_adoption_email


class AdoptionRequestViewSet(viewsets.ModelViewSet):
    serializer_class = AdoptionRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AdoptionRequest.objects.filter(
            Q(applicant=self.request.user) |
            Q(pet__owner=self.request.user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

    def update(self, request, *args, **kwargs):
        adoption_request = self.get_object()

        if adoption_request.pet.owner != request.user:
            raise PermissionDenied(
                "Only the pet owner can manage this request."
            )

        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        adoption_request = self.get_object()

        if adoption_request.pet.owner != request.user:
            raise PermissionDenied(
                "Only the pet owner can manage this request."
            )

        return super().partial_update(request, *args, **kwargs)

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        with transaction.atomic():
            adoption_request = self.get_object()

            if adoption_request.pet.owner != request.user:
                raise PermissionDenied(
                    "Only the pet owner can approve this request."
                )

            pet = adoption_request.pet

            if pet.is_adopted:
                return Response(
                    {"error": "This pet has already been adopted."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if adoption_request.status != 'Pending':
                return Response(
                    {"error": "This request has already been processed."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            pet = type(pet).objects.select_for_update().get(pk=pet.pk)

            if pet.is_adopted:
                return Response(
                    {"error": "This pet has already been adopted."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            adoption_request.status = 'Approved'
            AdoptionRequest.objects.filter(
                pet=pet,
                status='Pending'
            ).exclude(
                id=adoption_request.id
            ).update(status='Rejected')
            adoption_request.save()

            pet.is_adopted = True
            pet.save(update_fields=['is_adopted'])

            send_adoption_email(adoption_request,"Approved")

            return Response(
                {"message": "Adoption request approved successfully."}
            )

    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        adoption_request = self.get_object()

        if adoption_request.pet.owner != request.user:
            raise PermissionDenied(
                "Only the pet owner can reject this request."
            )

        if adoption_request.status != 'Pending':
            return Response(
                {"error": "This request has already been processed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        adoption_request.status = 'Rejected'
        adoption_request.save()

        send_adoption_email(adoption_request,"Rejected")

        return Response(
            {"message": "Adoption request rejected successfully."}
        )

    http_method_names = [
        'get', 'post', 'patch', 'head', 'options'
    ]