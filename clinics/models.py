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

try:

    a=Clinic.objects.all()
    if(len(a)>6):
        print("### YA HAY clinicas registradas ####")
    
    else:
        print("### NO HAY ####")
        clinic1 = Clinic.create("Integral del Adulto")
        clinic2 = Clinic.create("Estomatología")
        clinic3 = Clinic.create("Cirugia")
        clinic4 = Clinic.create("Operatoria Dental")
        clinic5 = Clinic.create("Endodoncia")
        clinic6 = Clinic.create("Periodoncia")


        clinic1.save()
        clinic2.save()
        clinic3.save()
        clinic4.save()
        clinic5.save()
        clinic6.save()

except:
    print("err235")