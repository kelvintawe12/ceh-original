from rest_framework import serializers
from core.models import Project, ProjectMember, PointTransaction
from .models import DashboardActivity


class DashboardActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardActivity
        fields = "__all__"
        read_only_fields = ["user", "timestamp"]


class DashboardSerializer(serializers.Serializer):
    full_name = serializers.CharField(source="user.full_name")
    projects = serializers.IntegerField()
    collaborators = serializers.IntegerField()
    resources = serializers.IntegerField()
    points = serializers.IntegerField()
    recent_activity = DashboardActivitySerializer(many=True)
