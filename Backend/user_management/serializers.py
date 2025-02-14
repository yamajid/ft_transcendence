from .models import User, Match
from rest_framework import serializers
from urllib.parse import unquote, urlparse, urlunparse
from django.contrib.auth.hashers import make_password # for the password hashing

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'display_name', 'email', 'avatar', 'online', 'created_at', 'two_factor_status', 'score']
        read_only_fields = ['created_at'] # user_id is AutoField so it will be read_only by default, but I'll add them for readability convention
        extra_kwargs = {
            'password': {'write_only': True},
            # 'email': {'write_only': True},
        }

    def validate_password(self, value):
        if not value or len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return make_password(value)

    def validate_username(self, value):
        if len(value) < 5 or len(value) > 14:
            raise serializers.ValidationError("Username must be at least 5 characters long and at most 14 characters long")
        return value

    def update(self, instance, validated_data):
        if 'username' in validated_data:
            raise serializers.ValidationError({"username": "Username cannot be changed"})
        
        if 'password' in validated_data and instance.password is None:
            raise serializers.ValidationError({"password": ["Password cannot be changed for OAuth users"]})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Handling external urls (intra image)
        if representation['avatar'] and representation['avatar'].startswith(('/http', '/https')):
            representation['avatar'] = representation['avatar'][1:]
            representation['avatar'] = unquote(representation['avatar'])
            representation['avatar'] = representation['avatar'].replace(':', ':/', 1)

        return representation
    


class MatchSerializer(serializers.ModelSerializer):

    winner_user = UserSerializer(source='winner', read_only=True)
    loser_user = UserSerializer(source='loser', read_only=True)

    class Meta:
        model = Match
        fields = ['match_id', 'game_type', 'winner', 'loser', 'score', 'winner_user', 'loser_user', 'match_date']
        read_only_fields = ['match_id', 'match_date']
    

    def create(self, validated_data):
        if validated_data.get('winner') == validated_data.get('loser'):
            print(validated_data.get('winner'), validated_data.get('loser'))
            raise serializers.ValidationError("the winner and loser should not be the same.")
        instance = Match.objects.create(**validated_data)
        instance.save()
        return instance
