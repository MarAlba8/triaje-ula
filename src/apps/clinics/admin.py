from django.contrib import admin
from clinics.models import Clinic


# Register your models here.

@admin.register(Clinic)
class ClinicAdmin(admin.ModelAdmin):
    model = Clinic

    list_display = ('name',)