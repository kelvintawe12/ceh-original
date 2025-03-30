from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.utils.timezone import now
from datetime import timedelta
from core.models import Project, ProjectMember, Resource
from .models import DashboardActivity
from .serializers import DashboardSerializer, DashboardActivitySerializer
from user_accounts.serializers import UserSerializer

class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            today = now()
            first_day_of_this_month = today.replace(day=1)
            first_day_of_last_month = (first_day_of_this_month - timedelta(days=1)).replace(day=1)

            def safe_count(queryset, date_field):
                return queryset.filter(**{
                    f"{date_field}__gte": first_day_of_this_month,
                    f"{date_field}__lt": today
                }).count()

            projects_count = safe_count(Project.objects.filter(created_by=user), "created_at")
            collaborators_count = safe_count(ProjectMember.objects.filter(user=user), "joined_at")
            resources_count = safe_count(Resource.objects.filter(uploaded_by=user), "created_at")
            points = getattr(user, 'points', 0)

            last_month_projects = safe_count(Project.objects.filter(created_by=user), "created_at")
            last_month_collaborators = safe_count(ProjectMember.objects.filter(user=user), "joined_at")
            last_month_resources = safe_count(Resource.objects.filter(uploaded_by=user), "created_at")
            last_month_points = getattr(user, 'last_month_points', 0)

            def percentage_change(current, previous):
                if previous == 0:
                    return 100 if current > 0 else 0
                return round(((current - previous) / previous) * 100, 1)

            projects_percentage = percentage_change(projects_count, last_month_projects)
            collaborators_percentage = percentage_change(collaborators_count, last_month_collaborators)
            resources_percentage = percentage_change(resources_count, last_month_resources)
            points_percentage = percentage_change(points, last_month_points)

            recent_activity = DashboardActivity.objects.filter(user=user).order_by('-timestamp')[:5]

            dashboard_data = {
                "user": UserSerializer(user).data,
                "projects": {
                    "count": projects_count,
                    "percentage_change": projects_percentage
                },
                "collaborators": {
                    "count": collaborators_count,
                    "percentage_change": collaborators_percentage
                },
                "resources": {
                    "count": resources_count,
                    "percentage_change": resources_percentage
                },
                "points": {
                    "count": points,
                    "percentage_change": points_percentage
                },
                "recent_activity": DashboardActivitySerializer(recent_activity, many=True).data
            }

            return Response({
                "message": "Dashboard data retrieved successfully",
                "status": "success",
                "data": dashboard_data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "message": "Failed to retrieve dashboard data",
                "status": "error",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
