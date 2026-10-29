from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import VaccinationRecordViewSet

router = DefaultRouter()

router.register('vaccinations', VaccinationRecordViewSet, basename='vaccination')

urlpatterns = [
    path('',include(router.urls)),
]