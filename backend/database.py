import sqlite3

conn = sqlite3.connect('subscriptions.db', check_same_thread=False)
cursor = conn.cursor()

def create_subscription(email):
    cursor.execute(f'INSERT INTO subscriptions (email) VALUES("{email}")')
    conn.commit()

def get_all_emails():
    cursor.execute('SELECT email FROM subscriptions')
    emails = [row[0] for row in cursor.fetchall()]
    return emails

def create_database():
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS subscriptions (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL
        )
    ''')
    conn.commit()

# Створити таблицю при запуску
create_database()
