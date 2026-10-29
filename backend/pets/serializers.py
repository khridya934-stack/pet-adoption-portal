from rest_framework import serializers
from .models import Pet

class PetSerializer(serializers.ModelSerializer):

    owner_username = serializers.CharField(
        source = 'owner.username',
        read_only = True
    )
    class Meta:
        model=Pet
        fields='__all__'
        read_only_fields =['owner','owner_username']
