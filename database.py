import sqlite3
from datetime import datetime

con = sqlite3.connect("relay.db", check_same_thread=False)
cur = con.cursor()


def create_table():
    cur.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        message TEXT,
        created_at TEXT
    )
    """)
    con.commit()


create_table()


def get_all_data():
    cur.execute("SELECT * FROM messages")
    return cur.fetchall()


def delete_message_by_id(message_id):
    cur.execute("DELETE FROM messages WHERE id = ?", (message_id,))
    con.commit()
    return cur.rowcount > 0


def update_message_by_id(message_id, new_message):
    cur.execute(
        "UPDATE messages SET message = ? WHERE id = ?", (new_message, message_id)
    )
    con.commit()
    return cur.rowcount > 0


def insert_message(user, message):
    created_at = datetime.now().isoformat()
    cur.execute(
        "INSERT INTO messages (user, message, created_at) VALUES (?, ?, ?)",
        (user, message, created_at),
    )
    con.commit()


def get_message_by_id(message_id: int):
    cur.execute("SELECT * FROM messages WHERE id = ?", (message_id,))
    return cur.fetchone()


def find_messages_by_user(username):
    cur.execute("SELECT * FROM messages WHERE user = ?", (username,))
    return cur.fetchall()


def search_message(message):
    cur.execute("SELECT * FROM messages WHERE message LIKE ?", ("%" + message + "%",))
    return cur.fetchall()


def get_latest_message():
    cur.execute("SELECT * FROM messages ORDER BY created_at DESC LIMIT 1")
    return cur.fetchone()
