from django.http import JsonResponse
from django.utils.timezone import now
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from core.models import (
    CollaborationPost, Event, EventRegistration,
    HackathonTeam, HackathonTeamMember, HackathonSubmission,
    Project, ProjectMember, Badge, UserBadge, PointTransaction,
    Comment, Like, Resource, Organization
)
from core.serializers import (
    CollaborationPostSerializer, EventSerializer, EventRegistrationSerializer,
    HackathonTeamSerializer, HackathonTeamMemberSerializer, HackathonSubmissionSerializer,
    ProjectSerializer, ProjectMemberSerializer, BadgeSerializer, UserBadgeSerializer,
    PointTransactionSerializer, CommentSerializer, LikeSerializer, ResourceSerializer, OrganizationSerializer
)


def home(request):
    return JsonResponse({"message": "Welcome to Circular Eco Hub!"}, status=200)


def about(request):
    return JsonResponse(
        {"message": "We aim to promote sustainability through circular economy practices."},
        status=200
    )


def contact(request):
    return JsonResponse({"email": "support@circularhub.com"}, status=200)


class BaseAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        """Get list of objects"""
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "message": "Data retrieved successfully",
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """Create an object"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Data created successfully",
                "status": "success",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "message": "Validation failed",
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        """Get a single object"""
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "message": "Data retrieved successfully",
            "status": "success",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """Update an object"""
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Data updated successfully",
                "status": "success",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "message": "Update failed",
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """Delete an object"""
        instance = self.get_object()
        instance.delete()
        return Response({
            "message": "Data deleted successfully",
            "status": "success"
        }, status=status.HTTP_204_NO_CONTENT)


class CollaborationPostListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = CollaborationPost.objects.all()
    serializer_class = CollaborationPostSerializer


class CollaborationPostRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = CollaborationPost.objects.all()
    serializer_class = CollaborationPostSerializer


class EventListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        current_time = now()

        upcoming_events = Event.objects.filter(end_datetime__gte=current_time)
        past_events = Event.objects.filter(end_datetime__lt=current_time)

        upcoming_events_data = EventSerializer(upcoming_events, many=True).data
        past_events_data = EventSerializer(past_events, many=True).data

        return Response({
            "message": "Data retrieved successfully",
            "status": "success",
            "upcoming_events": upcoming_events_data,
            "past_events": past_events_data
        })


class EventRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventRegistrationListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer


class EventRegistrationRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer


class HackathonTeamListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = HackathonTeam.objects.all()
    serializer_class = HackathonTeamSerializer


class HackathonTeamRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = HackathonTeam.objects.all()
    serializer_class = HackathonTeamSerializer


class HackathonTeamMemberListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = HackathonTeamMember.objects.all()
    serializer_class = HackathonTeamMemberSerializer


class HackathonTeamMemberRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = HackathonTeamMember.objects.all()
    serializer_class = HackathonTeamMemberSerializer


class HackathonSubmissionListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = HackathonSubmission.objects.all()
    serializer_class = HackathonSubmissionSerializer


class HackathonSubmissionRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = HackathonSubmission.objects.all()
    serializer_class = HackathonSubmissionSerializer


class ProjectListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectMemberListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = ProjectMember.objects.all()
    serializer_class = ProjectMemberSerializer


class ProjectMemberRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectMember.objects.all()
    serializer_class = ProjectMemberSerializer


class BadgeListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer


class BadgeRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer


class UserBadgeListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = UserBadge.objects.all()
    serializer_class = UserBadgeSerializer


class UserBadgeRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = UserBadge.objects.all()
    serializer_class = UserBadgeSerializer


class PointTransactionListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = PointTransaction.objects.all()
    serializer_class = PointTransactionSerializer


class PointTransactionRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = PointTransaction.objects.all()
    serializer_class = PointTransactionSerializer


class CommentListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class LikeListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class LikeRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class ResourceListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class ResourceRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class OrganizationListCreateView(BaseAPIView, generics.ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class OrganizationRetrieveUpdateDestroyView(BaseAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
