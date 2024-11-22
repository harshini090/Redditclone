import React from 'react';

function NavItem({ icon, label, onClick, active }) {
  return (
    <div 
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </div>
  );
}

export default NavItem;