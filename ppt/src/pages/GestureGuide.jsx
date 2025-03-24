import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Hand,
  HandMetal,
  Fingerprint,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
} from 'lucide-react';

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

function GestureGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('guide');
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Added Navbar at the top */}
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">Hand Gesture PowerPoint Controller</h1>
          <p className="text-xl text-gray-400">Control your presentations with simple hand gestures</p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Custom Tabs */}
          <div className="w-full mb-8">
            <div className="grid w-full grid-cols-3 bg-gray-800 rounded-lg overflow-hidden">
              <button
                className={`py-3 px-4 text-center ${
                  activeTab === 'guide' ? 'bg-gray-700 text-white' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('guide')}
              >
                Guide
              </button>
              <button
                className={`py-3 px-4 text-center ${
                  activeTab === 'gestures' ? 'bg-gray-700 text-white' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('gestures')}
              >
                Gesture Library
              </button>
              <button
                className={`py-3 px-4 text-center ${
                  activeTab === 'tips' ? 'bg-gray-700 text-white' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('tips')}
              >
                Tips & Tricks
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="border border-gray-800 bg-gray-900 rounded-lg p-6">
            {/* Guide Tab */}
            {activeTab === 'guide' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl text-white font-bold">Getting Started</h2>
                  <p className="text-gray-400">
                    Follow this step-by-step guide to set up your gesture controller
                  </p>
                </div>
                <div className="relative">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Step 1: Position yourself</h3>
                      <div className="flex items-center justify-center py-8">
                        <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center">
                          <Hand className="w-32 h-32 text-blue-400" />
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Stand approximately 3-6 feet away from your webcam. Make sure your hands are clearly visible
                        within the frame.
                      </p>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Step 2: Calibrate your hands</h3>
                      <div className="flex items-center justify-center py-8">
                        <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center">
                          <Fingerprint className="w-32 h-32 text-green-400" />
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Hold your hand up with fingers spread for 3 seconds to allow the system to calibrate and
                        recognize your hand.
                      </p>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Step 3: Basic navigation gestures</h3>
                      <div className="grid grid-cols-2 gap-6 py-8">
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <ArrowRight className="w-16 h-16 text-purple-400" />
                          </div>
                          <p className="text-gray-300 text-center">Swipe right to go to next slide</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <ArrowLeft className="w-16 h-16 text-purple-400" />
                          </div>
                          <p className="text-gray-300 text-center">Swipe left to go to previous slide</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Step 4: Advanced gestures</h3>
                      <div className="grid grid-cols-2 gap-6 py-8">
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Maximize2 className="w-16 h-16 text-yellow-400" />
                          </div>
                          <p className="text-gray-300 text-center">Pinch out to zoom in</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <Minimize2 className="w-16 h-16 text-yellow-400" />
                          </div>
                          <p className="text-gray-300 text-center">Pinch in to zoom out</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Step 5: You're ready!</h3>
                      <div className="flex items-center justify-center py-8">
                        <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center">
                          <HandMetal className="w-32 h-32 text-red-400" />
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Congratulations! You're now ready to control your PowerPoint presentation using hand gestures.
                        Practice the gestures to become more comfortable with the controls.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-4 py-2 flex items-center rounded ${
                        currentStep === 1
                          ? 'bg-gray-700 cursor-not-allowed opacity-50'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </button>
                    <div className="text-gray-400">
                      Step {currentStep} of {totalSteps}
                    </div>
                    <button
                      onClick={nextStep}
                      disabled={currentStep === totalSteps}
                      className={`px-4 py-2 flex items-center rounded ${
                        currentStep === totalSteps
                          ? 'cursor-not-allowed opacity-50'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Gestures Tab */}
            {activeTab === 'gestures' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl text-white font-bold">Gesture Library</h2>
                  <p className="text-gray-400">
                    Complete list of supported hand gestures and their actions
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Swipe Right</h4>
                      <p className="text-gray-400">Next slide</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <ChevronLeft className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Swipe Left</h4>
                      <p className="text-gray-400">Previous slide</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Pinch Out</h4>
                      <p className="text-gray-400">Zoom in</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <Minimize2 className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Pinch In</h4>
                      <p className="text-gray-400">Zoom out</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <Hand className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Open Palm</h4>
                      <p className="text-gray-400">Start/Stop presentation</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <HandMetal className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Fist</h4>
                      <p className="text-gray-400">Exit presentation</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl text-white font-bold">Tips & Tricks</h2>
                  <p className="text-gray-400">
                    Get the most out of your gesture-controlled presentations
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                      Lighting Matters
                    </h4>
                    <p className="text-gray-300">
                      Ensure your room has good, even lighting. Avoid backlighting that can create shadows on your
                      hands.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                      Practice Makes Perfect
                    </h4>
                    <p className="text-gray-300">
                      Take time to practice with the system before your actual presentation. This will help you become
                      more comfortable with the gestures.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                      Wear Contrasting Clothes
                    </h4>
                    <p className="text-gray-300">
                      Wear clothes that contrast with your skin tone to help the camera distinguish your hands more
                      easily.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                      Keep Movements Deliberate
                    </h4>
                    <p className="text-gray-300">
                      Make your hand gestures clear and deliberate. Avoid quick or subtle movements that might not be
                      detected.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium text-white flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                      Have a Backup Plan
                    </h4>
                    <p className="text-gray-300">
                      Always have a keyboard or clicker nearby as a backup in case you encounter any issues with the
                      gesture controls.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestureGuide;