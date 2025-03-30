from django.urls import path
from .views import LoginView, RegisterView, UserProfileView, LogoutView, SessionView

urlpatterns = [
    path("/login", LoginView.as_view(), name="rest_login"),
    path("/register", RegisterView.as_view(), name="rest_register"),
    path("/profile", UserProfileView.as_view(), name="user-profile"),
    path("/logout", LogoutView.as_view(), name="logout"),
    path("/session", SessionView.as_view(), name="session"),
    
]
