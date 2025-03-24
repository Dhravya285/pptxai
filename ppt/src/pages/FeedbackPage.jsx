import React, { useState } from 'react';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-xl font-bold">Gesture Controller</div>
        
        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-blue-400 transition">Home</a>
          </li>
          <li>
            <a href="/guide" className="hover:text-blue-400 transition">Guide</a>
          </li>
          <li>
            <a href="/feedback" className="hover:text-blue-400 transition">Feedback</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const FeedbackPage = () => {
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Added Navbar at the top */}
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {!submitted ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="border-b border-gray-700 pb-4 mb-4">
                <h2 className="text-2xl font-bold text-white">Share Your Feedback</h2>
                <p className="text-gray-400">
                  Help us improve our hand gesture PowerPoint controller by sharing your experience.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white">How would you rate your experience?</h3>
                    <div className="flex flex-col space-y-2">
                      {["excellent", "good", "average", "poor", "terrible"].map((value) => (
                        <label key={value} className="flex items-center space-x-2 text-gray-300">
                          <input
                            type="radio"
                            name="rating"
                            value={value}
                            checked={rating === value}
                            onChange={(e) => setRating(e.target.value)}
                            className="form-radio text-blue-500"
                          />
                          <span className="capitalize">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">Tell us more about your experience</h3>
                    <textarea
                      placeholder="Share your thoughts, suggestions, or issues you encountered..."
                      className="w-full min-h-[120px] p-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-md"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <a 
                    href="/guide" 
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition"
                  >
                    Back to Guide
                  </a>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-white">Thank You!</h2>
              <p className="text-gray-400 mt-2">Your feedback has been submitted successfully.</p>
              <div className="mt-6">
                <a 
                  href="/guide" 
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition"
                >
                  Return to Guide
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;