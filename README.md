# 🏓 Ping Pong Web Game

## Overview
A real-time multiplayer Ping Pong game that combines modern web technologies to deliver an engaging gaming experience. Built with Django and React.js, featuring WebSocket communication for real-time gameplay and chat functionality.

## 🌟 Key Features

### 🎮 Game Features
- **Real-Time Multiplayer**: Live gameplay using WebSocket technology
- **Match History**: Track your games and performance
- **Live Chat System**: Communicate with other players in real-time
- **Leaderboards**: Compete for top rankings

### 👤 User Features
- **OAuth Authentication**: Secure login via Intra 42
- **User Profiles**: Customizable player profiles
- **Friend System**: Add and challenge friends
- **Achievement System**: Earn badges and track progress

## 🛠 Technology Stack

### Backend Infrastructure
- **Framework**: Django & Django Rest Framework
- **Real-Time**: Django Channels (WebSockets)
- **Authentication**: OAuth integration
- **Database**: PostgreSQL

### Frontend Development
- **Framework**: React.js
- **Styling**: Modern CSS with responsive design
- **State Management**: React Context/Redux
- **Real-Time Updates**: WebSocket integration

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Web Server**: NGINX (Reverse Proxy)
- **CI/CD**: Automated deployment pipeline

## 🚀 Getting Started

### Prerequisites
```bash
# Required installations
- Docker & Docker Compose
- Node.js (v14+)
- Python (3.8+)
```

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/yamajid/ft_transcendence.git

# Navigate to project directory
cd ft_transcendence

# Start the application using Docker Compose
docker-compose up --build
```

### Development Setup
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

## 🎯 Usage

1. **Access the Application**:
   - Navigate to `http://localhost:3000` in your browser
   - Login using Intra 42 OAuth or create a new account

2. **Start Playing**:
   - Challenge other players
   - Join the global chat
   - Track your statistics

3. **Profile Management**:
   - Update your profile
   - View match history
   - Check achievements



## 👥 Contributors
- @yamajid
- @lmakina
- @kvras


## ⏰ Last Updated
- Maintainer: @yamajid
