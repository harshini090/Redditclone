import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import Comments from './components/Comments';
import { POSTS, SUBREDDITS, COMMENTS } from './data/mockData';

// Add sorting utility function
const sortByRecency = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};

function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState(null);
  const [posts, setPosts] = useState(POSTS);
  const [comments, setComments] = useState(COMMENTS);
  const [currentView, setCurrentView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: 'Harshiii',
    subscribedSubreddits: [],
    upvotesReceived: 10,
  });
  const updateUsername = (newUsername) => {
    setUser(prevState => ({
        ...prevState,
        username: newUsername
    }));
  };

  // Enhanced error handling utility
  const handleError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  const handleUpvote = async (postId) => {
    try {
      setIsLoading(true);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, upvotes: post.upvotes + 1 }
            : post
        )
      );
    } catch (err) {
      handleError('Failed to upvote post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (postId, commentContent) => {
    try {
      if (!commentContent.trim()) {
        handleError('Comment cannot be empty.');
        return;
      }
      setIsLoading(true);
      const newComment = {
        id: comments.length + 1,
        postId,
        content: commentContent,
        author: user.username,
        timestamp: new Date().toISOString()
      };
      
      setComments(prevComments => [...prevComments, newComment]);
      
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
    } catch (err) {
      handleError('Failed to add comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (subreddit, subscribe) => {
    try {
      setIsLoading(true);
      setUser(prevState => {
        const currentSubs = new Set(prevState.subscribedSubreddits);
        
        if (subscribe && !currentSubs.has(subreddit.name)) {
          currentSubs.add(subreddit.name);
          console.log(`Subscribed to ${subreddit.name}`);
        } else if (!subscribe && currentSubs.has(subreddit.name)) {
          currentSubs.delete(subreddit.name);
          console.log(`Unsubscribed from ${subreddit.name}`);
        }

        return {
          ...prevState,
          subscribedSubreddits: Array.from(currentSubs),
        };
      });

      if (subscribe && (!selectedSubreddit || selectedSubreddit.id !== subreddit.id)) {
        setSelectedSubreddit(subreddit);
        setCurrentView('home');
      }
    } catch (err) {
      handleError('Failed to update subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (newPost) => {
    try {
      if (!newPost.title.trim() || !newPost.content.trim()) {
        handleError('Post title and content cannot be empty.');
        return;
      }
      setIsLoading(true);
      const post = {
        id: posts.length + 1,
        ...newPost,
        upvotes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        author: user.username
      };
      setPosts(prevPosts => [post, ...prevPosts]);
      setCurrentView('home');
    } catch (err) {
      handleError('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setError(null);
  };

  const filteredPosts = selectedSubreddit
    ? posts.filter(post => post.subredditId === selectedSubreddit.id)
    : posts;

  const renderMainContent = () => {
    if (error) {
      return (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button 
            className="error-dismiss"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    switch(currentView) {
      case 'create-post':
        return (
          <CreatePost 
            subredditId={selectedSubreddit?.id} 
            onPostCreate={handleCreatePost}
            availableSubreddits={SUBREDDITS}
          />
        );
      case 'profile':
        return (
          <UserProfile 
            user={user}
            posts={posts.filter(post => post.author === user.username)}
            onUpdateUsername={updateUsername}  // Pass the new function
          />
        );
      default:
        return (
          <div className="posts">
            {filteredPosts.length === 0 ? (
              <div className="no-posts">
                <p>No posts found. Be the first to post!</p>
              </div>
            ) : (
              filteredPosts
                .sort(sortByRecency)
                .map(post => (
                  <div key={post.id} className="post-container">
                    <PostCard 
                      post={post} 
                      onUpvote={handleUpvote}
                    />
                    <Comments 
                      postId={post.id}
                      comments={comments.filter(c => c.postId === post.id)}
                      onAddComment={handleAddComment}
                    />
                  </div>
                ))
            )}
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        subreddits={SUBREDDITS}
        onSubredditSelect={setSelectedSubreddit}
        onSubscribe={handleSubscribe}
        subscribedSubreddits={user.subscribedSubreddits}
        onNavigation={handleNavigation}
        currentView={currentView}
        selectedSubreddit={selectedSubreddit}
      />
      
      <div className="main-content">
        {renderMainContent()}
      </div>
    </div>
  );
}

export default App;