"use client"
import React from "react"
import { useState } from "react"
import { 
  Hand,
  Upload,
  ChevronRight,
  Pencil,
  Pointer,
  Eraser,
  Highlighter,
  Presentation,
  ArrowRight,
  ArrowLeft,
  ZoomIn,
  Check,
  AlertCircle
} from "lucide-react"
import Navbar from "../components/Navbar"

export default function LandingPage() {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState("idle") // idle, uploading, success, error
  const [activeTab, setActiveTab] = useState("upload")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setErrorMessage("")
    
    if (selectedFile) {
      // Validate file type
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase()
      if (fileExtension !== 'ppt' && fileExtension !== 'pptx') {
        setErrorMessage("Please upload a PowerPoint file (.ppt or .pptx)")
        return
      }
      
      // Validate file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setErrorMessage("File size exceeds 50MB limit")
        return
      }
      
      setFile(selectedFile)
      setUploadStatus("uploading")
      
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("presentation", selectedFile)
      
      // Perform actual file upload to server
      uploadPresentationFile(formData)
    }
  }
  
  const uploadPresentationFile = async (formData) => {
    try {
      // In a production environment, replace with your actual API endpoint
      // const response = await fetch('/api/upload-presentation', {
      //   method: 'POST',
      //   body: formData
      // })
      
      // For demo purposes, we'll simulate the API call with a timeout
      // In a real application, uncomment the fetch call above and remove this timeout
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // if (!response.ok) {
      //   throw new Error('Failed to upload file')
      // }
      
      setUploadStatus("success")
      setActiveTab("annotate")
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus("error")
      setErrorMessage("Failed to upload file. Please try again.")
    }
  }
  
  const retryUpload = () => {
    setUploadStatus("idle")
    setErrorMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Control Your Presentations with <span className="text-blue-400">Hand Gestures</span>
              </h1>
              <p className="text-xl text-gray-300">
                Upload your PowerPoint, control it with gestures, and annotate slides in real-time for more engaging
                presentations.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-6 text-white rounded-md">Try It Now</button>
                <button className="border border-gray-700 hover:bg-gray-800 text-lg px-6 py-6 text-white rounded-md">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl">
                <div className="absolute -top-3 -left-3 bg-blue-600 rounded-full p-2">
                  <Hand className="h-6 w-6" />
                </div>
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Gesture Control Demo"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload and Annotate Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upload & Annotate Your Presentations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in seconds. Upload your PowerPoint and use hand gestures to control and annotate your slides.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="w-full">
              <div className="grid w-full grid-cols-2 mb-8">
                <button 
                  className={`py-2 px-4 rounded-l-md ${activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setActiveTab("upload")}
                >
                  Upload
                </button>
                <button 
                  className={`py-2 px-4 rounded-r-md ${activeTab === "annotate" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setActiveTab("annotate")}
                  disabled={uploadStatus !== "success"}
                >
                  Annotate
                </button>
              </div>

              {activeTab === "upload" && (
                <div className="border border-gray-800 bg-gray-900 rounded-lg">
                  <div className="p-6">
                    <div className="space-y-8">
                      <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
                        {uploadStatus === "idle" && (
                          <>
                            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-medium mb-2">Upload Your PowerPoint</h3>
                            <p className="text-gray-400 mb-6">Drag and drop your file here, or click to browse</p>
                            <input
                              type="file"
                              id="ppt-upload"
                              className="hidden"
                              accept=".ppt,.pptx"
                              onChange={handleFileChange}
                            />
                            <label htmlFor="ppt-upload">
                              <button 
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white cursor-pointer"
                                onClick={() => document.getElementById('ppt-upload').click()}
                              >
                                Select File
                              </button>
                            </label>
                            <p className="text-sm text-gray-500 mt-4">Supports .ppt and .pptx files up to 50MB</p>
                            {errorMessage && (
                              <div className="mt-4 text-red-500 flex items-center justify-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                <span>{errorMessage}</span>
                              </div>
                            )}
                          </>
                        )}

                        {uploadStatus === "uploading" && (
                          <div className="space-y-4">
                            <div className="animate-pulse flex space-x-4 items-center justify-center">
                              <div className="rounded-full bg-blue-400 h-12 w-12"></div>
                              <div className="flex-1 space-y-4 max-w-md">
                                <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-700 rounded"></div>
                              </div>
                            </div>
                            <p className="text-gray-300">Uploading {file?.name}...</p>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                              <div className="bg-blue-600 h-2.5 rounded-full w-1/2 animate-[upload_2s_ease-in-out_infinite]"></div>
                            </div>
                          </div>
                        )}

                        {uploadStatus === "success" && (
                          <div className="space-y-4">
                            <div className="rounded-full bg-green-500 h-12 w-12 mx-auto flex items-center justify-center">
                              <Check className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-medium">Upload Complete!</h3>
                            <p className="text-gray-300">{file?.name} has been uploaded successfully</p>
                            <button
                              className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded-md text-white flex items-center justify-center mx-auto"
                              onClick={() => setActiveTab("annotate")}
                            >
                              Continue to Annotation <ChevronRight className="ml-2 h-4 w-4" />
                            </button>
                          </div>
                        )}
                        
                        {uploadStatus === "error" && (
                          <div className="space-y-4">
                            <div className="rounded-full bg-red-500 h-12 w-12 mx-auto flex items-center justify-center">
                              <AlertCircle className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-medium">Upload Failed</h3>
                            <p className="text-red-400">{errorMessage}</p>
                            <button
                              className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded-md text-white"
                              onClick={retryUpload}
                            >
                              Try Again
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                          <h4 className="font-medium">Easy Upload</h4>
                          <p className="text-sm text-gray-400">Drag & drop your PowerPoint files</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <Hand className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                          <h4 className="font-medium">Gesture Control</h4>
                          <p className="text-sm text-gray-400">Navigate slides with hand movements</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <Pencil className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                          <h4 className="font-medium">Real-time Annotation</h4>
                          <p className="text-sm text-gray-400">Draw and highlight with gestures</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "annotate" && (
                <div className="border border-gray-800 bg-gray-900 rounded-lg">
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="absolute top-4 right-4 bg-gray-800 rounded-lg p-2 flex gap-2 z-10">
                          <button className="h-8 w-8 text-blue-400 flex items-center justify-center hover:bg-gray-700 rounded-md">
                            <Pointer className="h-5 w-5" />
                          </button>
                          <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded-md">
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded-md">
                            <Highlighter className="h-5 w-5" />
                          </button>
                          <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded-md">
                            <Eraser className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="bg-white rounded-lg aspect-video relative overflow-hidden">
                          {/* This would be the actual PowerPoint slide */}
                          <img
                            src="/placeholder.svg?height=400&width=700"
                            alt="PowerPoint Slide"
                            className="w-full h-full object-cover"
                          />

                          {/* Example annotation overlay */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path d="M100,150 C150,100 200,200 300,150" stroke="#3b82f6" strokeWidth="5" fill="none" />
                            <circle cx="400" cy="200" r="50" stroke="#ef4444" strokeWidth="3" fill="none" />
                          </svg>
                        </div>

                        <div className="flex justify-between mt-4">
                          <button className="border border-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md text-white flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous Slide
                          </button>
                          <div className="flex gap-2">
                            <button className="border border-gray-700 hover:bg-gray-800 w-10 h-10 rounded-md flex items-center justify-center">
                              <ZoomIn className="h-4 w-4" />
                            </button>
                            <button className="border border-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md text-white flex items-center">
                              <Presentation className="mr-2 h-4 w-4" /> Present Mode
                            </button>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white flex items-center">
                            Next Slide <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Annotation Controls</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-gray-900 p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center mb-2">
                              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                <Pointer className="h-5 w-5 text-blue-400" />
                              </div>
                            </div>
                            <p className="text-sm">Point with index finger</p>
                          </div>
                          <div className="bg-gray-900 p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center mb-2">
                              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                <Pencil className="h-5 w-5 text-blue-400" />
                              </div>
                            </div>
                            <p className="text-sm">Draw with pinch gesture</p>
                          </div>
                          <div className="bg-gray-900 p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center mb-2">
                              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                <Highlighter className="h-5 w-5 text-blue-400" />
                              </div>
                            </div>
                            <p className="text-sm">Highlight with three fingers</p>
                          </div>
                          <div className="bg-gray-900 p-3 rounded-lg text-center">
                            <div className="flex items-center justify-center mb-2">
                              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                <Eraser className="h-5 w-5 text-blue-400" />
                              </div>
                            </div>
                            <p className="text-sm">Erase with fist motion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="border border-gray-800 bg-gray-900 rounded-lg h-full">
                <div className="p-6 space-y-4">
                  <Upload className="h-12 w-12 text-blue-400" />
                  <h3 className="text-xl font-semibold">Upload Your Presentation</h3>
                  <p className="text-gray-400">
                    Upload your PowerPoint presentation to our platform. We support .ppt and .pptx files.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="border border-gray-800 bg-gray-900 rounded-lg h-full">
                <div className="p-6 space-y-4">
                  <Hand className="h-12 w-12 text-blue-400" />
                  <h3 className="text-xl font-semibold">Calibrate Hand Gestures</h3>
                  <p className="text-gray-400">
                    Position yourself in front of your camera and follow the calibration steps to set up gesture
                    recognition.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="border border-gray-800 bg-gray-900 rounded-lg h-full">
                <div className="p-6 space-y-4">
                  <Presentation className="h-12 w-12 text-blue-400" />
                  <h3 className="text-xl font-semibold">Present & Annotate</h3>
                  <p className="text-gray-400">
                    Start your presentation and use hand gestures to navigate, annotate, and engage with your audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Presentations?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of presenters who are delivering more engaging and interactive presentations with
            GesturePoint.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-md text-white">Get Started for Free</button>
          <p className="text-sm text-gray-400 mt-4">No credit card required. Free for 14 days.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hand className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">GesturePoint</span>
              </div>
              <p className="text-gray-400">
                Transform your presentations with hand gesture controls and real-time annotations.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Download
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GesturePoint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}