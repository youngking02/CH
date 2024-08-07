from api.authentication.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    ActiveSessionViewSet,
    LogoutViewSet,
)
from rest_framework import routers
from api.user.viewsets import UserViewSet
from api.contact.viewsets import ContactViewSet  # Assurez-vous d'importer ContactViewSet

router = routers.SimpleRouter(trailing_slash=False)

router.register(r"edit", UserViewSet, basename="user-edit")
router.register(r"register", RegisterViewSet, basename="register")
router.register(r"login", LoginViewSet, basename="login")
router.register(r"checkSession", ActiveSessionViewSet, basename="check-session")
router.register(r"logout", LogoutViewSet, basename="logout")
router.register(r"contacts", ContactViewSet, basename="contact")  # Enregistrez ContactViewSet

urlpatterns = [
    *router.urls,
]
