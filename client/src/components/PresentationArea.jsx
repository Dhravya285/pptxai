// components/PresentationArea.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import '../styles/PresentationArea.css';

const PresentationArea = ({ 
  pptFile, 
  onUpload, 
  currentSlide, 
  totalSlides,
  activeTool,
  annotations,
  setAnnotations
}) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };
  
  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };
  
  // Set up canvas and handle resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        setCanvasSize({ width, height });
        canvas.width = width;
        canvas.height = height;
        renderCanvas();
      }
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);
  
  // Re-render canvas when slide changes or annotations change
  useEffect(() => {
    renderCanvas();
  }, [currentSlide, annotations, activeTool]);
  
  // Handle mouse/touch events for drawing
  const startDrawing = (e) => {
    if (!activeTool || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setCurrentPath([{ x, y, tool: activeTool }]);
  };
  
  const draw = (e) => {
    if (!isDrawing || !activeTool || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentPath(prev => [...prev, { x, y, tool: activeTool }]);
    
    // Draw current stroke
    const ctx = canvas.getContext('2d');
    const prevPoint = currentPath[currentPath.length - 1];
    
    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = activeTool === 'pen' ? '#ff5722' : '#4fc3f7';
      ctx.lineWidth = activeTool === 'pen' ? 3 : 1;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  };
  
  const endDrawing = () => {
    if (isDrawing && currentPath.length > 1) {
      setAnnotations(prev => [...prev, currentPath]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };
  
  // Render all annotations on canvas
  const renderCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw slide background (would be replaced with actual slide content)
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw slide number
    if (totalSlides > 0) {
      ctx.fillStyle = '#555';
      ctx.font = '24px Arial';
      ctx.fillText(`Slide ${currentSlide}`, canvas.width / 2 - 40, canvas.height / 2);
    }
    
    // Draw all annotations
    annotations.forEach(path => {
      if (path.length < 2) return;
      
      const startPoint = path[0];
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      
      path.forEach((point, index) => {
        if (index === 0) return;
        
        if (point.tool === 'eraser') {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = point.tool === 'pen' ? '#ff5722' : '#4fc3f7';
          ctx.lineWidth = point.tool === 'pen' ? 3 : 1;
          ctx.lineTo(point.x, point.y);
        }
      });
      
      if (startPoint.tool !== 'eraser') {
        ctx.stroke();
      }
    });
    
    // Draw cursor based on active tool
    if (activeTool) {
      const cursorSize = 20;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = '#000';
      
      // Show cursor in bottom right corner
      const x = canvas.width - cursorSize - 10;
      const y = canvas.height - cursorSize - 10;
      
      ctx.globalCompositeOperation = 'source-over';
      
      if (activeTool === 'pointer') {
        // Draw pointer cursor
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y + 15);
        ctx.lineTo(x + 5, y + 15);
        ctx.lineTo(x + 8, y + 20);
        ctx.lineTo(x + 3, y + 20);
        ctx.lineTo(x, y + 15);
        ctx.lineTo(x - 5, y + 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (activeTool === 'pen') {
        // Draw pen cursor
        ctx.beginPath();
        ctx.moveTo(x, y + 15);
        ctx.lineTo(x + 5, y);
        ctx.lineTo(x + 10, y + 5);
        ctx.lineTo(x + 5, y + 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (activeTool === 'eraser') {
        // Draw eraser cursor
        ctx.beginPath();
        ctx.rect(x - 5, y - 5, 20, 20);
        ctx.fill();
        ctx.stroke();
      }
    }
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  };
  
  return (
    <div className="presentation-area">
      {!pptFile ? (
        <div 
          className="upload-container"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-box">
            <Upload size={48} />
            <h2>Upload Presentation</h2>
            <p>Drag & drop your PPT file here or click to browse</p>
            <input
              type="file"
              id="ppt-upload"
              accept=".ppt,.pptx"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button 
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              Select File
            </button>
          </div>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="presentation-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
      )}
    </div>
  );
};

export default PresentationArea;