# feed/urls.py
from django.urls import path
from .views import PostCreateAPIView, PostViewSet # <-- Ensure both are imported!

urlpatterns = [
    # 1. POST: Creation (Dedicated view for nested save)
    path('posts/', PostCreateAPIView.as_view(), name='post-create'),
    
    # 2. GET: List all posts
    path('posts/all/', PostViewSet.as_view({'get': 'list'}), name='post-list'),
    
    path('posts/<int:pk>/complete/', PostViewSet.as_view({'patch': 'complete'}), name='post-complete'),


    
    # 3. GET, PUT, DELETE: Retrieve, Update, or Delete a single post by ID
    path('posts/<int:pk>/', PostViewSet.as_view({
        'get': 'retrieve', 
        'put': 'update', 
        'patch': 'partial_update', 
        'delete': 'destroy'
    }), name='post-detail'),
]