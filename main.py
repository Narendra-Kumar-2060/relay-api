from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import (
    delete_message_by_id,
    find_messages_by_user,
    get_all_data,
    get_latest_message,
    get_message_by_id,
    insert_message,
    search_message,
    update_message_by_id,
    get_user_list,
    add_user,
    get_user_password,
    hash_password,
)


class User(BaseModel):
    name: str
    username: str
    password: str
    country: str


class LoginData(BaseModel):
    username: str
    password: str


class Message(BaseModel):
    user: str
    message: str


class MessageUpdate(BaseModel):
    message: str


def row_to_dict(row):
    return {"id": row[0], "user": row[1], "message": row[2], "created_at": row[3]}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Relay Chat API is running. Go to /docs for API documentation."}

@app.post("/register")
def register(user: User):
    if user.username in get_user_list():
        return {"status": "error", "message": "username is already taken"}
    add_user(user.username, user.password, user.country, user.name)
    return {"status": "success", "message": "username is created"}


@app.post("/login")
def login(credentials: LoginData):
    username = credentials.username
    password = credentials.password

    if username not in get_user_list():
        return {"status": "error", "message": "Invalid username or password"}

    stored_password = get_user_password(username)

    if not stored_password:
        return {"status": "error", "message": "Invalid username or password"}

    hashed_input = hash_password(password)

    if stored_password[0] == hashed_input:
        return {"status": "success", "message": "Login successful!", "user": username}
    else:
        return {"status": "error", "message": "Invalid username or password"}


@app.post("/messages")
def send(message: Message):
    insert_message(message.user, message.message)

    latest = get_latest_message()

    if latest:
        return row_to_dict(latest)
    else:
        return {"status": "error", "message": "Failed to create message"}


@app.get("/messages")
def get_all_messages():
    data = get_all_data()
    messages = []
    for row in data:
        message_dict = row_to_dict(row)
        messages.append(message_dict)
    return {"messages": messages}


@app.get("/messages/latest")
def get_recent_text():
    data = get_latest_message()
    if not data:
        return {"status": "fail", "message": "No messages found"}
    return {"message": row_to_dict(data)}


@app.get("/messages/{message_id}")
def get_one_message(message_id: int):
    data = get_message_by_id(message_id)
    if not data:
        return {"status": "fail", "message": "Message not found"}
    return {"message": row_to_dict(data)}


@app.delete("/messages/{message_id}")
def delete_message(message_id: int):
    deleted = delete_message_by_id(message_id)
    if not deleted:
        return {"status": "fail", "message": "Message not found"}
    return {"status": "success", "deleted_id": message_id}


@app.put("/messages/{message_id}")
def update_message(message_id: int, message: MessageUpdate):
    updated = update_message_by_id(message_id, message.message)
    if not updated:
        return {"status": "fail", "message": "Message not found"}
    return {
        "status": "success",
        "updated_id": message_id,
        "new_message": message.message,
    }


@app.get("/users/{username}/messages")
def get_only_user_message(username: str):
    data = find_messages_by_user(username)
    if not data:
        return {"status": "fail", "message": "user not found"}
    messages = []
    for row in data:
        messages.append(row_to_dict(row))

    return {"messages": messages}


@app.get("/search/")
def search_messages(text: str | None = None):
    if not text:
        return {"status": "fail", "message": "no search query"}

    data = search_message(text)

    if not data:
        return {"status": "fail", "message": "No messages found"}

    messages = []
    for row in data:
        messages.append(row_to_dict(row))

    return {"messages": messages}
