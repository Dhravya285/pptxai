// components/FeedbackModal.jsx
import React, { useState } from 'react';
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import '../styles/Modal.css';

const FeedbackModal = ({ onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    // Would handle submission to backend
    console.log('Feedback submitted:', { rating, feedback });
    setSubmitted(true);
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content feedback-modal">
        <div className="modal-header">
          <h2>Provide Feedback</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        {!submitted ? (
          <>
            <div className="modal-body">
              <p className="modal-intro">
                Help us improve our gesture recognition and presentation controls by sharing your experience.
              </p>
              
              <div className="rating-section">
                <h3>How was your experience?</h3>
                <div className="rating-buttons">
                  <button 
                    className={`rating-button ${rating === 'positive' ? 'active' : ''}`}
                    onClick={() => setRating('positive')}
                  >
                    <ThumbsUp size={24} />
                    <span>Good</span>
                  </button>
                  
                  <button 
                    className={`rating-button ${rating === 'negative' ? 'active' : ''}`}
                    onClick={() => setRating('negative')}
                  >
                    <ThumbsDown size={24} />
                    <span>Needs Improvement</span>
                  </button>
                </div>
              </div>
              
              <div className="feedback-form">
                <h3>Tell us more (optional)</h3>
                <textarea
                  className="feedback-textarea"
                  placeholder="Share your thoughts, suggestions, or issues..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="secondary-button" onClick={onClose}>
                Cancel
              </button>
              
              <button 
                className="primary-button" 
                onClick={handleSubmit}
                disabled={!rating}
              >
                <Send size={16} />
                Submit Feedback
              </button>
            </div>
          </>
        ) : (
          <div className="modal-body thank-you">
            <div className="thank-you-message">
              <ThumbsUp size={48} />
              <h3>Thank you for your feedback!</h3>
              <p>Your input helps us improve the application.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
