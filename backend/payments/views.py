from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Payment
from .serializers import PaymentSerializer
from adoption.models import AdoptionRequest


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'head', 'options']

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        adoption_id = request.data.get('adoption_request')

        try:
            adoption_request = AdoptionRequest.objects.get(
                id=adoption_id,
                applicant=request.user,
                status='Approved'
            )
        except (AdoptionRequest.DoesNotExist, ValueError, TypeError):
            return Response(
                {"error": "Approved adoption request not found."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if adoption_request.pet.is_adopted is False:
            return Response(
                {"error": "This adoption has not been finalized."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Payment.objects.filter(
            adoption_request=adoption_request,
            status='Success'
        ).exists():
            return Response(
                {"error": "This adoption has already been paid for."},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment = Payment.objects.create(
            adoption_request=adoption_request,
            user=request.user,
            amount=500.00,
            payment_method='Demo API',
            status='Pending'
        )

        return Response(
            PaymentSerializer(payment).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['post'])
    def simulate_success(self, request, pk=None):
        payment = self.get_object()

        if payment.status != 'Pending':
            return Response(
                {"error": "Only pending payments can be completed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment.status = 'Success'
        payment.transaction_id = f"DEMO-{payment.id}"
        payment.save(update_fields=['status', 'transaction_id'])

        return Response(
            PaymentSerializer(payment).data,
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['post'])
    def simulate_failure(self, request, pk=None):
        payment = self.get_object()

        if payment.status != 'Pending':
            return Response(
                {"error": "Only pending payments can be failed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment.status = 'Failed'
        payment.transaction_id = f"DEMO-FAILED-{payment.id}"
        payment.save(update_fields=['status', 'transaction_id'])

        return Response(
            PaymentSerializer(payment).data,
            status=status.HTTP_200_OK
        )