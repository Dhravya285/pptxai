import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/sidebar';
import PresentationArea from './components/PresentationArea';
import GestureRecognition from './components/GestureRecognition';
import GuideModal from './components/GuideModal';
import FeedbackModal from './components/FeedbackModal';
import './styles/App.css';

const App = () => {
  // State management
  const [pptFile, setPptFile] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Upload PPT handler
  const handleFileUpload = (file) => {
    setPptFile(file);
    // Simulate parsing slides
    setTotalSlides(Math.floor(Math.random() * 20) + 5);
    setCurrentSlide(1);
  };

  // Navigation handlers
  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Play slideshow automatically
  useEffect(() => {
    let interval;
    if (isPlaying && totalSlides > 0) {
      interval = setInterval(() => {
        if (currentSlide < totalSlides) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 5000); // 5 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, totalSlides]);

  // Gesture recognition handler
  const handleGestureDetected = (gesture) => {
    if (!gestureEnabled) return;
    
    switch (gesture) {
      case 'swipe-left':
        nextSlide();
        break;
      case 'swipe-right':
        prevSlide();
        break;
      case 'point':
        setActiveTool('pointer');
        break;
      case 'draw':
        setActiveTool('pen');
        break;
      case 'erase':
        setActiveTool('eraser');
        break;
      case 'clear':
        setAnnotations([]);
        break;
      default:
        break;
    }
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <Header 
          currentSlide={currentSlide} 
          totalSlides={totalSlides}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onShowGuide={() => setShowGuide(true)}
          onShowFeedback={() => setShowFeedback(true)}
        />
        
        <div className="main-content">
          <Sidebar 
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onPrev={prevSlide}
            onNext={nextSlide}
            gestureEnabled={gestureEnabled}
            setGestureEnabled={setGestureEnabled}
            onClearAnnotations={() => setAnnotations([])}
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <PresentationArea 
                  pptFile={pptFile}
                  onUpload={handleFileUpload}
                  currentSlide={currentSlide}
                  totalSlides={totalSlides}
                  activeTool={activeTool}
                  annotations={annotations}
                  setAnnotations={setAnnotations}
                />
              }
            />
          </Routes>
        </div>
        
        {gestureEnabled && (
          <GestureRecognition onGestureDetected={handleGestureDetected} />
        )}
        
        {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
        {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      </div>
    </Router>
  );
};

export default App;
