from rest_framework import serializers
from .models import Contact, Communication, IMEI, IMSI

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class CommunicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Communication
        fields = '__all__'

class IMEISerializer(serializers.ModelSerializer):
    class Meta:
        model = IMEI
        fields = '__all__'

class IMSISerializer(serializers.ModelSerializer):
    class Meta:
        model = IMSI
        fields = '__all__'
