from django.urls import path

from triage.views import triage_view, login_view, save_patient_data_view

urlpatterns = [
    path('', triage_view),
    path('login', login_view, name='login'),
    path('save', save_patient_data_view, name='save'),
]