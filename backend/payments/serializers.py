from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id',
            'adoption_request',
            'user',
            'amount',
            'payment_method',
            'transaction_id',
            'status',
            'created_at',
        ]

        read_only_fields = [
            'id',
            'user',
            'amount',
            'payment_method',
            'transaction_id',
            'status',
            'created_at'
        ]