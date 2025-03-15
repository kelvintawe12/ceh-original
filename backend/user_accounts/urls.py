from django.urls import path
from .views import LoginView, RegisterView, UserProfileView

urlpatterns = [
    path("/login", LoginView.as_view(), name="rest_login"),
    path("/register", RegisterView.as_view(), name="rest_register"),
    path("/profile", UserProfileView.as_view(), name="user-profile")
]
