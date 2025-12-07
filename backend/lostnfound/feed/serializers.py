# posts/serializers.py

from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    # Field to display the author's username instead of their ID
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ['id', 'author_username', 'title', 'location', 'image_url', 'created_at', 'author']
        # 'author' field is hidden from read operations but needed for writes
        read_only_fields = ['author']