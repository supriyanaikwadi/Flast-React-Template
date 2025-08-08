
import React, { useState, useEffect } from "react";

const TASK_ID = 1; // or make this selectable

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState(null);

  const api = "http://localhost:5000";

  // Fetch comments for the task
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${api}/tasks/${TASK_ID}/comments`);
      if (!res.ok) throw new Error(`Failed to fetch comments: ${res.statusText}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Load comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  // Add a new comment
  const addComment = async () => {
    if (!newComment.trim()) return;
    setError(null);
    try {
      const res = await fetch(`${api}/tasks/${TASK_ID}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      if (!res.ok) throw new Error(`Failed to add comment: ${res.statusText}`);
      setNewComment("");
      fetchComments();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a comment by ID
  const deleteComment = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${api}/comments/${id}`, { method: "DELETE" });
      if (res.status !== 204 && !res.ok) {
        throw new Error(`Failed to delete comment: ${res.statusText}`);
      }
      fetchComments();
    } catch (err) {
      setError(err.message);
    }
  };

  // Start editing a comment
  const startEdit = (idx, content) => {
    setEditIdx(idx);
    setEditText(content);
    setError(null);
  };

  // Save edited comment
  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    setError(null);
    try {
      const res = await fetch(`${api}/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editText.trim() }),
      });
      if (!res.ok) throw new Error(`Failed to update comment: ${res.statusText}`);
      setEditIdx(null);
      setEditText("");
      fetchComments();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Comments for Task #{TASK_ID}</h2>

      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {comments.map((c, idx) => (
              <li key={c.id} style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
                {editIdx === idx ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ flex: 1, marginRight: 8 }}
                    />
                    <button
                      onClick={() => saveEdit(c.id)}
                      disabled={!editText.trim()}
                      style={{ marginRight: 4 }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditIdx(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1 }}>{c.content}</span>
                    <button onClick={() => startEdit(idx, c.content)} style={{ marginRight: 4 }}>
                      Edit
                    </button>
                    <button onClick={() => deleteComment(c.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
            {comments.length === 0 && <li>No comments yet.</li>}
          </ul>

          <div style={{ marginTop: 24, display: "flex" }}>
            <input
              value={newComment}
              placeholder="Add a comment..."
              onChange={(e) => setNewComment(e.target.value)}
              style={{ flex: 1, marginRight: 8 }}
              disabled={loading}
            />
            <button onClick={addComment} disabled={!newComment.trim() || loading}>
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
