from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
    label = "api"


class ContactConfig(AppConfig):
    name = 'api.contact'