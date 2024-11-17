

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import SlidingToken


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.password = make_password(password)
        user.save()
        return user
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("this email already exists")
        return value
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("password must be at least 8 char")
        return value


from django.conf import settings
import requests


class   OauthSerializer(serializers.Serializer):
    
    TOKEN_URL = 'https://api.intra.42.fr/oauth/token'
    USER_INFO_URL = 'https://api.intra.42.fr/v2/me'
    
    
    code = serializers.CharField(max_length=250, write_only=True)
    token = serializers.CharField(read_only=True)
    User = get_user_model()
    class Meta:
        model = User
        fields = ['username', 'email']
        
    
    def exchange_code_with_token(self, code):
        params = {
            'client_id': settings.OAUTH_CLIENT_ID,
            'client_secret': settings.OAUTH_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.OAUTH_REDIRECT_URI,
            'grant_type': 'authorization_code',
        }
        headers ={
            'Accept': 'Application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        response = requests.post(
            url=self.TOKEN_URL,
            data=params,
            headers=headers
        )
        if response.status_code == 200:
            token =  response.json()['access_token']
            return token
        return None

    def get_user_info(self, access_token):
        res = requests.get(
            url=self.USER_INFO_URL,
            headers={
                'Authorization': f'Bearer {access_token}',
            }
        )
        if res.status_code == 200:
            return res.json()
        return None
    
    def validate(self, attrs):
        token = self.exchange_code_with_token(attrs['code'])
        if not token:
            raise serializers.ValidationError({'detail': 'Failed to exchange code with access_token'})
        user_info = self.get_user_info(token)
        if not user_info:
            raise serializers.ValidationError({'detail': 'Failed to get user info'})
        return user_info
    
    def create(self, validated_data):
        email = validated_data.get('email')
        username = validated_data.get('login')
        user, _ = User.objects.get_or_create(email=email, defaults={
            'username': username
        })
        token = SlidingToken.for_user(user=user)
        return {"token": str(token)}
        
        
