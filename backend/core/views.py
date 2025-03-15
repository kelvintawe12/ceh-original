from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def home(request):
    return JsonResponse({"message": "Welcome to Circular Eco Hub!"})


def about(request):
    return JsonResponse({"message": "We aim to promote sustainability through circular economy practices."})


def contact(request):
    return JsonResponse({"email": "support@circularhub.com"})
