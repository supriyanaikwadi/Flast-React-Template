# React Frontend (`my-app`)

## Overview
This is the React frontend for the Flask + SQLite Comments App.  
It provides a UI to view, add, edit, and delete comments for a task, using the backend API (`app.py`).

## Features
- Displays comments for a given task
- Add a new comment
- Edit an existing comment
- Delete a comment
- Uses fetch API to interact with Flask backend
- CORS enabled backend communication

##  Project Structure
```
Task 2/
│── public/
│── src/
│   ├── App.js          # Main React component
│   ├── index.js        # App entry point
│── package.json        # Project config & dependencies
│── README.md           # Project documentation
```

##  Installation

### 1 Navigate to project folder
```bash
cd my-app
```

### 2 Install dependencies
```bash
npm install
```

##  Running the Frontend
```bash
npm start
```

Frontend will run at:
```
http://localhost:5000
```

## Connecting to Backend
The backend (`app.py`) should run on:
```
http://localhost:5000
```
Make sure both frontend and backend are running at the same time.

If needed, update the API URLs in `src/App.js`:
```javascript
const API_BASE = "http://localhost:5000";
```

## API Integration
The React app communicates with these backend endpoints:
- GET `/tasks/1/comments` → Fetch all comments
- POST `/tasks/1/comments` → Add comment
- PUT `/comments/:id` → Edit comment
- DELETE `/comments/:id` → Delete comment

## Notes
- Make sure Node.js and npm are installed ([Download here](https://nodejs.org/)).
- Keep backend (`5000`) also frontend (`5000`) ports in sync with your code.
- For production, update API URLs to your deployment server.
