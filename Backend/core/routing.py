from chat.routing import websocket_urlpatterns as chat_routing
from tic_tac_toe.routing import websocket_urlpatterns as tic_tac_toe_routing
from ping_pong.routing import pong_urlpatterns

websocket_urlpatterns = []
websocket_urlpatterns += chat_routing
websocket_urlpatterns += tic_tac_toe_routing
websocket_urlpatterns += pong_urlpatterns