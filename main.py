from fastapi import FastAPI
from pydantic import BaseModel



    
app = FastAPI()

messages_db = []

class Message(BaseModel):
    id: int
    user: str
    message: str
    


@app.post("/messages")
def send(message: Message):
    message_dict = message.dict()
    messages_db.append(message_dict)    
    return {"status": "success", "data": message_dict} 


@app.get("/messages")
def get_messages():
    return {"messages": messages_db}
    
@app.delete("/delete/{message_id}")
def delete_message(message_id: int):
    id_found = False
    for message in messages_db:
        if message["id"] == message_id:
            id_found = True
            messages_db.remove(message) 
            break
    if id_found:
        return {"status": "success"}
    else:
        return {"status": "fail"}
   
   
@app.put("/update-message")
def update_message(message: Message):
    id_found = False
    message_dict = message.dict()
    for old_message in messages_db:
        if old_message["id"] == message_dict["id"]:
            old_message["message"] = message_dict["message"]            
            id_found = True
            break
    if id_found:
        return {"status": "success"}
    else:
        return {"status": "fail"}
    