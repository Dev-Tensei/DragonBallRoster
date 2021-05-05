# DragonBall Roster

This is a web app that allows users to display their favorite characters from the Dragon Ball universe in a roster format.

The client is built with HTML, CSS, and Javascript. The backend is built with Python and has a CRUD structure so users can create, retrieve, update, and delete their Dragon Ball roster as needed.

A login/registration functionality has also been implemented. It is done through a SessionStore class(in session_store.py) that creates/retrieves a user session and generates a session ID for every user.


![DragonBall Roster Show Case](https://github.com/Dev-Tensei/DragonBallRoster/blob/main/client/images/app_showcase.png?raw=true)

## Resource

**Character**

Attributes:

* name (string)
* power (string)
* technique (string)
* speed (string)
* difficulty (string)
* rating (integer)

## Schema

```sql
CREATE TABLE characters (
id INTEGER PRIMARY KEY,
name TEXT,
power TEXT,
technique TEXT,
speed TEXT,
difficulty TEXT,
rating INTEGER);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve character collection | GET    | /characters
Retrieve character member     | GET    | /characters/*\<id\>*
Create character member       | POST   | /characters
Update character member       | PUT    | /characters/*\<id\>*
Delete character member       | DELETE | /characters/*\<id\>*

## Resource

**Users**

Attributes:

* fname (string)
* lname (string)
* email (string)
* enc_password (string)

## Schema

```sql
CREATE TABLE users (
id INTEGER PRIMARY KEY,
fname TEXT,
lname TEXT,
email TEXT,
enc_password TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Create user                    | POST   | /users
Create user session            | POST   | /session

