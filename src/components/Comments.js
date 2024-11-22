import React, { useState } from 'react';

const Comments = ({ postId, comments = [], onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate comment
    if (!newComment.trim()) {
      setError('Please enter a comment');
      return;
    }

    try {
      // Submit comment through the provided handler
      onAddComment(postId, newComment);
      
      // Clear form and error on success
      setNewComment('');
      setError('');
      
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    }
  };

  return (
    <div className="comments-section">
      <h4>Comments ({comments.length})</h4>
      
      <form onSubmit={handleSubmit} className="comment-form">
        {error && <div className="error-message">{error}</div>}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className={error ? 'error' : ''}
        />
        <button 
          type="submit" 
          disabled={!newComment.trim()}
          className="comment-button"
        >
          Post Comment
        </button>
      </form>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-content">
                <p>{comment.content}</p>
                <div className="comment-meta">
                  <small>
                    <span className="comment-author">{comment.author}</span> • 
                    <span className="comment-time">{comment.timestamp}</span>
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;