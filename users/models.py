import json

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

from clinics.models import Clinic
from utils.encoders import PrettyJSONEncoder
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(verbose_name="Correo", unique=True)
    clinic = models.ForeignKey(Clinic, verbose_name="Clínica", on_delete=models.SET_NULL, null=True, blank=True)
    national_id = models.CharField(max_length=50, verbose_name="Cédula", blank=False, unique=True)
    consultation_reason = models.CharField(max_length=100, verbose_name="Motivo de Consulta", blank=True)
    email = models.EmailField(max_length=50,verbose_name="Correo", blank=False, unique=True)
    phone = models.CharField(max_length=50, verbose_name="Teléfono", blank=True)
    occupation = models.CharField(max_length=50, verbose_name="Ocupación", blank=True)
    metadata = models.JSONField(verbose_name="Preguntas Triaje", default=dict, encoder=PrettyJSONEncoder)
    is_staff = models.BooleanField(
        verbose_name="Usuario interno",
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_superuser = models.BooleanField(
        verbose_name="Administrador",
        default=False,
        help_text=_(
            "Designates that this user has all permissions without "
            "explicitly assigning them."
        ),
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    objects = CustomUserManager()

    class Meta:
        app_label = 'users'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.email