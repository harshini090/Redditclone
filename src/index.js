import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import './styles/Sidebar.css';
import './styles/PostCard.css';
import './styles/NavItem.css';
import App from './App';
import './styles/CreatePost.css';
import './styles/Comments.css';
import './styles/UserProfile.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);