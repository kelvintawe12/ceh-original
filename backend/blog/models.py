from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.conf import settings
from config.models import BaseModel
import uuid

User = settings.AUTH_USER_MODEL


class Blog(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    content = CKEditor5Field("Content", config_name="default")
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
