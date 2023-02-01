from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


from django.contrib import admin

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

    list_display = ('username', 'email',
                    'is_staff', 'is_superuser', 'clinic', 'metadata')
    list_filter = (('is_staff', custom_titled_filter('Administradores y Estudiantes')),
                   ('is_superuser', custom_titled_filter('Administradores')),
                   ('clinic', custom_titled_filter('Pacientes por Clinica'))
                   )
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password', 'clinic')}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
         'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active', 'clinic', 'national_id')}
         ),
    )
    search_fields = ('email', 'clinic')
    ordering = ('email',)


admin.site.register(CustomUser, CustomUserAdmin)