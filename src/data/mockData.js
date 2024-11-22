export const SUBREDDITS = [
    { id: 1, name: 'Technology', description: 'All things tech' },
    { id: 2, name: 'Gaming', description: 'Video game discussions' },
    { id: 3, name: 'Movies', description: 'Film and cinema' }
  ];
  
  export const POSTS = [
    {
      id: 1,
      subredditId: 1,
      title: 'Latest AI Breakthrough',
      content: 'Discussing recent advances in machine learning...',
      upvotes: 42,
      comments: 5,
      author: 'techguru',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      subredditId: 2,
      title: 'Best Games of 2024',
      content: 'What games have you been playing recently?',
      upvotes: 87,
      comments: 12,
      author: 'gamingfan',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      subredditId: 3,
      title: 'Best movies of 2024',
      content: 'What is your favourite movie in 2024?',
      upvotes: 65,
      comments: 7,
      author: 'movieLover',
      timestamp: '3 hours ago'
    }
  ];
  export const COMMENTS = [
    {
      id: 1,
      postId: 1,
      content: 'Great insights about AI!',
      author: 'user123',
      timestamp: '1 hour ago'
    },
    {
      id: 2,
      postId: 2,
      content: 'Great insights about movies!',
      author: 'user123',
      timestamp: '1 hour ago'
    },

  ];