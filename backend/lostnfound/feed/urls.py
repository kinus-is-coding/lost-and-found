# posts/urls.py (New file inside the posts app)

from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
# This single line creates: /posts/, /posts/{id}/
router.register(r'posts', PostViewSet)

urlpatterns = router.urls