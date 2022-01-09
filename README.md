# Rest-API

- [UserRoute](#UserRoute)

- [PasswordRoute](#PasswordRoute)

## Technologies

- typescript `^4.5.4`
- express `^4.17.1`
- express-validation `^6.14.0`
- mongoose `^6.1.2`
- bcryptjs `^2.4.3`
- jsonwebtoken `^8.5.1`
- crypto-js `^4.1.1`

## Routes

User validation. Middleware validation. Password is hashed to database and never returned to client.

### UserRoute

- #### Request

##### Signup route

```
{
    "name": <string>
    "email": <string, min 5 chars>
    "password": <string>
}
```

##### Signin route

```
{
    "email": <string>,
    "password": <string>
}

```

- #### Response

```
{
    "errors": [],
    "data": {
        "token": <string jsonwebtoken>,
        "user": {
            "id": <string>,
            "name": <string>,
            "email": <string>
        }
    }
}

```

### PasswordRoute

Every password has linked user id. Passwords are crypted to database.

All routes returns all passwords for user.

- #### Request

##### Get all passwords for user route

```
{
    "_id": <string userID>
}
```

##### Create password route

```
{
"_id": <string userID>,
"title": <string>,
"password": {
"length": <number max 15>,
"hasNumbers": <boolea>,
"hasSymbols": <boolean>

    },
    "tag": <string>

}
```

##### Delete password route

```
{
"_id": <string passwordID>,
"userID" : <string userID>
}

```

- #### Response

```

{
"errors": [],
"data": {
"passwords": [
        {
        "_id": <string>,
        "userID": <string>,
        "title": <string>,
        "password": <string>,
        "tag": <string>,
        "createdAt": <string Date>,
        },
        ]
    }
}

```
