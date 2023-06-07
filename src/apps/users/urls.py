from django.urls import path
from users.views import user_view

urlpatterns = [
path('users', user_view)
]