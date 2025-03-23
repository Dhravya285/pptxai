// components/GuideModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import '../styles/Modal.css';

const GuideModal = ({ onClose }) => {
  const gestureGuides = [
    {
      name: 'Swipe Left',
      description: 'Move your hand from right to left to go to the next slide',
      image: '👋→'
    },
    {
      name: 'Swipe Right',
      description: 'Move your hand from left to right to go to the previous slide',
      image: '👋←'
    },
    {
      name: 'Point',
      description: 'Extend your index finger to use the pointer tool',
      image: '👆'
    },
    {
      name: 'Draw',
      description: 'Make a drawing motion with your hand to activate the pen tool',
      image: '✍️'
    },
    {
      name: 'Erase',
      description: 'Make a wiping motion with your palm to use the eraser',
      image: '🖐️'
    },
    {
      name: 'Clear',
      description: 'Wave your hand in a circular motion to clear all annotations',
      image: '🔄'
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content guide-modal">
        <div className="modal-header">
          <h2>Gesture Guide</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-intro">
            Control your presentation with these hand gestures. Make sure your hand is clearly visible in the camera frame.
          </p>
          
          <div className="gesture-grid">
            {gestureGuides.map((gesture, index) => (
              <div key={index} className="gesture-card">
                <div className="gesture-icon">{gesture.image}</div>
                <h3>{gesture.name}</h3>
                <p>{gesture.description}</p>
              </div>
            ))}
          </div>
          
          <div className="tips-section">
            <h3>Tips for Best Recognition</h3>
            <ul>
              <li>Ensure good lighting in your environment</li>
              <li>Position yourself so your entire hand is in frame</li>
              <li>Make deliberate, clear gestures</li>
              <li>Avoid busy backgrounds if possible</li>
              <li>Keep a distance of approximately 50-80cm from the camera</li>
            </ul>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="primary-button" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;