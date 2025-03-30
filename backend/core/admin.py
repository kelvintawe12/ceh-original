from django.contrib import admin
from .models import (
    CollaborationPost, Event, EventRegistration, HackathonTeam, HackathonTeamMember, 
    HackathonSubmission, Project, ProjectMember, Badge, UserBadge, PointTransaction, 
    Comment, Like, Resource
)


@admin.register(CollaborationPost)
class CollaborationPostAdmin(admin.ModelAdmin):
    list_display = ("title", "created_by", "is_published", "is_approved", "created_at")
    search_fields = ("title", "created_by__full_name")
    list_filter = ("is_published", "is_approved")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "event_type", "start_datetime", "end_datetime", "organizer", "is_public", "is_approved")
    search_fields = ("title", "organizer__full_name")
    list_filter = ("event_type", "is_public", "is_approved")


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ("user", "event", "role", "is_attended", "registration_date")
    search_fields = ("user__full_name", "event__title")
    list_filter = ("is_attended",)


@admin.register(HackathonTeam)
class HackathonTeamAdmin(admin.ModelAdmin):
    list_display = ("name", "event", "is_submitted", "created_at")
    search_fields = ("name", "event__title")
    list_filter = ("is_submitted",)


@admin.register(HackathonTeamMember)
class HackathonTeamMemberAdmin(admin.ModelAdmin):
    list_display = ("user", "team", "role", "joined_at")
    search_fields = ("user__full_name", "team__name")


@admin.register(HackathonSubmission)
class HackathonSubmissionAdmin(admin.ModelAdmin):
    list_display = ("team", "title", "repository_url", "is_winner", "score", "submitted_at")
    search_fields = ("title", "team__name")
    list_filter = ("is_winner",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "created_by", "status", "is_published", "is_approved", "start_date", "end_date")
    search_fields = ("title", "created_by__full_name")
    list_filter = ("status", "is_published", "is_approved")


@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    list_display = ("user", "project", "role", "joined_at")
    search_fields = ("user__full_name", "project__title")


@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name",)


@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ("user", "badge", "awarded_at")
    search_fields = ("user__full_name", "badge__name")


@admin.register(PointTransaction)
class PointTransactionAdmin(admin.ModelAdmin):
    list_display = ("user", "points", "activity", "created_at")
    search_fields = ("user__full_name", "activity")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "target_type", "target_id", "content", "is_approved", "created_at")
    search_fields = ("user__full_name", "target_type")
    list_filter = ("is_approved",)


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("user", "content_type", "object_id", "created_at")
    search_fields = ("user__full_name", "content_type__model")


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "resource_type", "uploaded_by", "created_at")
    search_fields = ("title", "uploaded_by__full_name")
    list_filter = ("resource_type",)



