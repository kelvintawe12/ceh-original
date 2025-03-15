from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Blog
from .serializers import BlogSerializer


class ListCreateBlog(ListCreateAPIView):
    """List all blogs & create a new blog (authenticated users only)"""
    permission_classes = [
        IsAuthenticatedOrReadOnly]  # Authenticated users can create, others can only read
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer


class RetrieveUpdateDestroyBlog(RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific blog by UUID"""
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = "pk"  # This ensures we find the blog by its UUID
