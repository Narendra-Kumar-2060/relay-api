# Relay Chat

A full-stack real-time chat application built with **FastAPI**, **PostgreSQL**, and a vanilla **HTML/CSS/JS** frontend. Features user authentication, persistent messaging, and full CRUD operations via a RESTful API.

🔗 **Live Demo:** [relay-api-zizt.onrender.com/frontend/login.html](https://relay-api-zizt.onrender.com/frontend/login.html)

## Features

### Backend (FastAPI)

- User registration and login with **SHA-256 password hashing**
- Full CRUD operations on messages (Create, Read, Update, Delete)
- RESTful API design with clean JSON responses
- **PostgreSQL** database for persistent storage
- CORS middleware for frontend integration
- Input validation with **Pydantic** models
- Auto-generated interactive API docs at `/docs`

### Frontend (HTML/CSS/JS)

- Login and registration pages with client-side validation
- Real-time message display with per-user chat bubbles
- Edit and delete your own messages
- Session storage authentication
- Auto-scroll to latest messages
- Enter key to send messages
- XSS protection via HTML escaping
- Responsive design (desktop & mobile)
- Modern gradient UI with smooth animations

## API Reference

| Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| POST   | `/register`                  | Register a new user     |
| POST   | `/login`                     | Login and get username  |
| GET    | `/messages`                  | Get all messages        |
| POST   | `/messages`                  | Send a new message      |
| GET    | `/messages/latest`           | Get the latest message  |
| GET    | `/messages/{id}`             | Get a single message    |
| PUT    | `/messages/{id}`             | Edit a message          |
| DELETE | `/messages/{id}`             | Delete a message        |
| GET    | `/users/{username}/messages` | Get a user's messages   |
| GET    | `/search/?text=`             | Search messages by text |

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL (or use SQLite for local development)
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Narendra-Kumar-2060/relay.git
cd relay
```

## Quick Start

### Prerequisites

- Python 3.8+
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Narendra-Kumar-2060/relay.git
cd relay
```

2. **Install dependencies**

```bash
pip install fastapi uvicorn psycopg2-binary
```

3. **Set up environment variables**

Create a .env file or set DATABASE_URL:

```bash
export DATABASE_URL=postgresql://user:password@localhost/relay_db
```

4. **Start the backend server**

```bash
uvicorn main:app --reload
```

5. **Open the frontend**

Open frontend/login.html in your browser, or serve it with Live Server in VS Code.

6. **Register an account and start chatting!**

## Project Structure

```text
relay/
├── main.py           # FastAPI app and route handlers
├── database.py       # PostgreSQL operations and password hashing
├── frontend/
│   ├── index.html    # Main chat UI
│   ├── login.html    # Login page
│   ├── register.html # Registration page
│   ├── script.js     # Chat logic and message rendering
│   ├── auth.js       # Login and registration handlers
│   └── style.css     # Styling and animations
└── README.md
```

## How It Works

1. **Register / Login** — User creates an account; password is hashed with SHA-256 before storage.
2. **Send Message** — Frontend sends a POST /messages request; backend saves to PostgreSQL and returns the new message.
3. **Load Messages** — On page load, frontend fetches GET /messages; all messages render with timestamps and avatars.
4. **Edit / Delete** — Own messages show Edit and Delete buttons that call PUT and DELETE endpoints.
5. **Persist — Messages** survive browser refresh (stored in PostgreSQL).

## Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Backend    | FastAPI (Python)         |
| Database   | PostgreSQL               |
| Auth       | SHA-256 password hashing |
| Frontend   | HTML5, CSS3, JavaScript  |
| Fonts      | Google Fonts (Poppins)   |
| Deployment | Render                   |

## Security

- Passwords hashed with SHA-256 before storage (never stored in plain text)
- XSS protection via HTML escaping on all user-generated content
- SQL injection prevention using parameterized queries
- Input validation on both frontend and backend via Pydantic

## Planned Improvements

- JWT-based authentication (replace URL param session)
- WebSocket support for true real-time messaging
- Typing indicators and read receipts
- File and image sharing
- Message reactions
- Cloud deployment (Railway / Render)

## What I Learned

- REST API design and implementation with FastAPI
- Password hashing and basic authentication flows
- PostgreSQL database operations with parameterized queries
- Frontend-backend integration using the Fetch API
- DOM manipulation and dynamic UI rendering
- Security best practices: XSS prevention, SQL injection, password hashing
- Responsive CSS design with gradients and animations
- Deployment on Render with environment variables

## License

MIT License — free to use for learning and experimentation.
