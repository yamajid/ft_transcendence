/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.jsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: yamajid <yamajid@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/11/19 12:41:28 by momihamm          #+#    #+#             */
/*   Updated: 2024/12/13 17:10:43 by yamajid          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import './index.css'; // Import the CSS file
// import Canvas from './canvas';
import React, { useState, useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import { Paddle, Ball } from './gameobjects';
import useWebSocket from 'react-use-websocket';

function Back() {
  return <div className="background"></div>;
}
let yL = 0
let yR = 0
let xR = 0
let xL = 0
let paddleHeight = 0
let paddleWidth = 0
let bord = 0
let canvasH = 0
let canvasW = 0
let ballX =  0
let ballY =  0
let radius =  0
let speedX = 0
let speedY =  0
let constSpeed = 0
let angle = 0

function App() {
  const [gameUrl] = useState('ws://127.0.0.1:8000/ws/ping_pong');
  const { sendMessage, lastMessage, readyState } = useWebSocket(gameUrl);
  const [playerNumber, setPlayerNmber] = useState('')
  // const [matchNumber, setMatchNmber] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [gameG, setGame] = useState('')
  
  useEffect(() => {
        if (readyState === WebSocket.OPEN){
          if (lastMessage != null){
            const data = JSON.parse(lastMessage.data);
            // console.log(data)
            if (data['type'] === 'connection'){
                setPlayerNmber(data['information']['player_number'])
                setPlayerName(data['information']['player_name'])
            }
            if (data['type'] === 'game_started')
              {
                // console.log(data['matchNum'])
                canvasH = data['canvasHeight']
                canvasW = data['canvasWidth']
                paddleWidth = data['paddlesW']    
                paddleHeight = data['paddlesH']    
                xL = data['paddlesXleft']    
                xR = data['paddlesXright']    
                yL = data['paddlesY']       
                yR = data['paddlesY']       
                bord = data['paddlesB']
                ballX = data['ballX']
                ballY = data['ballY']
                radius = data['radius']
                speedX = data['speedX']
                speedY = data['speedY']
                constSpeed = data['constSpeed']
                angle = data['angle']
                setGame(data['game_group'])
                
              }
              // console.log(data)
            if (data['type'] === "paddleMoved"){
                // console.log(data);
                if (data['playerNumber'] === '1')
                    yL = data.updateY;
                else
                    yR = data.updateY;
            }
            }
              
          }
        }, [lastMessage])
  const Canvas = () => {
    let ball, leftPaddle, rightPaddle;
    // let paddleWidth = width;//= p5.width * 0.02; // 2% of canvas width
    // let paddleHeight = height;// = p5.height * 0.2; // 20% of canvas height
    // let ballRadius = 0;// p5.width * 0.02; // 2% of canvas width
    // let initAngle = 0;
    // let constBallSpeed = ballSpeed;
    
      const setup = (p5, canvasParentRef) => {
      const canvasWidth = canvasW; // 80% of window width
      const canvasHeight = canvasH; // 80% of window height
      const canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
      let initScore = 0;
      let ballSpeed = 10 ;
      paddleWidth = canvasWidth * 0.01; // 2% of canvas width
      paddleHeight = canvasHeight * 0.2; // 20% of canvas height
      // ballRadius = canvasWidth * 0.02; // 2% of canvas width
  
      // Position the canvas
      canvas.style('position', 'absolute'); // Use absolute positioning
      canvas.style('top', '2%');          // Move 20% down
      canvas.style('left', '10%');         // Move 10% to the right
      canvas.style('border-radius', '15px');
      canvas.style('border', '2px dashed white');
      leftPaddle = new Paddle(xL , yL, paddleWidth, paddleHeight, 10, 10, initScore);
      // console.log(yR)
      rightPaddle = new Paddle(xR - paddleWidth, yR, paddleWidth, paddleHeight, 10, 10, initScore);
      ball = new Ball(ballX, ballY, radius, speedX, speedY, angle, canvasWidth, speedY);
      p5.frameRate(60);
    };
    
    const handlePaddleMovement = (p5) => {
      // console.log("whach dkhel be3da");
      // Move left paddle with W (up) and S (down)
      if (p5.keyIsDown(87) ) { // 'W' key
        // console.log(playerNumber)
        // console.log(playerName)
        // console.log(gameG)
        leftPaddle.y = Math.max(0, leftPaddle.y - leftPaddle.speed); // Prevent moving out of bounds
        // console.log(leftPaddle.y)
        sendMessage(JSON.stringify({
          'type' : 'paddleMove',
          'direction': 'up',
          'playerNumber': playerNumber,
          'playerName': playerName,
          'paddley': leftPaddle.y,
          'paddlex': leftPaddle.x,
          'gameGroup': gameG
        }))
      }
      if (p5.keyIsDown(83)) { // 'S' key
        leftPaddle.y = Math.min(p5.height - leftPaddle.height, leftPaddle.y + leftPaddle.speed);
        sendMessage(JSON.stringify({
          'type' : 'paddleMove',
          'direction': 'down',
          'playerNumber': playerNumber,
          'playerName': playerName,
          'paddley': leftPaddle.y,
          'paddlex': leftPaddle.x,
          'gameGroup': gameG
        }))
      }
      
      // Move right paddle with UP and DOWN arrow keys
      if (p5.keyIsDown(p5.UP_ARROW)) {
        rightPaddle.y = Math.max(0, rightPaddle.y - rightPaddle.speed);
        sendMessage(JSON.stringify({
          'type' : 'paddleMove',
          'direction': 'up',
          'playerNumber': playerNumber,
          'playerName': playerName,
          'paddley': rightPaddle.y,
          'paddlex': rightPaddle.x,
          'gameGroup': gameG
        }))// Prevent moving out of bounds
      }
      if (p5.keyIsDown(p5.DOWN_ARROW)) {
        rightPaddle.y = Math.min(p5.height - rightPaddle.height, rightPaddle.y + rightPaddle.speed);
        sendMessage(JSON.stringify({
          'type' : 'paddleMove',
          'direction': 'down',
          'playerNumber': playerNumber,
          'playerName': playerName,
          'paddley': rightPaddle.y,
          'paddlex': rightPaddle.x,
          'gameGroup': gameG
        }))
      }
    };
    
    const draw = (p5) => {
      const centerX = p5.width / 2; // Center of the canvas
      const dashHeight = 2;        // Height of each dash
      const gapHeight = 5;
      const heightT = p5.height;        // Gap between dashes
      
      p5.background('#000000');
      p5.stroke(255);               // Set line color to white
      p5.strokeWeight(2);           // Set line thickness
      // Loop to draw dashes
      p5.line(centerX, 0, centerX, heightT); // Draw each dash
      // Set up text properties
      p5.fill(255); // White color for the text
      p5.noStroke(); // No border around the text
      p5.textSize(p5.width * 0.1); // Text size relative to canvas width
      p5.textAlign(p5.CENTER, p5.CENTER); // Center align text
      handlePaddleMovement(p5);
      leftPaddle.show(p5,p5.width * 0.97, yL, paddleWidth, paddleHeight, bord);
      rightPaddle.show(p5,p5.width * 0.01, yR, paddleWidth, paddleHeight, bord);
      
      ball.move(p5, leftPaddle, rightPaddle);
      // console.log(ball)
      p5.text(leftPaddle.score, p5.width * 0.25, p5.height * 0.2); // Left score at 25% width
          p5.text(rightPaddle.score, p5.width * 0.75, p5.height * 0.2); // Right score at 75% width
          ball.show(p5);
        };
        
        const windowResized = (p5) => {
          // Adjust the canvas size dynamically on window resize
      const canvasWidth = canvasW; // 80% of window width
      const canvasHeight = canvasH; // 60% of window height
      leftPaddle.x = canvasWidth * 0.01; 
      paddleWidth = canvasWidth * 0.01;
      rightPaddle.x = canvasWidth * 0.99 - paddleWidth;
      leftPaddle.width = canvasWidth * 0.01;
      rightPaddle.width = canvasWidth * 0.01;
      ball.radius = canvasWidth * 0.02;;
      ball.x = canvasWidth * 0.5;
      ball.y = canvasHeight * 0.5;
      
      p5.resizeCanvas(canvasWidth, canvasHeight);
      // return () => {
      //   if (close) {
      //     close();
      //     console.log('WebSocket connection cleaned up');
      //   }
      // };
    };
    return <Sketch setup={setup}  windowResized={windowResized} draw={draw} />;
    
  };
  return (
    <div className="relative">
      <Back />
      {/* <h1 style={{ textAlign: 'center', color: '#fff', margin: '20px 0' }}>My Game</h1> */}
      <Canvas />
    </div>
  );
}

export default App;
