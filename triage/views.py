import json

from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.urls import reverse

from users.models import CustomUser
from clinics.models import Clinic


def triage_view(request):
    return render(request=request, template_name="home.html")

def login_view(request):
    return HttpResponseRedirect(reverse('admin:index'))

def save_patient_data_view(request):
    data = json.loads(request.POST.get('request_data'))
    
    try:
        patient = CustomUser()
        patient.is_superuser = False
        patient.is_staff = False
        patient.username = data['inf_Personal']['Nombre']
        patient.metadata = {"PreguntasCovid": data['inf_Covid'], "PreguntasTriaje": data['PreguntasTriaje']}
        patient.email = data['inf_Personal']['Email']
        patient.first_name = data['inf_Personal']['Nombre']
        patient.last_name = data['inf_Personal']['Apellido']
        patient.phone = data['inf_Personal']['Telefono']
        patient.national_id = data['inf_Personal']['Cedula']

        clinic=Clinic.objects.filter(name=data['ClinicaSugerida']).first()
        patient.clinic = clinic
        patient.save()

        return HttpResponse(json.dumps(data), content_type="application/json")

    except IntegrityError as exc:
        # if (str(e) == "UNIQUE constraint failed: users_customuser.email"):
        #     return HttpResponseBadRequest("Error_email")
        # else:
        error_message = str(exc).split(".")[1]
        return HttpResponseBadRequest(f"Alguno de los datos ya se registró anteriormente: {error_message}")
    except Exception:
        return HttpResponseBadRequest(f"Error al procesar los datos")