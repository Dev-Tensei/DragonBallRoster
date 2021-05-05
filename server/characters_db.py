import os
import psycopg2
import psycopg2.extras
import urllib.parse

class CharacterDB:
    # def __init__(self):
    #     self.connection = sqlite3.connect("characters_db.db")
    #     self.connection.row_factory = dict_factory
    #     self.cursor = self.connection.cursor()

    def __init__(self):
        urllib.parse.uses_netloc.append("postgres")
        url = urllib.parse.urlparse(os.environ["DATABASE_URL"])

        self.connection = psycopg2.connect(
            cursor_factory=psycopg2.extras.RealDictCursor,
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
        self.cursor = self.connection.cursor()

    def __del__(self):
        self.connection.close()

    def createCharactersTable(self):
        self.cursor.execute("CREATE TABLE IF NOT EXISTS characters (id SERIAL PRIMARY KEY, name VARCHAR(255), power VARCHAR(255), technique VARCHAR(255), speed VARCHAR(255), difficulty VARCHAR(255), rating INTEGER)")
        self.connection.commit()

    def createUsersTable(self):
        self.cursor.execute("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), email VARCHAR(255), enc_password VARCHAR(255))")
        self.connection.commit()

    def insertCharacter(self, name, power, technique, speed, difficulty, rating):
        data = [name, power, technique, speed, difficulty, rating]
        self.cursor.execute("INSERT INTO characters (name, power, technique, speed, difficulty, rating) VALUES (%s, %s, %s, %s, %s, %s)", data)
        self.connection.commit()

    def getCharacters(self):
        self.cursor.execute("SELECT * FROM characters")
        result = self.cursor.fetchall()
        return result

    def getOneCharacter(self, character_id):
        data = [character_id]
        self.cursor.execute("SELECT * FROM characters WHERE id = %s", data)
        result = self.cursor.fetchone()
        return result

    def deleteCharacter(self, character_id):
        data = [character_id]
        self.cursor.execute("DELETE FROM characters WHERE id = %s", data)
        result = self.connection.commit()
        return result

    def updateCharacter(self, c_name, c_power, c_technique, c_speed, c_difficulty, c_rating, c_character_id):
        data = [c_name, c_power, c_technique, c_speed, c_difficulty, c_rating, c_character_id]
        self.cursor.execute("UPDATE characters SET name = %s, power = %s, technique = %s, speed = %s, difficulty = %s, rating = %s WHERE id = %s", data)
        self.connection.commit()


    #User, REGISTERING functions

    def getUsers(self):
        self.cursor.execute("SELECT * FROM users")
        result = self.cursor.fetchall()
        return result

    def insertUser(self, fname, lname, email, passwordHash):
        data = [fname, lname, email, passwordHash]
        self.cursor.execute("INSERT INTO users (fname, lname, email, enc_password) VALUES (%s, %s, %s, %s)", data)
        self.connection.commit()

    def getOneUser(self, user_id):
        data = [user_id]
        self.cursor.execute("SELECT * FROM users WHERE id = %s", data)
        result = self.cursor.fetchone()
        return result

    def deleteUser(self, user_id):
        data = [user_id]
        self.connection.execute("DELETE FROM users WHERE id = %s", data)
        result = self.connection.commit()
        return result

    def authenticate(self, email):
        data = [email]
        self.cursor.execute("SELECT * FROM users WHERE email = %s", data)
        result = self.cursor.fetchone()
        return result
