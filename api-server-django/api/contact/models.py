from django.db import models



class Contact(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birth_date = models.DateField()

class PhoneNumber(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='phone_numbers')
    number = models.CharField(max_length=20)







class IMEI(models.Model):
    imei = models.CharField(max_length=15, unique=True)
    phone_number = models.ForeignKey(PhoneNumber, on_delete=models.CASCADE, related_name='imeis')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.imei} - {self.phone_number.number}"

class IMSI(models.Model):
    imsi = models.CharField(max_length=15, unique=True)
    phone_number = models.ForeignKey(PhoneNumber, on_delete=models.CASCADE, related_name='imsis')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.imsi} - {self.phone_number.number}"


from django.db import models

class Communication(models.Model):
    COMMUNICATION_TYPE_CHOICES = [
        ('call_in', 'Appel Entrant'),
        ('call_out', 'Appel Sortant'),
        ('sms_in', 'SMS Entrant'),
        ('sms_out', 'SMS Sortant'),
    ]

    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='communications')
    correspondent = models.CharField(max_length=255)
    duration = models.IntegerField()  # Duration in seconds for calls
    timestamp = models.DateTimeField()
    imei = models.CharField(max_length=255)
    site_name = models.CharField(max_length=255)
    locality = models.CharField(max_length=255)
    imsi = models.CharField(max_length=255)
    communication_type = models.CharField(max_length=9, choices=COMMUNICATION_TYPE_CHOICES)

    def __str__(self):
        return f"{self.get_communication_type_display()} with {self.correspondent}"
