from django.contrib import admin
from .models import Contact, Communication, IMEI, IMSI

admin.site.register(Contact)
admin.site.register(Communication)
admin.site.register(IMEI)
admin.site.register(IMSI)
