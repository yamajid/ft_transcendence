/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.jsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: yamajid <yamajid@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/11/19 12:41:28 by momihamm          #+#    #+#             */
/*   Updated: 2024/12/09 22:42:53 by yamajid          ###   ########.fr       */
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
let y = 0

function App() {
  const [gameUrl] = useState('ws://127.0.0.1:8000/ws/ping_pong');
  const { sendMessage, lastMessage, readyState } = useWebSocket(gameUrl);
  const leftPaddle = useRef('')
  const rightPaddle = useRef('')
  const [playN, setPlayerN] = useState('')
  const [gameG, setGame] = useState('')
  
  useEffect(() => {
        if (readyState === WebSocket.OPEN){
          if (lastMessage != null){
            const data = JSON.parse(lastMessage.data);
            console.log(data)
            if (data['type'] === 'connection')
              setPlayerN(data['information']['player_number'])
            if (data['type'] === 'game_started')
              leftPaddle.current.width = data['paddlesW']    
              leftPaddle.current.height = data['paddlesH']    
              leftPaddle.current.x = data['paddlesX']    
              y = data['paddlesY']    
              leftPaddle.current.speed = data['paddlesS']    
              leftPaddle.current.bord = data['paddlesB']    
              leftPaddle.current.score = data['paddlesSC']
              setGame(data['game_group'])
            }
          }
        }, [lastMessage])
  const Canvas = () => {
    let ball;
    let paddleWidth = 0;//= p5.width * 0.02; // 2% of canvas width
    let paddleHeight = 0;// = p5.height * 0.2; // 20% of canvas height
    let ballRadius = 0;// p5.width * 0.02; // 2% of canvas width
    let initAngle = 0;
    // let constBallSpeed = ballSpeed;
    
    const setup = (p5, canvasParentRef) => {
      const canvasWidth = p5.windowWidth * 0.6; // 80% of window width
      const canvasHeight = p5.windowHeight * 0.5; // 80% of window height
      const canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
      let initScore = 0;
      let ballSpeed = 10 ;
      paddleWidth = canvasWidth * 0.01; // 2% of canvas width
      paddleHeight = canvasHeight * 0.2; // 20% of canvas height
      ballRadius = canvasWidth * 0.02; // 2% of canvas width
  
      // Position the canvas
      canvas.style('position', 'absolute'); // Use absolute positioning
      canvas.style('top', '2%');          // Move 20% down
      canvas.style('left', '10%');         // Move 10% to the right
      canvas.style('border-radius', '15px');
      canvas.style('border', '2px dashed white');
      leftPaddle.current = new Paddle(p5.width * 0.01 , p5.height * 0.4, paddleWidth, paddleHeight, 10, 10, initScore);
      rightPaddle.current = new Paddle(p5.width * 0.99 - paddleWidth, p5.height * 0.4, paddleWidth, paddleHeight, 10, 10, initScore);
      ball = new Ball(canvasWidth * 0.5, canvasHeight * 0.5, ballRadius, ballSpeed, 0, initAngle, canvasWidth, ballSpeed);
      p5.frameRate(60);
    };
    
    const handlePaddleMovement = (p5) => {
      // console.log("whach dkhel be3da");
      // Move left paddle with W (up) and S (down)
      if (p5.keyIsDown(87) ) { // 'W' key
        console.log(playN)
        console.log(gameG)
        leftPaddle.current.y = Math.max(0, leftPaddle.current.y - leftPaddle.current.speed); // Prevent moving out of bounds
      }
      if (p5.keyIsDown(83)) { // 'S' key
        leftPaddle.current.y = Math.min(p5.height - leftPaddle.current.height, leftPaddle.current.y + leftPaddle.current.speed);
      }
      
      // Move right paddle with UP and DOWN arrow keys
      if (p5.keyIsDown(p5.UP_ARROW)) {
        rightPaddle.current.y = Math.max(0, rightPaddle.current.y - rightPaddle.current.speed); // Prevent moving out of bounds
      }
      if (p5.keyIsDown(p5.DOWN_ARROW)) {
        rightPaddle.current.y = Math.min(p5.height - rightPaddle.current.height, rightPaddle.current.y + rightPaddle.current.speed);
      }
    };
    
    const draw = (p5) => {
      const centerX = p5.width / 2; // Center of the canvas
      const dashHeight = 2;        // Height of each dash
      const gapHeight = 5;         // Gap between dashes
      
      p5.background('#000000');
      p5.stroke(255);               // Set line color to white
      p5.strokeWeight(2);           // Set line thickness
      // Loop to draw dashes
      for (let y = 0; y < p5.height; y += dashHeight + gapHeight) {
        p5.line(centerX, y, centerX, y + dashHeight); // Draw each dash
      }
      // Set up text properties
      p5.fill(255); // White color for the text
      p5.noStroke(); // No border around the text
      p5.textSize(p5.width * 0.1); // Text size relative to canvas width
      p5.textAlign(p5.CENTER, p5.CENTER); // Center align text
      handlePaddleMovement(p5);
      leftPaddle.current.show(p5);
      rightPaddle.current.show(p5, leftPaddle.current.x, y, leftPaddle.current.width, leftPaddle.current.height, leftPaddle.current.bord);
      
      ball.move(p5, leftPaddle.current, rightPaddle.current);
      // console.log(ball)
      p5.text(leftPaddle.current.score, p5.width * 0.25, p5.height * 0.2); // Left score at 25% width
          p5.text(rightPaddle.current.score, p5.width * 0.75, p5.height * 0.2); // Right score at 75% width
          ball.show(p5, );
        };
        
        const windowResized = (p5) => {
          // Adjust the canvas size dynamically on window resize
      const canvasWidth = p5.windowWidth * 0.6; // 80% of window width
      const canvasHeight = p5.windowHeight * 0.5; // 60% of window height
      leftPaddle.current.x = canvasWidth * 0.01; 
      paddleWidth = canvasWidth * 0.01;
      rightPaddle.current.x = canvasWidth * 0.99 - paddleWidth;
      leftPaddle.current.width = canvasWidth * 0.01;
      rightPaddle.current.width = canvasWidth * 0.01;
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
