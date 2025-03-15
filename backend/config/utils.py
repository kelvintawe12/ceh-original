from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


def authenticate(username, password):
    return


