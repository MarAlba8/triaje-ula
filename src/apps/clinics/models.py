from django.db import models


# Create your models here.

class Clinic(models.Model):
    name = models.CharField(verbose_name="Nombre", max_length=50,blank=False, unique=True)

    class Meta:
        app_label = 'clinics'
        verbose_name = 'Clínica'
        verbose_name_plural = 'Clínicas'

    @classmethod
    def create(cls, name):
        clinic = cls(name=name)
        return clinic

    def __str__(self):
        return self.name
