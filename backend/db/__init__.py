import sqlite3


conn = sqlite3.connect("playlists.db")
c = conn.cursor()

c.execute(
    """
          CREATE TABLE IF NOT EXISTS playlists
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          token TEXT UNIQUE NOT NULL,
          videoId TEXT UNIQUE NOT NULL,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
          """
)

conn.commit()
conn.close()


def execute_query(query):
    conn = sqlite3.connect("playlists.db")
    c = conn.cursor()
    c.execute(query)
    conn.commit()
    conn.close()


def fetch_data(query, fetch_one=False):
    conn = sqlite3.connect("playlists.db")
    c = conn.cursor()
    c.execute(query)
    if fetch_one:
        rows = c.fetchone()
    else:
        rows = c.fetchall()
    conn.close()
    return rows


# import sqlite3


# c.execute("SELECT * FROM playlists")

# rows = c.fetchall()

# for row in rows:
#     print(row)


# conn.close()
