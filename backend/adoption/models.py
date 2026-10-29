from django.db import models
from django.contrib.auth.models import User
from pets.models import Pet

class AdoptionRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending','Pending'),
        ('Approved','Approved'),
        ('Rejected','Rejected'),
    ]

    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='adoption_requests')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='adoption_requests')
    phone = models.CharField(max_length=15)
    address = models.TextField()
    occupation = models.CharField(max_length=100)
    experience = models.TextField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant.username} - {self.pet.name}"

    def save(self, *args, **kwargs):
        super().save(*args,**kwargs) 

        if self.status == 'Approved':
            self.pet.is_adopted =True
            self.pet.save()

