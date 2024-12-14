from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio


class Ball:
    def __init__(self,x, y, radius, speedX, speedY, angle, canvasW, canvasH, constSpeed):
        self.x = x; # Ball's x position
        self.y = y; # Ball's y position
        self.radius = radius; # Ball's radius
        self.speedX = speedX; # Horizontal speed
        self.speedY = speedY; # Vertical speed
        self.angle = angle;
        self.canvas_width = canvasW;
        self.canvas_height = canvasH;
        self.constSpeed = constSpeed;
        # this.genSpeed = genSpeed;
        
    def move(self, rightX, leftX, rightY, leftY, paddleWidth, paddleHeight):
        # Update ball position
        self.x += self.speedX
        self.y += self.speedY
        # Bounce off top and bottom edges
        if self.y - self.radius <= 0 or self.y + self.radius >= self.canvas_height:
            self.speedY *= -1
        # Right paddle collision
        if (
            self.x + self.radius >= rightX and
            rightY <= self.y <= rightY + paddleHeight
        ):
            self._bounce(paddleHeight, rightY)
        # Left paddle collision
        elif (
            self.x - self.radius <= leftX + paddleWidth and
            leftY <= self.y <= leftY + paddleHeight
        ):
            self._bounce(paddleHeight, leftY)
        # Scoring logic
        if self.x - self.radius <= 0:
            return 'right'  # Right player scores
        elif self.x + self.radius >= self.canvas_width:
            return 'left'  # Left player scores
        return None  # No scoring
    
    def _bounce(self, paddleheight, paddleY):
        point_of_coll = (self.y - (paddleY + paddleheight / 2)) / (paddleheight / 2)
        self.angle = point_of_coll * (math.pi / 4)
        direction = 1 if self.speedX < 0 else -1
        self.speedX = direction * self.constSpeed * math.cos(self.angle)
        self.speedY = self.constSpeed * math.sin(self.angle)

    def reset(self):
        self.x = self.canvas_width / 2
        self.y = self.canvas_height / 2
        self.speedX *= -1  # Reverse direction
        self.speedY = 0
  


class Match:
    def __init__(self, player_1, player_2, group_name, match_number):
        self.player1 = player_1
        self.player2 = player_2
        self.group_name = group_name
        self.match_number = match_number
        self.is_active = True

    def players(self):
        return [self.player1, self.player2, self.group_name, self.match_number, self.is_active]

class GameClient(AsyncWebsocketConsumer):
    
    
    connected_sockets = []
    active_matches = []
    num = 1
    canvasHeight = 400
    canvasWidth = 600
    paddlesW = 10
    paddlesH = 100
    paddlesX = 5
    paddlesY = 100
    paddlesYL = 0
    paddlesYR = 0
    paddlesXL = 0
    paddlesXR = 0
    paddlesB = 10
    def __init__(self):
        super().__init__()
        self.ball = Ball(
            x= self.canvasWidth / 2,
            y= self.canvasHeight / 2,
            radius= self.canvasWidth * 0.02,
            speedX=5,
            speedY=0,
            angle=0,
            canvasW=self.canvasWidth,
            canvasH=self.canvasHeight,
            constSpeed=5
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
            new_match = Match(player1, player2, self.group_name, len(self.active_matches))
            self.active_matches.append(new_match)
            await self.channel_layer.group_add(self.group_name, player1['player_name'])
            await self.channel_layer.group_add(self.group_name, player2['player_name'])
            await self.channel_layer.group_send(self.group_name, # data{ type:"move", playerNumber: "1", groupName: "self.group_name" }
                {
                    'type': 'game_started',
                    'game_group': self.group_name,
                    #paddles
                    'canvasHeight': self.canvasHeight,
                    'canvasWidth': self.canvasWidth,
                    'paddlesW': self.paddlesW, 
                    'paddlesH': self.paddlesH,
                    'paddlesXleft': self.canvasWidth * 0.97,
                    'paddlesXright': self.canvasWidth * 0.01,
                    'paddlesY': self.paddlesY,
                    'paddlesB': self.paddlesB,
                    #ball
                    'ballX': self.canvasHeight / 2,
                    'ballY': self.canvasWidth / 2,
                    'radius': self.canvasWidth *.02,
                    'speedX': 5,
                    'speedY': 0 ,
                    'constSpeed': 5,
                    'angle': 0
                })
            
            
        # while True:
        #     print("here")
        #     score = self.ball.move(GameClient.paddlesXR, GameClient.paddlesXL, GameClient.paddlesYR, GameClient.paddlesYL, GameClient.paddlesW, GameClient.paddlesH)
        #     print(GameClient.paddlesW)
        #     if score == 'left':
        #         pass
        #     else:
        #         pass
        #     self.ball.reset()
        
        
    async def receive(self, text_data):
       
        try:
            data = json.loads(text_data)
        except Exception as e:
            print("error :", e)
        if data['type'] == 'paddleMove':
            if data['playerNumber'] == '1':
                if data['direction'] == 'up':
                    GameClient.paddlesY = data['paddley']
                    GameClient.paddlesYL = data['paddley']
                    GameClient.paddlesXL = data['paddlex']
                else:
                    GameClient.paddlesY = data['paddley']
                    GameClient.paddlesYL = data['paddley']
                    GameClient.paddlesXL = data['paddlex']
                group_name = data['gameGroup']
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': 'paddleMoved',
                        'playerNumber': data['playerNumber'],
                        'updateY': GameClient.paddlesY
                    }
                )
            elif data['playerNumber'] == '2':
                if data['direction'] == 'up':
                    GameClient.paddlesY = data['paddley']
                    GameClient.paddlesYR = data['paddley']
                    GameClient.paddlesXR = data['paddlex']
                else:
                    GameClient.paddlesY = data['paddley']
                    GameClient.paddlesYR = data['paddley']
                    GameClient.paddlesXR = data['paddlex']
                group_name = data['gameGroup']
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': 'paddleMoved',
                        'playerNumber': data['playerNumber'],
                        'updateY': GameClient.paddlesY
                    }
                )
                
    
    async def game_started(self, event):
        await self.send(json.dumps({
            'type': event['type'],
            'game_group': event['game_group'],
            'canvasHeight': event['canvasHeight'],
            'canvasWidth': event['canvasWidth'],
            'paddlesW': event['paddlesW'],
            'paddlesH': event['paddlesH'],
            'paddlesXleft': event['paddlesXleft'],
            'paddlesXright': event['paddlesXright'],
            'paddlesY': event['paddlesY'],
            'paddlesB': event['paddlesB'],
            'ballX': event['ballX'],
            'ballY': event['ballY'],
            'radius': event['radius'],
            'speedX': event['speedX'],
            'speedY': event['speedY'],
            'constSpeed': event['constSpeed'],
            'angle': event['angle']
        }))
        
        
    async def disconnect(self, close_data):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
        
        
        
        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'player_disconnected',
                'message': f'player {self.channel_name} disconnected'
            }
        )
        
    
        
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