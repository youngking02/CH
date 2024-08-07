from rest_framework import viewsets
from .models import Contact, Communication, IMEI, IMSI
from .serializers import ContactSerializer, CommunicationSerializer, IMEISerializer, IMSISerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class CommunicationViewSet(viewsets.ModelViewSet):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer

class IMEIViewSet(viewsets.ModelViewSet):
    queryset = IMEI.objects.all()
    serializer_class = IMEISerializer

class IMSIViewSet(viewsets.ModelViewSet):
    queryset = IMSI.objects.all()
    serializer_class = IMSISerializer
