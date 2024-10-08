# Generated by Django 3.2.13 on 2024-08-06 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0003_auto_20240724_1521'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imei',
            name='phone_number',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='imeis', to='contact.phonenumber'),
        ),
        migrations.AlterField(
            model_name='imsi',
            name='phone_number',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='imsis', to='contact.phonenumber'),
        ),
    ]
