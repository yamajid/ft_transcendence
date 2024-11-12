import pprint
from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_simplejwt.views import  TokenObtainPairView

class UserRegistration(APIView):
    permission_classes = []
    authentication_classes = []
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User is created success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLogin(TokenObtainPairView):
    permission_classes = []
    authentication_classes = []
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            response.set_cookie('access_token', access_token, httponly=True, max_age=250000, expires=250000, secure=True, samesite='None')
            response.set_cookie('refresh_token', refresh_token, httponly=True, max_age=250000, expires=250000, secure=True ,samesite='None')
            # response.set_cookie('logged_in', 'true', httponly=False, max_age=250000, expires=250000, secure=False ,samesite='Strict')
        return response