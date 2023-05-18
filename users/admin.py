
from django.contrib.auth.admin import UserAdmin

from history.models import History
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


from django.contrib import admin


from django.core.mail import send_mail, send_mass_mail
from django.conf import settings

from django.core.signals import setting_changed
from django.contrib import messages #import messages
from users.models import CustomUser


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

        #Mensajes para los correos.
        msj_patient= f"""Hola {patient.first_name} {patient.last_name}, hemos procesado su triaje online en la Fucultad de Odontologia y el estudiante asignado para su cita se comunicara con usted a la brevedad posible. Feliz Dia.
        
        Estudiante Asignado: {request.user.username}

        """

        msj_student= f"""Usted ha tomado el siguiente paciente de la lista de triage Online de la facultad de Odontologia, por favor contactar con usuario a la brevedad posible para coordinar la cita.
        
        Paciente: {patient.first_name} {patient.last_name}
        Email: {patient.email}
        Telefono: {patient.phone}

        """

        try:

            print("Guardando BD")
            history.save()
            CustomUser.objects.filter(id=patient.id).delete()

            print("Enviando")

            # Agregar los campos email paciente {patient.email}  email estudiante {request.user} luego de pruebas
            datatuple = (
                ("Correo para paciente", msj_patient, 'settings.EMAIL_HOST_USER', [f"{patient.email}"]),
                ("Correo para Estudiante", msj_student, 'settings.EMAIL_HOST_USER', [f"{request.user}"]),
            )

            send_mass_mail(datatuple, fail_silently=False)


            print("Saliendo de Enviar")

           
            messages.success(request, 'Se ha asignado el paciente al estudiante!')


        except OSError as Exc:  #Excepcion capturada de la funcion para el envio de correo

            print(" Error: Se asigno el paciente pero no se enviaron los correos de confirmacion, por favor hacerlo manualmente")
            messages.error(request, "Error: Se asigno el paciente pero no se enviaron los correos de confirmacion, por favor hacerlo manualmente" )

        except Exception as Exc: 

            print("### Error al Tomar el paciente, vuelva a intentarlo ")
            print({Exc})
            
            messages.error(request, "Error al asignar el paciente, vuelva a intentarlo" )








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