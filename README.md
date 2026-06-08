# Relay Chat - Full Stack Messaging App

A real-time chat application built with FastAPI backend, SQLite database, and modern frontend. Perfect for learning full-stack development!

## Features

### Backend (FastAPI)

- Full CRUD operations (Create, Read, Update, Delete)
- RESTful API design
- SQLite database for persistent storage
- CORS enabled for frontend integration
- Input validation with Pydantic
- Auto-generated API docs at `/docs`

### Frontend (HTML/CSS/JS)

- Real-time message display
- Responsive design (works on mobile & desktop)
- Modern gradient UI with smooth animations
- Enter key to send messages
- Auto-scroll to latest messages
- XSS protection with HTML escaping
- Clean timestamp formatting

### API Endpoints

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/messages`                  | Get all messages    |
| POST   | `/messages`                  | Create new message  |
| GET    | `/messages/{id}`             | Get single message  |
| PUT    | `/messages/{id}`             | Update message      |
| DELETE | `/messages/{id}`             | Delete message      |
| GET    | `/users/{username}/messages` | Get user's messages |
| GET    | `/search/?text=`             | Search messages     |

## Quick Start

### Prerequisites

- Python 3.8+
- Modern web browser

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/relay-chat.git
cd relay-chat
```

2. **Install dependencies**

```bash
pip install fastapi uvicorn
```

3. **Start the backend server**

```bash
uvicorn main:app --reload
```

4. **Open the frontend**

- Open index.html in your browser

- Or use Live Server in VS Code

5. **Start chatting!**

## Project Structure

```text
relay-chat/
├── index.html    # Frontend UI
├── style.css     # Modern styling
├── script.js     # Client-side logic
├── main.py       # FastAPI backend
├── database.py   # SQLite operations
├── response.json # Sample data
└── README.md     # Documentation
```

## How It Works

1. Send Message: User types message → Frontend sends POST request → Backend saves to SQLite

2. Load Messages: Page loads → Frontend fetches GET request → Backend returns all messages

3. Display: Messages appear with timestamps and user avatars

4. Persist: Messages survive browser refresh (stored in database)

## Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Backend  | FastAPI (Python)                 |
| Database | SQLite                           |
| Frontend | HTML5, CSS3, JavaScript          |
| Styling  | CSS3 with Gradients & Animations |
| API      | Protocol REST                    |

## Responsive Design

- Desktop: 60vw chat window with gradient background

- Mobile: Full-width chat window (95vw) with optimized inputs

- Smooth animations: Fade-in effects for new messages

## Security Features

- XSS protection via HTML escaping

- Input validation on both frontend and backend

- SQL injection prevention (parameterized queries)

- CORS properly configured

## Future Enhancements

- User authentication (login/register)

- Message edit/delete buttons

- Real-time WebSocket connections

- File/image sharing

- Message reactions

- Typing indicators

- Read receipts

- Deploy to cloud (Railway/Render)

## Contributing

This is a learning project! Feel free to:

- Fork and experiment

- Add new features

- Report bugs

- Suggest improvements

## What I Learned

Building this project taught me:

- REST API design with FastAPI

- Database operations with SQLite

- Frontend-backend integration

- Async JavaScript with fetch API

- DOM manipulation and event handling

- Security best practices (XSS, SQL injection)

- Responsive CSS design

## Acknowledgments

- FastAPI documentation

- SQLite tutorials

- Font Awesome (inspiration for icons)

- Google Fonts (Poppins font)

## License

MIT License - Feel free to use for learning

## Current Status

- SQLite database for persistent storage
- All CRUD operations working
- Production-ready for learning
