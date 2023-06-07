from django.urls import path
from clinics import views

urlpatterns = [
path('clinic', views.index)
]