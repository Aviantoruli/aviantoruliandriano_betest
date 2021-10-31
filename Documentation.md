# ms_aviantoruliandriano_betest
Microservice for take home test

This app has :
* RESTFUL endpoint
* JSON formatted response
## List RESTful Endpoints
- `GET/token`
- `GET/users`
- `GET/user`
- `POST/create`
- `DELETE/delete`
- `PATCH/update`

## RESTful Endpoint
## Get/users
> get all users

_Response (200)_
```
[
    {
        "_id": ("123123b1k2g31"),
        "userName": "avianto",
        "emailAddress": "avianto@mail.com",
        "identifyNumber": 1234567,
        "accountNumber": 9001234567,
    },
    ...
]
```

## GET/user
> get user by identifyNumber / accountNumber

_Request Body_
```
{
    "identifyNumber": Req.body.identifyNumber",
    "accountNumber": Req.body.accountNumber,
}

```
_Response (200)_
```
[
    {
        "_id": ("123123b1k2g31"),
        "userName": "avianto",
        "emailAddress": "avianto@mail.com",
        "identifyNumber": 1234567,
        "accountNumber": 9001234567,
    },
    ...
]
```
## POST/create
> add user

_Request Body_
```
{
    "userName": Req.body.userName",
    "emailAddress": Req.body.emailAddress,
    "idenfityNumber": Req.body.idenfityNumber,
}

```


_Response (201)_
```
    {
        msg: 'account berhasil di buat'
    }
```
_Response (400)_
```
    {
        msg: 'username is required'
    }
```
OR
```
    {
        msg: 'email address is required'
    }
```
OR
```
    {
        msg: 'identify number is required'
    }
```
OR
```
    {
        msg: 'email already used'
    }
```
## PATCH/update
> Edit user accoding its identifyNumber/accountNumber

_Headers_
```
{
    access_token:
}

```
_Response (200)_
```
    {
        msg:"update complete"
    }
```
## DELETE/delete
> delete user accoding its identifyNumber/accountNumber

_Headers_
```
{
    access_token:
}

```
_Response (200)_
```
    {
        msg:"account has been deleted"
    }
```


