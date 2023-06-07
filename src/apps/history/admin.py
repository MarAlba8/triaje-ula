from django.contrib import admin

from history.models import History


def custom_titled_filter(title):
    class Wrapper(admin.FieldListFilter):
        def __new__(cls, *args, **kwargs):
            instance = admin.FieldListFilter.create(*args, **kwargs)
            instance.title = title
            return instance
    return Wrapper


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    model = History

    list_display = ('clinic', 'patient_name', 'student')

    list_filter = (('clinic', custom_titled_filter('Pacientes por Clinica')),)

    fieldsets = (
        ("Paciente", {'fields': ('patient_name', 'patient_email', 'patient_phone')}),
        ('Clínica', {'fields': ('clinic',)}),
        ('Estudiante', {'fields': ('student',)}),
        ('Preguntas', {'fields': ('patient_metadata',)}),
    )

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False