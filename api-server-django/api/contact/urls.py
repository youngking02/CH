# api/urls.py
from django.urls import path
from .views import search_by_name, search_by_phone_number, search_by_imei , search_communications_by_date_range, search_by_imsi, search_communications_by_imsi
urlpatterns = [
    path('search_by_name/', search_by_name, name='search_by_name'),
    path('search_by_phone_number/', search_by_phone_number, name='search_by_phone_number'),
    path('search_by_imei/', search_by_imei, name='search_by_imei'),
    path('search_communications_by_date_range/', search_communications_by_date_range, name='search_communications_by_date_range'),
    path('search_by_imsi/', search_by_imsi, name='search_by_imsi'), 
    path('search_communications_by_imsi/', search_communications_by_imsi, name='search_communications_by_imsi'),
]
