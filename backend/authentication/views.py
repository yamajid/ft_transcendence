import pprint
from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainSlidingView
from rest_framework_simplejwt.tokens import SlidingToken

from rest_framework import permissions

class UserRegistration(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User is created success"}, status=status.HTTP_201_CREATED)
    
class UserLogin(TokenObtainSlidingView): # here we use just one token (learn about sliding token)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            token = response.data.pop('token')
            response.data = {'message':'loged in successfully'}
            response.set_cookie(
                key='token',
                value=token,
                httponly=True,
            )
        return response


class UserAuthorization(APIView):
    pass


class   TestAuthView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        return Response({
            'message': 'it works'
        })

class   LogOutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        res = Response({'message': 'you logged out successfully'})
        token = SlidingToken(request.COOKIES['token'])
        token.blacklist()
        return res
            