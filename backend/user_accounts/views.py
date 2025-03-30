from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.conf import settings

from .serializers import (
    LoginSerializer,
    ProfilePhotoSerializer,
    UserSerializer,
    RegisterSerializer,
    UserProfileSerializer
)

User = settings.AUTH_USER_MODEL


class LoginView(APIView):
    """Handles user authentication and token retrieval"""

    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({
                "message": "Email and password are required.",
                "status": "error",
                "errors": {"email": "This field is required", "password": "This field is required"}
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)

            response = Response({
                "message": "Login successful",
                "status": "success",
                "data": {
                    "user": {
                        "id": user.id,
                        "full_name": user.full_name,
                        "email": user.email
                    }
                }
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key="access_token",
                value=token.key,
                httponly=True,
                secure=settings.DEBUG is False,
                samesite="Lax",
                max_age=60 * 60 * 24
            )

            response.set_cookie(
                key="refresh_token",
                value="dummy-refresh-token",
                httponly=True,
                secure=settings.DEBUG is False,
                samesite="Lax",
                max_age=60 * 60 * 24 * 7
            )

            return response

        return Response({
            "message": "Invalid credentials",
            "status": "error",
            "errors": {"email": "Invalid email or password"}
        }, status=status.HTTP_400_BAD_REQUEST)
    

    
class RegisterView(generics.GenericAPIView):
    """Handles user registration"""

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "message": "Registration failed",
                "status": "error",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        return Response({
            "message": "User registered successfully",
            "status": "success",
            "data": {
                "user": UserSerializer(user).data,
            }
        }, status=status.HTTP_201_CREATED)


class UserProfileView(RetrieveUpdateAPIView):
    """Get or update the authenticated user's profile"""

    serializer_class = UserProfileSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        """Retrieve user profile"""
        serializer = self.get_serializer(self.get_object())
        return Response({
            "message": "User profile retrieved successfully",
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """Partial update (only update provided fields)"""
        serializer = self.get_serializer(self.get_object(), data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Profile updated successfully",
                "status": "success",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({
            "message": "Profile update failed",
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """Handles user logout by deleting the authentication token"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            response = Response({
                "message": "Logged out successfully",
                "status": "success"
            }, status=status.HTTP_200_OK)

            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")

            return response

        except Token.DoesNotExist:
            return Response({
                "message": "User is already logged out",
                "status": "error"
            }, status=status.HTTP_400_BAD_REQUEST)


class SessionView(APIView):
    """Check user authentication status"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
            }
        })