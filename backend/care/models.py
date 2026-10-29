from django.db import models
from django.contrib.auth.models import User
from pets.models import Pet

class VaccinationRecord(models.Model):
    pet = models.ForeignKey(
        Pet, on_delete=models.CASCADE, related_name='vaccinations'
    )

    vaccine_name= models.CharField(max_length=100)
    vaccination_date = models.DateField()
    next_due_date = models.DateField(blank=True,null=True)
    veterinarian = models.CharField(max_length=100, blank=True)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pet.name} - {self.vaccine_name}"

