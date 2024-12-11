from channels.generic.websocket import AsyncWebsocketConsumer
import json


class Match:
    def __init__(self, player_1, player_2, group_name):
        self.player1 = player_1
        self.player2 = player_2
        self.group_name = group_name
        self.is_active = True

    def players(self):
        return [self.player1, self.player2, self.group_name]

class GameClient(AsyncWebsocketConsumer):
    
    
    connected_sockets = []
    active_matches = []
    num = 1 
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
            self.group_name = f'group_{len(self.active_matches)}'
            new_match = Match(player1, player2, self.group_name)
            self.active_matches.append(new_match)
            await self.channel_layer.group_add(self.group_name, player1['player_name'])
            await self.channel_layer.group_add(self.group_name, player2['player_name'])
            await self.channel_layer.group_send(self.group_name, # data{ type:"move", playerNumber: "1", groupName: "self.group_name" }
                {
                    'type': 'game_started',
                    'paddlesW': 10, 
                    'paddlesH': 100,
                    'paddlesX': 5,
                    'paddlesY': 200,
                    'paddlesB': 10,
                    'game_group': self.group_name
                })
        
        
        
    async def receive(self, text_data):
       
        try:
            data = json.loads(text_data)
        except Exception as e:
            print("error :", e)
        # if data['type'] == 'paddleMove':
        #     if data['playerNumber'] == '1':
        #         group_name = data.gameGroup
        #         await self.channel_layer.group_send(
        #             group_name,
        #             {
        #                 'type': 'paddleMoved',
        #                 'paddlew': data['paddlew'],
        #                 'paddleh': data['paddleh'],
        #                 'paddlex': data['paddlex'],
        #                 'paddley': data['paddley'],
        #                 'playerN': data['playerNumber']
        #             }
                # )
    
            
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
        
    # async def paddleMoved(self, event):
    #     await self.send(json.dumps({
    #         'type': event['type'],
    #         'paddlesW': event['paddlew'],
    #         'paddlesH': event['paddleh'],
    #         'paddlesX': event['paddlex'],
    #         'paddlesY': event['paddley'],
    #         'playerN': event['playerN']
            
    #     }))
    
    
    async def game_started(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'paddlesW': 10,
            'paddlesH': 100,
            'paddlesX': 5,
            'paddlesY': 200,
            'paddlesB': 10,
            'game_group': event['game_group']
            
        }))

    async def player_disconnected(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'message': event['type']
        }))