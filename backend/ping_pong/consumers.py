from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio


# class Ball:
#     def __init__(self,x, y, radius, speedX, speedY, angle, canvasW, canvasH, constSpeed):
#         self.x = x; # Ball's x position
#         self.y = y; # Ball's y position
#         self.radius = radius; # Ball's radius
#         self.speedX = speedX; # Horizontal speed
#         self.speedY = speedY; # Vertical speed
#         self.angle = angle;
#         self.canvas_width = canvasW;
#         self.canvas_height = canvasH;
#         self.constSpeed = constSpeed;
#         # this.genSpeed = genSpeed;
        
    # def move(self, rightX, leftX, rightY, leftY, paddleWidth, paddleHeight):
    #     # Update ball position
    #     self.x += self.speedX
    #     self.y += self.speedY
    #     # Bounce off top and bottom edges
    #     if self.y - self.radius <= 0 or self.y + self.radius >= self.canvas_height:
    #         self.speedY *= -1
    #     # Right paddle collision
    #     if (
    #         self.x + self.radius >= rightX and
    #         rightY <= self.y <= rightY + paddleHeight
    #     ):
    #         self._bounce(paddleHeight, rightY)
    #     # Left paddle collision
    #     elif (
    #         self.x - self.radius <= leftX + paddleWidth and
    #         leftY <= self.y <= leftY + paddleHeight
    #     ):
    #         self._bounce(paddleHeight, leftY)
    #     # Scoring logic
    #     if self.x - self.radius <= 0:
    #         return 'right'  # Right player scores
    #     elif self.x + self.radius >= self.canvas_width:
    #         return 'left'  # Left player scores
    #     return None  # No scoring
    
    # def _bounce(self, paddleheight, paddleY):
    #     point_of_coll = (self.y - (paddleY + paddleheight / 2)) / (paddleheight / 2)
    #     self.angle = point_of_coll * (math.pi / 4)
    #     direction = 1 if self.speedX < 0 else -1
    #     self.speedX = direction * self.constSpeed * math.cos(self.angle)
    #     self.speedY = self.constSpeed * math.sin(self.angle)

    # def reset(self):
    #     self.x = self.canvas_width / 2
    #     self.y = self.canvas_height / 2
    #     self.speedX *= -1  # Reverse direction
    #     self.speedY = 0
  
          


class Match:
    def __init__(self, player_1, player_2, group_name, match_number):
        self.player1 = player_1
        self.player2 = player_2
        self.group_name = group_name
        self.match_number = match_number
        self.is_active = True

    def players(self):
        return [self.player1, self.player2, self.group_name, self.match_number, self.is_active]
    
    
class Paddle:
    def __init__(self, paddleWidth, paddleHeight, paddleX, paddleY, paddleSpeed, paddleBord, paddleScore, canvasHeight, canvasWidth):
        self.paddleWidth = paddleWidth
        self.paddleHeight = paddleHeight
        self.paddleX = paddleX
        self.paddleY = paddleY
        self.paddleSpeed = paddleSpeed
        self.paddleBord = paddleBord
        self.paddleScore = paddleScore
        self.canvasHeight = canvasHeight
        self.canvasWidth = canvasWidth
    def to_dict(self):
            return {
            'width': self.paddleWidth,
            'height': self.paddleHeight,
            'x': self.paddleX,
            'y': self.paddleY,
            'speed': self.paddleSpeed,
            'border': self.paddleBord,
            'score': self.paddleScore,
            'canvasHeight': self.canvasHeight,
            'canvasWidth': self.canvasWidth 
        }

class GameClient(AsyncWebsocketConsumer):
    
    
    connected_sockets = []
    active_matches = []
    canvasHeight = 400
    canvasWidth = 600
    paddlesW = 10
    paddlesH = 100
    # paddlesX = 5
    # paddlesY = 100
    paddlesYL = 100
    paddlesXL = canvasWidth * 0.01
    paddlesYR = 100
    paddlesXR = canvasWidth * 0.98
    paddlesB = 10
    paddlesSpeed = 10
    paddlesScore = 10
    paddleRight = Paddle(
        paddleWidth=paddlesW,
        paddleHeight=paddlesH,
        paddleY=paddlesYR,
        paddleX=paddlesXR,
        paddleSpeed=paddlesSpeed,
        paddleBord=paddlesB,
        paddleScore=paddlesScore,
        canvasHeight=canvasHeight,
        canvasWidth=canvasWidth
    )
    
    paddleLeft = Paddle(
        paddleWidth=paddlesW,
        paddleHeight=paddlesH,
        paddleY=paddlesYL,
        paddleX=paddlesXL,
        paddleSpeed=paddlesSpeed,
        paddleBord=paddlesB,
        paddleScore=paddlesScore,
        canvasHeight=canvasHeight,
        canvasWidth=canvasWidth
    )
    
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
            self.new_match = Match(player1, player2, self.group_name, len(self.active_matches))
            await self.channel_layer.group_add(self.new_match.group_name, player1['player_name'])
            await self.channel_layer.group_add(self.new_match.group_name, player2['player_name'])
            self.active_matches.append(self.new_match)
            print(self.new_match.group_name)
            await self.channel_layer.send(player1['player_name'], # data{ type:"move", playerNumber: "1", groupName: "self.group_name" }
                {
                    'type': 'game_started',
                    'game_group': self.new_match.group_name,
                    'player': player1,
                    'paddleRight': self.paddleRight.to_dict(),
                    'paddleLeft': self.paddleLeft.to_dict()
                })
            await self.channel_layer.send(player2['player_name'], # data{ type:"move", playerNumber: "1", groupName: "self.group_name" }
                {
                    'type': 'game_started',
                    'game_group': self.new_match.group_name,
                    'player': player2,
                    'paddleRight': self.paddleRight.to_dict(),
                    'paddleLeft': self.paddleLeft.to_dict(),
                })
            
            
        
        
    async def receive(self, text_data):
       
        try:
            data = json.loads(text_data)
        except Exception as e:
            print("error :", e)
        if data['type'] == 'paddleMove':
            if data['playerNumber'] == '1':
                if data['direction'] == 'up':
                    self.paddleRight.paddleY += 10
                else: 
                    self.paddleRight.paddleY -= 10  
                group_name = data['gameGroup']
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': 'paddleMoved',
                        'playerNumber': data['playerNumber'],
                        'updateY': self.paddleRight.to_dict()
                    }
                )
            elif data['playerNumber'] == '2':
                if data['direction'] == 'up':
                    self.paddleLeft.paddleY += 10
                    # max(0, self.paddleLeft.paddleY - self.paddleLeft.paddleSpeed) 
                else:
                    self.paddleLeft.paddleY -= 10
                    # min(self.paddleLeft.paddleHeight - self.paddleLeft.paddleHeight, self.paddleLeft.paddleY + self.paddleLeft.paddleSpeed)   
                group_name = data['gameGroup']
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': 'paddleMoved',
                        'playerNumber': data['playerNumber'],
                        'updateY': self.paddleLeft.to_dict()
                    }
                )
                
    
    async def game_started(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'game_group': event['game_group'],
            'player': event['player'],
            'paddleRight': event['paddleRight'],
            'paddleLeft': event['paddleLeft'],
        }))
        
        
    # async def disconnect(self, close_data):
    #     await self.channel_layer.group_send(
    #         self.group_name,
    #         {
    #             'type': 'player_disconnected',
    #             'message': f'player {self.channel_name} disconnected'
    #         }
    #     )
        
    
        
    async def paddleMoved(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'playerNumber': event['playerNumber'],
            'updateY': event['updateY']
        }))
    
    

    async def player_disconnected(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'message': event['type']
        }))
        
    # async def ball_update(self, event):
    #     await self.send(json.dumps({
    #         'type': 'ball_update',
    #         'ballX': event['ballX'],
    #         'ballY': event['ballY']
    #     }))