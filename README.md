# Ping Pong Web Game

A real-time multiplayer Ping Pong game built using **Django**, **React.js**, and **WebSockets**. This project features user authentication via **OAuth**, live chat functionality, and a responsive user interface.

---

## Table of Contents
- [Project Structure](ft_transcendence/
├── backend/                  # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   └── transcendence/        # Django app
│       ├── settings.py
│       ├── urls.py
│       ├── views.py
│       └── consumers.py      # WebSocket handlers
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Dockerfile for backend
├── .env                      # Environment variables
└── README.md)
- [Contributing](github.com/lmakina,github.com/kvras)

---

## Features
- **Real-Time Multiplayer Gameplay**: Play Ping Pong with other users in real-time using WebSockets.
- **User Authentication**: Secure login and registration using **OAuth** (e.g., Google, GitHub) and traditional authentication.
- **Live Chat**: Communicate with other players using the built-in live chat feature.
- **User Profiles**: Manage user profiles, including profile creation, updates, and deletion.
- **Responsive Design**: A modern and responsive user interface built with **React.js**.

---

## Technologies Used
- **Backend**:
  - Django
  - Django Rest Framework (DRF)
  - Django Channels (WebSockets)
  - OAuth for authentication
- **Frontend**:
  - React.js
  - JavaScript
  - HTML/CSS
- **DevOps**:
  - Docker
  - Docker Compose
  - NGINX (for reverse proxying)
- **Database**:
  - PostgreSQL

---

## Setup and Installation

### Prerequisites
- Docker and Docker Compose installed on your machine.
- Python 3.8+ installed (if running locally without Docker).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yamajid/ft_transcendence.git
   cd ft_transcendence
   
