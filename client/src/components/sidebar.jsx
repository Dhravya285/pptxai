// components/Sidebar.jsx
import React from 'react';
import { PlayCircle, PauseCircle, ChevronLeft, ChevronRight, Pen, Pencil, Eraser, Trash, Hand, Pointer, ZapOff, Zap } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ 
  activeTool, 
  setActiveTool, 
  isPlaying, 
  setIsPlaying, 
  onPrev, 
  onNext, 
  gestureEnabled, 
  setGestureEnabled, 
  onClearAnnotations 
}) => {
  const tools = [
    { id: 'pointer', icon: <Pointer size={20} />, label: 'Pointer' },
    { id: 'hand', icon: <Hand size={20} />, label: 'Hand' },
    { id: 'pen', icon: <Pen size={20} />, label: 'Pen' },
    { id: 'pencil', icon: <Pencil size={20} />, label: 'Pencil' },
    { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
  ];

  return (
    <div className="sidebar">
      <div className="tool-section">
        <h3>Tools</h3>
        <div className="tool-buttons">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
          
          <button
            className="tool-button clear-button"
            onClick={onClearAnnotations}
            title="Clear All Annotations"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
      
      <div className="navigation-section">
        <h3>Navigation</h3>
        <div className="navigation-buttons">
          <button 
            className="nav-button" 
            onClick={onPrev}
            title="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="play-button" 
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
          >
            {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
          </button>
          
          <button 
            className="nav-button" 
            onClick={onNext}
            title="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="gesture-control">
        <h3>Gesture Control</h3>
        <button 
          className={`gesture-toggle ${gestureEnabled ? 'enabled' : 'disabled'}`}
          onClick={() => setGestureEnabled(!gestureEnabled)}
        >
          {gestureEnabled ? <Zap size={20} /> : <ZapOff size={20} />}
          {gestureEnabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;