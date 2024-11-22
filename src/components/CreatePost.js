import React, { useState } from 'react';

const CreatePost = ({ subredditId, onPostCreate, availableSubreddits }) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    subredditId: subredditId || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!postData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!postData.content.trim()) {
      alert('Please enter content');
      return;
    }
    
    if (!postData.subredditId && !subredditId) {
      alert('Please select a subreddit');
      return;
    }
    
    onPostCreate({
      ...postData,
      subredditId: subredditId || postData.subredditId,
    });
    
    setPostData({ title: '', content: '', subredditId: '' });
  };

  return (
    <div className="create-post">
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        {!subredditId && (
          <select
            value={postData.subredditId}
            onChange={(e) => setPostData({...postData, subredditId: e.target.value})}
            className="subreddit-select"
          >
            <option value="">Select a Subreddit</option>
            {availableSubreddits?.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Post Title"
          value={postData.title}
          onChange={(e) => setPostData({...postData, title: e.target.value})}
          className="post-input"
        />
        <textarea
          placeholder="Post Content"
          value={postData.content}
          onChange={(e) => setPostData({...postData, content: e.target.value})}
          className="post-textarea"
        />
        <button type="submit" className="submit-button">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;