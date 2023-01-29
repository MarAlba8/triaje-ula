from django.db import models


# Create your models here.

class Clinic(models.Model):
    name = models.CharField(max_length=50)

    # def __str__(self):
    #     """String for representing the Model object."""
    #     return self.name

    class Meta:
        app_label = 'clinics'

    def __str__(self):
        return self.name