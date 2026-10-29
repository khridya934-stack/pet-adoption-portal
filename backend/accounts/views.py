from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from .models import Profile

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        profile, create = Profile.objects.get_or_create(
            user = user,
            defaults={"phone" :""}
        )

        return Response({
            "username": user.username,
            "email": user.email,
            "phone": profile.phone,
        })

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
        })