import json

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
    
    print("DJANGO VIEW")
    Data= json.loads(request.POST.get('request_data'))

    print("**************")
    print(Data)
    
    try:

        Paciente = CustomUser()
        Paciente.is_superuser = False
        Paciente.is_staff = False
        Paciente.username = Data['inf_Personal']['Nombre']
        Paciente.metadata = {"PreguntasCovid": Data['inf_Covid'], "PreguntasTriaje": Data['PreguntasTriaje']}
        Paciente.email = Data['inf_Personal']['Email']
        Paciente.first_name = Data['inf_Personal']['Nombre']
        Paciente.last_name = Data['inf_Personal']['Apellido']
        Paciente.phone = Data['inf_Personal']['Telefono']
        clinic=Clinic.objects.filter(name= Data['ClinicaSugerida'])
        
        print("hola")
        print(clinic)
        #print(clinic[0])
        Paciente.clinic = clinic[0]
        Paciente.save()
        print("sss")
        return HttpResponse(json.dumps(Data), content_type="application/json")
       

    except Exception as e: 
        print("err")
        print(e)
        print(type(str(e)))

        if (str(e) == "UNIQUE constraint failed: users_customuser.email"):
            return HttpResponseBadRequest("Error_email")
        else:
            return HttpResponseBadRequest("Error")