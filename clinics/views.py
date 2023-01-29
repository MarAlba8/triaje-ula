from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse


def index(request):
    # Get an HttpRequest - the request parameter
    # perform operations using information from the request.
    return HttpResponse({'app': 'clinics'})