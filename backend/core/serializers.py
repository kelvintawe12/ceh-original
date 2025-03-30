from rest_framework import serializers
from .models import (
    CollaborationPost, Event, EventRegistration,
    HackathonTeam, HackathonTeamMember, HackathonSubmission,
    Project, ProjectMember, Badge, UserBadge, PointTransaction,
    Comment, Like, Resource, Organization
)


class CollaborationPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollaborationPost
        fields = ["id", "title", "description", "created_by", "is_published", "is_approved", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "title", "description", "event_type", "start_datetime", "end_datetime", "location", "attendees", "image", "partner_org", "is_public", "is_approved", "created_at"]
        read_only_fields = ["id", "created_at"]


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = ["id", "user", "event", "role", "is_attended", "registration_date"]
        read_only_fields = ["id", "registered_at"]


class HackathonTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonTeam
        fields = ["id", "event", "name", "project_title", "is_submitted", "created_at"]
        read_only_fields = ["id", "created_at"]


class HackathonTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonTeamMember
        fields = ["id", "team", "user", "role", "joined_at"]
        read_only_fields = ["id", "joined_at"]


class HackathonSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonSubmission
        fields = ["id", "team", "title", "description", "repository_url", "demo_url", "file_attachment", "submitted_at", "score", "is_winner",
                  "submitted_at"]
        read_only_fields = ["id", "submitted_at"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "description", "created_by", "partner_org", "status", "start_date", "end_date", "is_published", "is_approved", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class ProjectMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMember
        fields = ["id", "project", "user", "role", "joined_at"]
        read_only_fields = ["id", "joined_at"]


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ["id", "name", "description", "icon_image", "created_at"]
        read_only_fields = ["id", "created_at"]


class UserBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBadge
        fields = ["id", "user", "badge", "awarded_at"]
        read_only_fields = ["id", "awarded_at"]


class PointTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointTransaction
        fields = ["id", "user", "points", "activity", "created_at"]
        read_only_fields = ["id", "created_at"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "user", "target_type", "target_id", "content", "parent_comment", "is_approved", "created_at"]
        read_only_fields = ["id", "created_at"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "content_type", "object_id", "content_object", "created_at"]
        read_only_fields = ["id", "created_at"]
        
class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ["id", "title", "description", "resource_type", "file", "link", "uploaded_by", "organization", "created_at",
                  "created_at"]
        read_only_fields = ["id", "created_at"]


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"