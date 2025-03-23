// components/Header.jsx
import React from 'react';
import { Sun, Moon, HelpCircle, MessageSquare } from 'lucide-react';
import '../styles/Header.css';

const Header = ({ 
  currentSlide, 
  totalSlides, 
  darkMode, 
  setDarkMode, 
  onShowGuide, 
  onShowFeedback 
}) => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <h1>GesturePPT</h1>
      </div>
      
      <div className="slide-counter">
        Slide {currentSlide} of {totalSlides || 0}
      </div>
      
      <div className="header-actions">
        <button 
          className="icon-button theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className="icon-button" 
          onClick={onShowGuide}
          title="Gesture Guide"
        >
          <HelpCircle size={20} />
        </button>
        
        <button 
          className="icon-button" 
          onClick={onShowFeedback}
          title="Send Feedback"
        >
          <MessageSquare size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;