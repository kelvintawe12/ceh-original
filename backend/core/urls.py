from django.urls import path
from core import views
from django.urls import path
from .views import (
    CollaborationPostListCreateView, CollaborationPostRetrieveUpdateDestroyView,
    EventListCreateView, EventRetrieveUpdateDestroyView,
    EventRegistrationListCreateView, EventRegistrationRetrieveUpdateDestroyView,
    HackathonTeamListCreateView, HackathonTeamRetrieveUpdateDestroyView,
    HackathonTeamMemberListCreateView, HackathonTeamMemberRetrieveUpdateDestroyView,
    HackathonSubmissionListCreateView, HackathonSubmissionRetrieveUpdateDestroyView,
    ProjectListCreateView, ProjectRetrieveUpdateDestroyView,
    ProjectMemberListCreateView, ProjectMemberRetrieveUpdateDestroyView,
    BadgeListCreateView, BadgeRetrieveUpdateDestroyView,
    UserBadgeListCreateView, UserBadgeRetrieveUpdateDestroyView,
    PointTransactionListCreateView, PointTransactionRetrieveUpdateDestroyView,
    CommentListCreateView, CommentRetrieveUpdateDestroyView,
    LikeListCreateView, LikeRetrieveUpdateDestroyView,
    ResourceListCreateView, ResourceRetrieveUpdateDestroyView,
    OrganizationListCreateView, OrganizationRetrieveUpdateDestroyView
)

urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),

    path('collaboration-posts', CollaborationPostListCreateView.as_view(),
         name='collaborationpost-list-create'),
    path('collaboration-posts/<int:pk>',
         CollaborationPostRetrieveUpdateDestroyView.as_view(), name='collaborationpost-detail'),

    path('events', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>', EventRetrieveUpdateDestroyView.as_view(),
         name='event-detail'),

    path('event-registrations', EventRegistrationListCreateView.as_view(),
         name='eventregistration-list-create'),
    path('event-registrations/<int:pk>',
         EventRegistrationRetrieveUpdateDestroyView.as_view(), name='eventregistration-detail'),

    path('hackathon-teams', HackathonTeamListCreateView.as_view(),
         name='hackathonteam-list-create'),
    path('hackathon-teams/<int:pk>',
         HackathonTeamRetrieveUpdateDestroyView.as_view(), name='hackathonteam-detail'),

    path('hackathon-team-members', HackathonTeamMemberListCreateView.as_view(),
         name='hackathonteammember-list-create'),
    path('hackathon-team-members/<int:pk>',
         HackathonTeamMemberRetrieveUpdateDestroyView.as_view(), name='hackathonteammember-detail'),

    path('hackathon-submissions', HackathonSubmissionListCreateView.as_view(),
         name='hackathonsubmission-list-create'),
    path('hackathon-submissions/<int:pk>',
         HackathonSubmissionRetrieveUpdateDestroyView.as_view(), name='hackathonsubmission-detail'),

    path('projects', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>', ProjectRetrieveUpdateDestroyView.as_view(),
         name='project-detail'),

    path('project-members', ProjectMemberListCreateView.as_view(),
         name='projectmember-list-create'),
    path('project-members/<int:pk>',
         ProjectMemberRetrieveUpdateDestroyView.as_view(), name='projectmember-detail'),

    path('badges', BadgeListCreateView.as_view(), name='badge-list-create'),
    path('badges/<int:pk>', BadgeRetrieveUpdateDestroyView.as_view(),
         name='badge-detail'),

    path('user-badges', UserBadgeListCreateView.as_view(),
         name='userbadge-list-create'),
    path('user-badges/<int:pk>',
         UserBadgeRetrieveUpdateDestroyView.as_view(), name='userbadge-detail'),

    path('point-transactions', PointTransactionListCreateView.as_view(),
         name='pointtransaction-list-create'),
    path('point-transactions/<int:pk>',
         PointTransactionRetrieveUpdateDestroyView.as_view(), name='pointtransaction-detail'),

    path('comments', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>', CommentRetrieveUpdateDestroyView.as_view(),
         name='comment-detail'),

    path('likes', LikeListCreateView.as_view(), name='like-list-create'),
    path('likes/<int:pk>', LikeRetrieveUpdateDestroyView.as_view(), name='like-detail'),

    path('resources', ResourceListCreateView.as_view(),
         name='resource-list-create'),
    path('resources/<int:pk>', ResourceRetrieveUpdateDestroyView.as_view(),
         name='resource-detail'),

    path('organization', OrganizationListCreateView.as_view(),
         name='organization-list-create'),
    path('organization/<int:pk>', OrganizationRetrieveUpdateDestroyView.as_view(),
         name='organization-detail'),
]
