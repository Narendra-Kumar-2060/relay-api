# Relay API

A simple backend API project built with FastAPI for learning:

- CRUD operations
- REST APIs
- HTTP methods
- request validation
- backend fundamentals

## Features

- Create messages
- Read messages
- Update messages
- Delete messages
- FastAPI automatic docs
- Pydantic validation

## Tech Stack

- Python
- FastAPI
- Pydantic
- Uvicorn

## Run Locally

1. Start server:

uvicorn main:app --reload

2. Open in browser:

http://127.0.0.1:8000/docs

## Current Status

Currently uses in-memory storage ("messages_db = []").

## Future plans:

- SQLite integration
- persistent storage
- authentication
- better project structure

## Why I Built This

I built this project to learn how backend systems, APIs, HTTP, and networking concepts work together.