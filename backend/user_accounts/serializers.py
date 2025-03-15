from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import User, ProfilePhoto
from django.contrib.auth.hashers import make_password


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True, style={"input_type": "password"})

    def validate(self, data):
        user = authenticate(email=data.get("email"),
                            password=data.get("password"))
        if not user:
            raise AuthenticationFailed("Invalid login credentials")

        data["user"] = user
        return data


class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePhoto
        fields = ["file"]


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_photo = ProfilePhotoSerializer(required=False)

    class Meta:
        model = User
        exclude = ["groups", "user_permissions", "deleted_at"]

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, min_length=6, style={"input_type": "password"}
    )
    password2 = serializers.CharField(
        write_only=True, min_length=6, style={"input_type": "password"}
    )
    profile_photo = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2", "first_name", "last_name", "role",
                  "date_of_birth", "gender", "phone_number", "city", "state", "address", "profile_photo"]

    def validate(self, data):
        """Ensure both passwords match"""
        if data["password"] != data["password2"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."})
        return data

    def validate_email(self, value):
        """Ensure email is unique"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists.")
        return value

    def create(self, validated_data):
        """Create user with hashed password and optional profile photo"""
        validated_data.pop("password2")  # Remove password2 before saving
        profile_photo = validated_data.pop("profile_photo", None)

        # Use `create_user` instead of `create` to properly handle password hashing
        user = User.objects.create_user(**validated_data)

        return user


class ProfilePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePhoto
        fields = ["file"]


class UserProfileSerializer(serializers.ModelSerializer):
    profile_photo = ProfilePhotoSerializer(required=False)

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "role",
                  "date_of_birth", "gender", "phone_number", "city", "state", "address", "profile_photo"]
        read_only_fields = ["email", "role"]

    def update(self, instance, validated_data):
        """Allow updating user profile and profile photo"""
        profile_photo = validated_data.pop("profile_photo", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Only update profile photo if a new one is provided
        if profile_photo:
            if instance.profile_photo:
                instance.profile_photo.file = profile_photo
                instance.profile_photo.save()
            else:
                instance.profile_photo = ProfilePhoto.objects.create(
                    user=instance, file=profile_photo
                )

        instance.save()
        return instance
