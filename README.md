# My Dragonball Project

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
CREATE TABLE restaurants (
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
Retrieve restaurant collection | GET    | /characters
Retrieve restaurant member     | GET    | /characters/*\<id\>*
Create restaurant member       | POST   | /characters
Update restaurant member       | PUT    | /characters/*\<id\>*
Delete restaurant member       | DELETE | /characters/*\<id\>*

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

# f19-authentication-Dev-Tensei
