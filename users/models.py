from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

from clinics.models import Clinic
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    clinic = models.ForeignKey(Clinic, on_delete=models.SET_NULL, null=True, blank=True)
    national_id = models.CharField(max_length=50, blank=False)
    consultation_reason = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=50, blank=False, unique=True)
    phone = models.CharField(max_length=50, blank=True)
    occupation = models.CharField(max_length=50, blank=True)
    metadata = models.JSONField("Metadata", default=dict)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
