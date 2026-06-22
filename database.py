import os
import psycopg2
from datetime import datetime
import hashlib

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_connection():
    if not DATABASE_URL:
        raise Exception("DATABASE_URL environment variable is not set")
    return psycopg2.connect(DATABASE_URL)

def create_tables():
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username TEXT,
        message TEXT,
        created_at TEXT
    )
    """)
    
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        created_at TEXT,
        country TEXT,
        name TEXT
    )
    """)
    
    conn.commit()
    conn.close()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def get_user_list():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT username FROM users")
    rows = cur.fetchall()
    conn.close()
    return [row[0] for row in rows]

def add_user(username, password, country, name):
    hashed_password = hash_password(password)
    created_at = datetime.now().isoformat()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (username, password, created_at, country, name) VALUES (%s, %s, %s, %s, %s)",
        (username, hashed_password, created_at, country, name)
    )
    conn.commit()
    conn.close()

def get_user_password(username):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE username = %s", (username,))
    result = cur.fetchone()
    conn.close()
    return result

def get_all_messages():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages ORDER BY created_at ASC")
    rows = cur.fetchall()
    conn.close()
    return rows

def insert_message(username, message):
    created_at = datetime.now().isoformat()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO messages (username, message, created_at) VALUES (%s, %s, %s)",
        (username, message, created_at)
    )
    conn.commit()
    conn.close()

def delete_message_by_id(message_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM messages WHERE id = %s", (message_id,))
    conn.commit()
    affected = cur.rowcount > 0
    conn.close()
    return affected

def update_message_by_id(message_id, new_message):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE messages SET message = %s WHERE id = %s", (new_message, message_id))
    conn.commit()
    affected = cur.rowcount > 0
    conn.close()
    return affected

def get_message_by_id(message_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages WHERE id = %s", (message_id,))
    result = cur.fetchone()
    conn.close()
    return result

def get_latest_message():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages ORDER BY created_at DESC LIMIT 1")
    result = cur.fetchone()
    conn.close()
    return result

def find_messages_by_user(username):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages WHERE username = %s", (username,))
    rows = cur.fetchall()
    conn.close()
    return rows

def search_messages(search_text):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages WHERE message LIKE %s", (f"%{search_text}%",))
    rows = cur.fetchall()
    conn.close()
    return rows

create_tables()