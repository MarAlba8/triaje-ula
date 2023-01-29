import json

from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.shortcuts import render


from django.urls import reverse


def triage_view(request):
    return render(request=request, template_name="home.html")

def login_view(request):
    return HttpResponseRedirect(reverse('admin:index'))

def save_patient_data_view(request):
    print("DJANGO VIEW")
    a = request.POST.get('request_data')
    print(a)
    return HttpResponse(json.dumps(a), content_type="application/json")