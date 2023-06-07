from django.db import models
from django.utils.translation import gettext as _

from clinics.models import Clinic
from utils.encoders import PrettyJSONEncoder


class History(models.Model):
    student = models.ForeignKey("users.CustomUser", verbose_name="Estudiante", on_delete=models.PROTECT)
    patient_name = models.CharField(max_length=50, verbose_name="Nombre del Paciente", blank=True)
    patient_email = models.EmailField(_('email address'), unique=False)
    patient_phone = models.CharField(verbose_name="Teléfono del Paciente", max_length=50, blank=True)
    patient_metadata = models.JSONField("Metadata", default=dict, encoder=PrettyJSONEncoder)
    clinic = models.ForeignKey(Clinic, verbose_name="Clínica", on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        app_label = 'history'
        verbose_name = 'Historial'
        verbose_name_plural = 'Historial'


    def __str__(self):
        data = f"Student: {self.student}, Patient: {self.patient_email}"
        return data
