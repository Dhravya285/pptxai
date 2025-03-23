// components/GestureRecognition.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../styles/GestureRecognition.css';

const GestureRecognition = ({ onGestureDetected }) => {
  const videoRef = useRef(null);
  const [isSetup, setIsSetup] = useState(false);
  const [gestureDetected, setGestureDetected] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  
  // Animation for gesture feedback
  useEffect(() => {
    if (gestureDetected) {
      const timer = setTimeout(() => {
        setGestureDetected(null);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [gestureDetected]);
  
  // Set up webcam and gesture detection
  useEffect(() => {
    let handLandmarker;
    let runningMode = "IMAGE";
    let webcamRunning = false;
    const videoWidth = 320;
    
    // This would be replaced with actual MediaPipe or TensorFlow.js implementation
    // This is a simplified mock version for the UI prototype
    const setupWebcam = async () => {
      const constraints = {
        video: {
          width: videoWidth,
          height: videoWidth * 0.75,
          facingMode: "user"
        }
      };
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;
        
        if (video) {
          video.srcObject = stream;
          video.addEventListener("loadeddata", predictWebcam);
        }
        
        webcamRunning = true;
        setIsSetup(true);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setIsSetup(false);
      }
    };
    
    // Mock prediction function (would be replaced with actual ML implementation)
    const predictWebcam = () => {
      if (!webcamRunning) return;
      
      // Simulate random gesture detection (in a real app this would be ML-based)
      if (Math.random() < 0.05) {
        const gestures = [
          'swipe-left',
          'swipe-right',
          'point',
          'draw',
          'erase',
          'clear'
        ];
        
        const gesture = gestures[Math.floor(Math.random() * gestures.length)];
        setGestureDetected(gesture);
        onGestureDetected(gesture);
      }
      
      // Continue detecting
      window.requestAnimationFrame(predictWebcam);
    };
    
    if (showCamera) {
      setupWebcam();
    }
    
    // Clean up webcam
    return () => {
      webcamRunning = false;
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onGestureDetected, showCamera]);
  
  return (
    <div className="gesture-recognition">
      {!showCamera ? (
        <button 
          className="camera-toggle-button"
          onClick={() => setShowCamera(true)}
        >
          Start Camera
        </button>
      ) : (
        <div className="webcam-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="webcam-video"
          />
          
          <button 
            className="camera-toggle-button camera-hide-button"
            onClick={() => setShowCamera(false)}
          >
            Hide Camera
          </button>
          
          {gestureDetected && (
            <div className="gesture-indicator">
              <div className="gesture-name">{gestureDetected}</div>
            </div>
          )}
        </div>
      )}
      
      {showCamera && !isSetup && (
        <div className="gesture-setup-error">
          <p>Unable to access camera for gesture recognition.</p>
          <button 
            className="setup-button"
            onClick={() => setShowCamera(true)}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default GestureRecognition;