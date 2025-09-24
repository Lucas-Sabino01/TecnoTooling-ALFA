// components/Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão Hambúrguer */}
      <button 
        className="hamburger-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <div className={`hamburger ${isOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>TecnoTooling</h2>
          <button 
            className="close-btn"
            onClick={toggleSidebar}
          >
            ×
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#inventory">Inventário</a></li>
            <li><a href="#reports">Relatórios</a></li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;