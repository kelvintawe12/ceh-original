from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('ckeditor5/', include('django_ckeditor_5.urls')),
    path("account", include("user_accounts.urls")),
    path("account", include("user_accounts.urls")),
    path("blog", include("blog.urls")),
    path('', include('core.urls')),
    path("api/schema", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/docs-redoc", SpectacularRedocView.as_view(url_name="schema"), name="redoc"
    ),
]
