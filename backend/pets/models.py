from django.db import models
from django.contrib.auth.models import User

class Pet(models.Model):
    GENDER_CHOICES = [
        ('Male','Male'),
        ('Female','Female'),
    ]
    name=models.CharField(max_length=150)
    pet_type=models.CharField(max_length=50)
    breed=models.CharField(max_length=150)
    age=models.PositiveIntegerField()
    gender=models.CharField(max_length=10,choices=GENDER_CHOICES)
    description=models.TextField()
    image=models.ImageField(upload_to='pets/', blank=True ,null=True)
    owner=models.ForeignKey(User,on_delete=models.CASCADE,related_name='pets')
    is_adopted=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name