from django.contrib import admin
from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget
from .models import Blog


class BlogAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget(
        config_name="default"))  # Use CKEditor5

    class Meta:
        model = Blog
        fields = "__all__"


class BlogAdmin(admin.ModelAdmin):
    form = BlogAdminForm


admin.site.register(Blog, BlogAdmin)
