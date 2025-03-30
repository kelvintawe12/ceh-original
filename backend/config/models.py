from django.db import models
from django.utils.timezone import now
from uuid import uuid4

class BaseModel(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        get_latest_by = "created_at"
        abstract = True

    def delete(self, *args, **kwargs):
        """Soft delete the object by setting deleted_at timestamp"""
        self.deleted_at = now()
        self.save()

    def restore(self):
        """Restore the object by setting deleted_at to None"""
        self.deleted_at = None
        self.save()

    @property
    def is_deleted(self):
        return self.deleted_at is not None
