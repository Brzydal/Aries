from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from django.db import models

class Profile(AbstractUser):
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('profile', kwargs={'pk': self.pk})
