<div align="center">
    <h1>ETAILY</h1>
    <h1>Software Engineer Exam</h1>
    <p align="center">
        <p>Jonathan Esparas | December 2023 </p>
    </p>
</div>

<hr>

# Getting started

```
🚀 Prerequisite: Node >= 16.*

This application has 2 servers
    1. Signin and JWT Validation
    2. User Management
```

## Technical Specification
1. Tools
   1. ***Git*** - Version Control
   2. ***Github*** - Code Repository
   3. ***VSCode*** - Text Editor
   4. ***Postman*** - API Testing
2. Backend
   1. ***ExpressJS*** - Node
   2. ***JWT*** - Authentication
3. Database
   1. ***JSON FILE***

#### Step 1: Clone the repository
   - Open the Powershell (or Terminal) and paste the following command/s
```bash
git clone https://github.com/natesparas/etaily.git
```

```bash
cd etaily
```


#### Step 2: Run the 1st server
```bash
cd crud-server
npm i
cd npm start
```

#### Step 3: Run the 2nd server
```bash
cd jwt-server
npm i
cd npm start
```

<hr>


# API Specification
To test the REST API, you may use **Postman** or any tool that you prefer. ⭐️

## Login ⭐️
:exclamation::exclamation: **BASE URL :** `http://localhost:3000/api`
#### Request
| Endpoint | Method | Body/Parameter |
| :--- | :--- | :--- |
| `/login` | `POST` | ```{ "username": "cardo","password": "cardo" }``` |

#### Response

 ```
 {
    "user": {
        "username": "cardo",
        "firstName": "Cardo123",
        "lastName": "Dalisay",
        "dateAdded": "2023-12-20T10:31:28.224Z",
        "id": 4
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjYXJkbyIsImlhdCI6MTcwMzA3MjU0NywiZXhwIjoxNzAzMDc2MTQ3fQ.PuPFfapTRYM5K986BfEdjlyJHqILD4o0ojq50yHmJeo"
}
```



## User Management ⭐️
:exclamation::exclamation: **BASE URL :** `http://localhost:3001/api/user`

```
🚀 Prerequisite: You need to login to have a token and use it in your request header
```

#### Request
| Endpoint | Method | Header | Body/Parameter |
| :--- | :--- | :--- | :--- |
| `/create` | `POST` | `Bearer <paste_your_token>` | `{"username":"cardo","firstName":"Cardo","lastName":"Dalisay","password":"cardo"}` |
| `/list` | `GET` | `Bearer <paste_your_token>` |  |
| `/update/:id` | `PUT` | `Bearer <paste_your_token>` | `1` <br> `{"firstName":"John"}` |
| `/delete/:id` | `DELETE` | `Bearer <paste_your_token>` | ```1``` |


<hr>


