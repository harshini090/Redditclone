import React, { useState } from 'react';

function PostCard({ post, onUpvote }) {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      onUpvote(post.id); // This will be handled by the parent component
    }
  };

  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      
      <div className="post-footer">
        <div className="post-actions">
          <span 
            onClick={handleUpvote} 
            className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            {hasUpvoted ? '❤️' : '👍'} {post.upvotes} Upvotes
          </span>
          <span>💬 {post.comments} Comments</span>
        </div>
        <div className="post-meta">
          {post.author} • {post.timestamp}
        </div>
      </div>
    </div>
  );
}

export default PostCard;