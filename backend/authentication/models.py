from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class   User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.email