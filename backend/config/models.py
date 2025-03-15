from uuid import uuid4
from django.db import models


class BaseModel(models.Model):

    id = models.UUIDField(
        default=uuid4, editable=False, unique=True, primary_key=True, null=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)

    class Meta:
        ordering = ["created_at"]
        get_latest_by = "-created_at"
        abstract = True
    
