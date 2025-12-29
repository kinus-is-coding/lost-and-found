from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from .models import Post, QuizQuestion
from .serializers import PostSerializer
from django.db import transaction 
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated # Hoặc AllowAny nếu không cần login
# --- 1. ViewSet for Retrieval, Listing, Update, and Delete ---
class PostViewSet(viewsets.ModelViewSet):
   
    def get_queryset(self):
        return Post.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = PostSerializer
    
    # Allow ANYONE to read (GET), but only authenticated users to update/delete.
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def complete(self, request, pk=None):
        try:
            post = self.get_object()
            
            # Deactive món đồ
            post.is_active = False
            post.save()

            # Trả về thêm thông tin cần thiết (ví dụ locker_id để Next.js xử lý)
            return Response({
                "status": "success",
                "message": "Post deactivated successfully.",
                "locker_id": getattr(post, 'locker_id', None) # Phòng hờ bro có field này
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        if self.request.user.is_authenticated:
             serializer.save(author=self.request.user)
        else:
             serializer.save()


class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny] 

    def create(self, request, *args, **kwargs):
        mutable_data = request.data.copy() 
        quiz_data = mutable_data.pop('questions', []) 
        
        # 1. KIỂM TRA TRÙNG LOCKER TRƯỚC KHI LÀM BẤT CỨ GÌ
        locker_id = mutable_data.get('locker_id')
        if locker_id:
            # Chỉ chặn nếu locker đó đang có bài ACTIVE
            is_busy = Post.objects.filter(locker_id=locker_id, is_active=True).exists()
            if is_busy:
                return Response(
                    {"error": f"Tủ {locker_id} hiện đang có người sử dụng. Vui lòng chọn tủ khác!"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        post_serializer = self.get_serializer(data=mutable_data)
        post_serializer.is_valid(raise_exception=True)
        
        try:
            with transaction.atomic():
                author = request.user if request.user.is_authenticated else None
                post_item = post_serializer.save(author=author) 

                for question in quiz_data:
                    QuizQuestion.objects.create(
                        post=post_item, 
                        question_text=question['text'],
                        choices_json=question['choices'],
                        correct_choice_id=question['correctChoiceId']
                    )

            return Response(post_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": "Không thể tạo bài đăng.", "details": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )