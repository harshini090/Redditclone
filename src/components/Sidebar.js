import React from 'react';
import NavItem from './NavItem';

function Sidebar({ 
  subreddits, 
  onSubredditSelect, 
  onSubscribe, 
  subscribedSubreddits,
  onNavigation,
  currentView 
}) {
  const isSubscribed = (subredditName) => {
    return subscribedSubreddits.includes(subredditName);
  };

  return (
    <aside className="sidebar">
      <div className="logo">RedditClone</div>
      
      <nav>
        <NavItem 
          icon="🏠" 
          label="Home" 
          onClick={() => onNavigation('home')}
          active={currentView === 'home'}
        />
        <NavItem 
          icon="➕" 
          label="Create Post" 
          onClick={() => onNavigation('create-post')}
          active={currentView === 'create-post'}
        />
        <NavItem 
          icon="👤" 
          label="Profile" 
          onClick={() => onNavigation('profile')}
          active={currentView === 'profile'}
        />
      </nav>

      <div className="subreddit-section">
        <h2>Subreddits</h2>
        {subreddits.map(subreddit => (
          <div key={subreddit.id} className="subreddit-item">
            <div 
              onClick={() => {
                onSubredditSelect(subreddit);
                onNavigation('home');
              }}
            >
              <h3>{subreddit.name}</h3>
              <p>{subreddit.description}</p>
            </div>
            <button 
              className={`subscribe-button ${isSubscribed(subreddit.name) ? 'subscribed' : ''}`}
              onClick={() => onSubscribe(subreddit, !isSubscribed(subreddit.name))}
            >
              {isSubscribed(subreddit.name) ? 'Unsubscribe' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;