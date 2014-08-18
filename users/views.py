from django.contrib.auth import authenticate, login

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from users.serializers import LoginSerializer 

# Create your views here.
class LoginView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.DATA)
        if serializer.is_valid():
            login(request, serializer.user_cache)
            if not serializer.data['remember']:
                request.session.set_expiry(0)
            return Response({'success': True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)