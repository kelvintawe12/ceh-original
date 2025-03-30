from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password
from .models import User, ProfilePhoto


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, data):
        """Authenticate user using email as the username"""
        user = authenticate(username=data.get("email"), password=data.get("password"))
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
        """Create user with hashed password"""
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        """Ensure password is hashed on update"""
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().update(instance, validated_data)


class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default="student", read_only=True)
    password = serializers.CharField(write_only=True, min_length=6, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, min_length=6, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["email", "password", "password2", "full_name", "institution", "role"]

    def validate(self, data):
        """Ensure both passwords match"""
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def validate_email(self, value):
        """Ensure email is unique"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        """Create user with hashed password"""
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    profile_photo = ProfilePhotoSerializer(required=False)

    class Meta:
        model = User
        fields = ["email", "full_name", "role", "date_of_birth", "gender", "phone_number", "city", "state", "address", "profile_photo"]
        read_only_fields = ["email", "role"]

    def update(self, instance, validated_data):
        """Allow updating user profile and profile photo"""
        profile_photo = validated_data.pop("profile_photo", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if profile_photo:
            if instance.profile_photo:
                instance.profile_photo.file = profile_photo["file"]
                instance.profile_photo.save()
            else:
                instance.profile_photo = ProfilePhoto.objects.create(user=instance, file=profile_photo["file"])

        instance.save()
        return instance



