from django.urls import path, include

urlpatterns = [
    path('contact/', include('api.contact.urls')),
    # Add other app urls here
]
