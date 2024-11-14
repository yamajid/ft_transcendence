from rest_framework_simplejwt.tokens import SlidingToken
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication

class   JWTCookieMiddleware:
    
    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request):
        # extract JWT token from the request
        token = request.COOKIES.get('token', None)
        
        try:
            token = SlidingToken(token)
            user_id = token['user_id']
            user = get_user_model().objects.get(id=user_id) # retrieve the user from the database 
            setattr(request, '_user', user)
            setattr(request, '_auth', token)
            setattr(request, '_authenticated_using_cookies', True) # attach him with JWT token into the request(and a flag setting the True means is authenticated)
        except:
            pass
            
        response = self.get_response(request)
        
        # process request/response
        
        return response


class   JWTCookieAuthentication(BaseAuthentication):
    
    def authenticate(self, request):
        if getattr(request, '_authenticated_using_cookies', False): # check the user if it's autheticated or not
            return request._user, request._auth
