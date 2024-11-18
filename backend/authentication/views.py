import pprint
from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer, OauthSerializer
from rest_framework_simplejwt.views import TokenObtainSlidingView
from rest_framework_simplejwt.tokens import SlidingToken
import requests
from django.conf import settings

from rest_framework import permissions

class UserRegistration(APIView):
    userSerializer = UserSerializer
    def post(self, request):
        serializer = self.userSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User is created success"}, status=status.HTTP_201_CREATED)
    
class UserLogin(TokenObtainSlidingView): # here we use just one token (learn about sliding token)
    def post(self, request):
        response = super().post(request)
        if response.status_code == status.HTTP_200_OK:
            token = response.data.pop('token')
            response.set_cookie(
                key='token',
                value=token,
                httponly=True,
            )
            response.data = {'message':'loged in successfully'}
        return response



class UserAuthorization(TokenObtainSlidingView):
    serializer_class = OauthSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response.set_cookie(
            key='token',
            value=serializer.data['token'],
            httponly=True,
        )
        response = Response({'message':'loged in successfully'})
        return response


class   LogOutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        res = Response({'message': 'you logged out successfully'})
        token = SlidingToken(request.COOKIES['token'])
        token.blacklist()
        return res
            