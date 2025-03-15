from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import Group, update_last_login
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .serializers import (
    LoginSerializer,
    ProfilePhotoSerializer,
    UserSerializer,
    RegisterSerializer,
    UserProfileSerializer
)

User = settings.AUTH_USER_MODEL


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']
        update_last_login(None, user)

        data = {
            "message": "Login Successful",
            "data": {
                "access_token": user.tokens["access"],
                "refresh_token": user.tokens["refresh"],
                "user": UserSerializer(user).data,
            }
        }

        return Response(data, status=status.HTTP_200_OK)


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        data = {
            "message": "User registered succesfully",
            "data": {
                "user": UserSerializer(user).data,
            }
        }

        return Response(data, status=status.HTTP_201_CREATED)


class UserProfileView(RetrieveUpdateAPIView):
    """Get or update the authenticated user's profile"""
    serializer_class = UserProfileSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        """Partial update (only update provided fields)"""
        return self.partial_update(request, *args, **kwargs)
