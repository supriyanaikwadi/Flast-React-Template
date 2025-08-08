# Flask Backend

## 📌 Overview
This is a **Flask backend API** for managing tasks and their comments.  
It uses **SQLite** as the database and supports **CRUD** operations for comments linked to specific tasks.

The backend is designed to work with a frontend (e.g., React) that consumes its REST API.

## 🚀 Features
- **SQLite database** with SQLAlchemy ORM
- **Task model** (stores task titles)
- **Comment model** (stores comments linked to tasks)
- **CRUD APIs** for comments:
  - Create a comment for a task
  - Edit an existing comment
  - Delete a comment
  - Fetch all comments for a task
- **CORS enabled** for frontend-backend communication

## 📂 Project Structure
```
backend/
│── app.py               # Main Flask application
│── database.db          # SQLite database file (auto-created)
│── requirements.txt     # Python dependencies
```

## ⚙️ Installation

### 1️⃣ Clone or download the repository
```bash
git clone https://github.com/your-username/flask-react-template.git
cd flask-react-template/backend
```

### 2️⃣ Create a virtual environment
```bash
python -m venv venv
```

Activate the virtual environment:

- **Windows (CMD)**:
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux**:
  ```bash
  source venv/bin/activate
  ```

### 3️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

## ▶️ Running the Backend
```bash
python app.py
```

Backend will run at:
```
http://127.0.0.1:5000
```

## 📡 API Endpoints

### 1. Create a Comment
**POST** `/tasks/<task_id>/comments`  
**Body (JSON)**:
```json
{
  "content": "This is a new comment"
}
```
**Response**:
```json
{
  "id": 1,
  "content": "This is a new comment"
}
```

### 2. Edit a Comment
**PUT** `/comments/<comment_id>`  
**Body (JSON)**:
```json
{
  "content": "Updated comment"
}
```
**Response**:
```json
{
  "id": 1,
  "content": "Updated comment"
}
```

### 3. Delete a Comment
**DELETE** `/comments/<comment_id>`  
**Response**:
```
204 No Content
```

### 4. Get All Comments for a Task
**GET** `/tasks/<task_id>/comments`  
**Response**:
```json
[
  { "id": 1, "content": "First comment" },
  { "id": 2, "content": "Second comment" }
]
```

## 🛠 Notes
- The database is created automatically on first run.
- A default task (`First Task`) is inserted if it doesn’t exist.
- Make sure backend port (`5000`) matches the frontend API calls.
