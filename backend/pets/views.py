from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser,FormParser
from .models import Pet
from .serializers import PetSerializer
from .permissions import IsOwnerOrReadOnly

class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes=[IsOwnerOrReadOnly]
    parser_classes=[MultiPartParser,FormParser]

    filterset_fields = {
        'pet_type':['exact'],
        'breed':['icontains'],
        'gender':['exact'],
        'is_adopted':['exact'],
    }

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)