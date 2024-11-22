import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2>{user.username}'s Profile</h2>
        </div>

        <div className="profile-section">
          <h3>Subscribed Subreddits</h3>
          {user.subscribedSubreddits.length > 0 ? (
            <div className="subreddit-list">
              {user.subscribedSubreddits.map((sub, index) => (
                <div key={index} className="subreddit-badge">
                  r/{sub}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-subs">No subscribed subreddits yet</p>
          )}
        </div>

        <div className="profile-section">
          <h3>Stats</h3>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-value">{user.upvotesReceived}</span>
              <span className="stat-label">Upvotes Received</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.subscribedSubreddits.length}</span>
              <span className="stat-label">Subscriptions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;