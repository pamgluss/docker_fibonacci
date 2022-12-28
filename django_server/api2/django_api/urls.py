# todo/todo/urls.py : Main urls.py
from django.contrib import admin
from django.urls import path, include
from django_api import urls as django_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api2/', include(django_urls)),
]