from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(write_only = True)
    password = serializers.CharField(write_only= True)

    class Meta:
        model=User
        fields = ['username','email','password','phone']

    def create(self, validated_data):
        phone = validated_data.pop('phone')
        user = User.objects.create_user(**validated_data)

        Profile.objects.create(
            user=user,
            phone=phone
        )

        return user