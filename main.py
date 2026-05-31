from fastapi import FastAPI
from pydantic import BaseModel
from database import (
    get_all_data,
    delete_message_by_id,
    update_message_by_id,
    insert_message,
    get_message_by_id,
    find_messages_by_user,
    search_message,
)

app = FastAPI()


class Message(BaseModel):
    user: str
    message: str


class MessageUpdate(BaseModel):
    message: str


@app.post("/messages")
def send(message: Message):

    insert_message(message.user, message.message)

    return {"status": "success", "data": message.dict()}


@app.get("/messages")
def get_all_messages():
    data = get_all_data()
    messages = []
    for row in data:
        message_dict = {
            "id": row[0],
            "user": row[1],
            "message": row[2],
            "created_at": row[3],
        }
        messages.append(message_dict)
    return {"messages": messages}


@app.get("/messages/{message_id}")
def get_one_message(message_id: int):
    data = get_message_by_id(message_id)
    if not data:
        return {"status": "fail", "message": "Message not found"}
    return {
        "message": {
            "id": data[0],
            "user": data[1],
            "message": data[2],
            "created_at": data[3],
        }
    }


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
        messages.append(
            {"id": row[0], "user": row[1], "message": row[2], "created_at": row[3]}
        )

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
        messages.append(
            {"id": row[0], "user": row[1], "message": row[2], "created_at": row[3]}
        )

    return {"messages": messages}
