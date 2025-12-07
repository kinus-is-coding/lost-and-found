
# Create your views here.
# posts/views.py

from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    # Automatically set the post's author to the logged-in user upon creation
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)