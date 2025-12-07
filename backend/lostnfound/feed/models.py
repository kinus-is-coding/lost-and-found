from django.db import models

# Create your models here.

from django.conf import settings

class Post(models.Model):
    # Link post to the user who created it (using Django's default User model)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    location = models.TextField()
    image_url = models.URLField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title