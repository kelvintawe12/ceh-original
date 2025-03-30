from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework_simplejwt.tokens import RefreshToken
from config.models import BaseModel


def user_folder(instance, filename):
    return f"user_{instance.id}/{filename}"


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        extra_fields.setdefault("is_active", True)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


USER_TYPES = (
    ("student", "Student"),
    ("faculty", "Volunteer"),
    ("admin", "Administrator"),
    ("partner", "External Partner"),
)

GENDERS = (
    ("male", "Male"),
    ("female", "Female"),
)


class User(BaseModel, AbstractUser):
    class Meta:
        db_table = "users"

    username = None
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=False, blank=False)
    role = models.CharField(max_length=50, choices=USER_TYPES, default="student")
    institution = models.CharField(max_length=500)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=100, choices=GENDERS, blank=True, null=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "role", "institution"]

    objects = CustomUserManager()

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        refresh["role"] = self.role
        refresh["email"] = self.email

        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def save(self, *args, **kwargs):
        if self.role == "admin" or self.is_superuser:
            self.is_staff = True
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.full_name}"


class ProfilePhoto(BaseModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile_photo",
    )
    file = models.ImageField(upload_to=user_folder, default="default.png", blank=True, null=True)

    def __str__(self):
        return f"Profile Photo of {self.user.full_name}"


@receiver(post_save, sender=User)
def create_user_profile_photo(sender, instance, created, **kwargs):
    if created:
        ProfilePhoto.objects.create(user=instance)



