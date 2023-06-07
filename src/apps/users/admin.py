from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from django.contrib import messages

from history.models import History
from users.forms import CustomUserCreationForm, CustomUserChangeForm
from users.models import CustomUser
from users.services import send_notifications_emails
from utils.exceptions import SendEmailError


@admin.action(description='Tomar Paciente')
def take_patient(modeladmin, request, queryset):
    for patient in queryset:
        history = History()
        history.patient_name = f"{patient.first_name} {patient.last_name}"
        history.patient_email = patient.email
        history.patient_phone = patient.phone
        history.patient_metadata = patient.metadata
        history.clinic = patient.clinic
        history.student = request.user

        try:
            history.save()
            CustomUser.objects.filter(id=patient.id).delete()
            send_notifications_emails(patient, request.user)
            messages.success(request, f'Se ha asignado el paciente al estudiante {request.user.username} correctamente')
        except SendEmailError as exc:
            messages.error(request, exc)


def custom_titled_filter(title):
    class Wrapper(admin.FieldListFilter):
        def __new__(cls, *args, **kwargs):
            instance = admin.FieldListFilter.create(*args, **kwargs)
            instance.title = title
            return instance
    return Wrapper


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    model = CustomUser

    list_display = ('username', 'email', 'clinic',
                    'is_staff', 'is_superuser')
    list_filter = (('is_staff', custom_titled_filter('Administradores y Estudiantes')),
                   ('is_superuser', custom_titled_filter('Administradores')),
                   ('clinic', custom_titled_filter('Pacientes por Clinica'))
                   )

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'clinic', 'national_id')}),
        ('Permisos', {'fields': ('is_staff', 'is_active',
         'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas', {'fields': ('last_login', 'date_joined')}),
        ('Preguntas', {'fields': ('metadata',)})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'clinic', 'national_id')}
         ),
    )
    search_fields = ('email', 'clinic')
    ordering = ('date_joined',)
    actions = [take_patient, ]

    readonly_fields = ["metadata"]


admin.site.register(CustomUser, CustomUserAdmin)
