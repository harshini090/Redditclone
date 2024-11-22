import React, { useState } from 'react';

const Subreddit = ({ subreddit, onSubscribe }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    onSubscribe(subreddit, !isSubscribed); // Notify parent to handle subscription
  };

  return (
    <div className="subreddit">
      <h3>{subreddit.name}</h3>
      <button onClick={handleSubscribe}>
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
};

export default Subreddit;
