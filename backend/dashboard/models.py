from django.db import models
from config.models import BaseModel
from django.conf import settings


class DashboardActivity(BaseModel):
    ACTIVITY_TYPES = (
        ("badge", "Earned Badge"),
        ("project_join", "Joined Project"),
        ("hackathon_submission", "Hackathon Submission"),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"
