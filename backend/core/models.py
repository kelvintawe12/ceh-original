from django.db import models
from config.models import BaseModel
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Organization(BaseModel):
    name = models.CharField(max_length=255)
    org_type = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="org_logos/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
class CollaborationPost(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="collaboration_posts")
    is_published = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


class Event(BaseModel):
    EVENT_TYPES = (
        ("workshop", "Workshop"),
        ("webinar", "Webinar"),
        ("hackathon", "Hackathon"),
        ("competition", "Competition"),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    location = models.CharField(max_length=255)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    partner_org = models.ForeignKey(Organization, null=True, blank=True, on_delete=models.SET_NULL)
    is_public = models.BooleanField(default=True)
    attendees = models.IntegerField()
    image = models.ImageField(upload_to='events/')
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title


class EventRegistration(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)
    is_attended = models.BooleanField(default=False)
    registration_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


def validate_hackathon_event(event):
    if event.event_type != "hackathon":
        raise ValidationError("Only hackathon events are allowed.")

class HackathonTeam(BaseModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, validators=[validate_hackathon_event])
    name = models.CharField(max_length=255)
    project_title = models.CharField(max_length=255, blank=True)
    is_submitted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class HackathonTeamMember(BaseModel):
    team = models.ForeignKey(HackathonTeam, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class HackathonSubmission(BaseModel):
    team = models.OneToOneField(HackathonTeam, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    repository_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    file_attachment = models.FileField(upload_to='hackathon_submissions/', null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(null=True, blank=True)
    is_winner = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title


class Project(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    partner_org = models.ForeignKey(Organization, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=50)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    is_published = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class ProjectMember(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.title


class Badge(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    icon_image = models.ImageField(upload_to='badges/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class UserBadge(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    awarded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class PointTransaction(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    points = models.IntegerField()
    activity = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class Comment(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    target_type = models.CharField(max_length=50)
    target_id = models.PositiveIntegerField()
    content = models.TextField()
    parent_comment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
        


class Like(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "content_type", "object_id")
        
    def __str__(self):
        return self.title


class Resource(models.Model):
    RESOURCE_TYPES = (
        ("document", "Document"),
        ("video", "Video"),
        ("link", "External Link"),
        ("other", "Other"),
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=50, choices=RESOURCE_TYPES)
    file = models.FileField(upload_to='resources/', null=True, blank=True)
    link = models.URLField(blank=True, null=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
