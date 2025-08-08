from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    task = db.relationship("Task", backref=db.backref('comments', lazy=True))

with app.app_context():
    db.create_all()
    if not db.session.get(Task, 1):  # ✅ Updated from .query.get()
        db.session.add(Task(title='First Task'))
        db.session.commit()

@app.route('/tasks/<int:task_id>/comments', methods=['POST'])
def add_comment(task_id):
    data = request.get_json()
    content = data.get('content')
    if not content:
        return jsonify({'error': 'Content required'}), 400
    if not db.session.get(Task, task_id):
        return jsonify({'error': 'Task not found'}), 404
    comment = Comment(content=content, task_id=task_id)
    db.session.add(comment)
    db.session.commit()
    return jsonify({'id': comment.id, 'content': comment.content}), 201

@app.route('/comments/<int:comment_id>', methods=['PUT'])
def edit_comment(comment_id):
    comment = db.session.get(Comment, comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    data = request.get_json()
    content = data.get("content")
    if not content:
        return jsonify({'error': 'Content required'}), 400
    comment.content = content
    db.session.commit()
    return jsonify({'id': comment.id, 'content': comment.content})

@app.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = db.session.get(Comment, comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    db.session.delete(comment)
    db.session.commit()
    return '', 204

@app.route('/tasks/<int:task_id>/comments', methods=['GET'])
def get_comments(task_id):
    comments = Comment.query.filter_by(task_id=task_id).all()
    return jsonify([{'id': c.id, 'content': c.content} for c in comments])

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
