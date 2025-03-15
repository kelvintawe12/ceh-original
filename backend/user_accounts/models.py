from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from config.models import BaseModel
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken


def user_folder(instance, filename):
    return f"user_{instance.user.id}/{filename}"


# User roles
USER_TYPES = (
    ("student", "Student"),
    ("volunteer", "Volunteer"),
    ("partner", "Partner"),
    ("admin", "Admin"),
)

# Genders
GENDERS = (
    ("male", "Male"),
    ("female", "Female"),
)


class User(BaseModel, AbstractUser):
    class Meta:
        db_table = "users"

    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True)
    role = models.CharField(
        max_length=50, choices=USER_TYPES, default="student")

    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=100, choices=GENDERS, blank=True, null=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)

        refresh['role'] = self.role

        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def save(self, *args, **kwargs):
        if self.role == "admin":
            self.is_staff = True
        return super().save(*args, **kwargs)


class ProfilePhoto(BaseModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile_photo",
    )
    file = models.ImageField(upload_to=user_folder,
                             default="default.png", blank=True, null=True)

    def __str__(self):
        return f"Profile Photo of {self.user.username}"


# Automatically create a ProfilePhoto when a User is created
@receiver(post_save, sender=User)
def create_user_profile_photo(sender, instance, created, **kwargs):
    if created:
        ProfilePhoto.objects.create(user=instance)
