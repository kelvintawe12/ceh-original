from django.urls import path
from .views import (
    ListCreateBlog, RetrieveUpdateDestroyBlog
)

urlpatterns = [
    path('', ListCreateBlog.as_view(), name='blog_list_create'),
    path('/<uuid:pk>', RetrieveUpdateDestroyBlog.as_view(), name='blog_retrieve_update_destroy'),
]
