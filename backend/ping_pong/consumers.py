from channels.generic.websocket import AsyncWebsocketConsumer
import json


class Match:
    def __init__(self, player_1, player_2, match_name):
        self.player_1 = player_1
        self.player_2 = player_2
        self.match_name = match_name
        
        self.is_active = True

    def players(self):
        return [self.player1, self.player2, self.match_name]

class GameClient(AsyncWebsocketConsumer):
    
    
    connected_sockets = []
    active_matches = []    
    async def connect(self):
        self.player = {}
        await self.accept()
        self.scope['player_name'] = self.channel_name
        self.player = {
            'player_name': self.channel_name,
            'player_number': '',
        }
        if len (self.connected_sockets) % 2 == 0:
            self.player['player_number'] = '1'
        else:
            self.player['player_number'] = '2'
        self.connected_sockets.append(self.player)
        await self.send(json.dumps({
            'type': 'connection',
            'information': self.player
        }))
        if len(self.connected_sockets) >= 2:
            player1 = self.connected_sockets.pop(0)
            player2 = self.connected_sockets.pop(0)
            self.group_name = 'game1'
            await self.channel_layer.group_add(self.group_name, player1['player_name'])
            await self.channel_layer.group_add(self.group_name, player2['player_name'])
            new_match = Match(player1, player2, self.group_name)
            self.active_matches.append(new_match)
            await self.channel_layer.group_send(self.group_name, # data{ type:"move", playerNumber: "1", groupName: "self.group_name" }
                {
                    'type': 'game_started',
                    'paddlesW': 700,
                    'paddlesH': 400,
                    'paddlesX': 1,
                    'paddlesY': 70, 
                    'paddlesS': 10,
                    'paddlesB': 10,
                    'paddlesSC': 0,
                    'game_group': self.group_name
                })
        
        
    async def game_started(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'paddlesW': 700,
            'paddlesH': 400,
            'paddlesX': 1,
            'paddlesY': 70, 
            'paddlesS': 10,
            'paddlesB': 10,
            'paddlesSC': 0,
            'game_group': event['game_group']
            
        }))
        #Matches['game'] ={
               
        #}
        
    # async def receive(self, text_data):
    # if data.type == 'move':
    #    
    #     try:
    #         data = json.loads(text_data)
    #     except Exception as e:
    #         print("error :", e)
    
            
    # async def disconnect(self, close_data):
    #     await self.channel_layer.group_discard(
    #         self.group_name,
    #         self.channel_name
    #     )
    #     await self.channel_layer.group_send(
    #         self.group_name,
    #         {
    #             'type': 'player_disconnected',
    #             'message': f'player {self.channel_name} disconnected'
    #         }
    #     )
        
    
    async def players_ready(self, event):
        await self.send(json.dumps({
            'type': event['type'],
        }))

    async def player_disconnected(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'message': event['type']
        }))