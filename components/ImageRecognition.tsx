'use client'

import React, { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, X, Eye, Download, Camera } from 'lucide-react'

interface ImageRecognitionProps {
  onImageAnalysis: (imageFile: File, description: string) => void
}

export default function ImageRecognition({ onImageAnalysis }: ImageRecognitionProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (cameraRef.current) {
            cameraRef.current.srcObject = stream
            setShowCamera(true)
          }
        })
        .catch((err) => {
          console.error('Camera access error:', err)
          alert('Unable to access camera. Please upload an image instead.')
        })
    }
  }

  const capturePhoto = () => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context) {
        canvas.width = cameraRef.current.videoWidth
        canvas.height = cameraRef.current.videoHeight
        context.drawImage(cameraRef.current, 0, 0)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
            setSelectedImage(file)
            setImagePreview(URL.createObjectURL(blob))
            setShowCamera(false)
            
            // Stop camera stream
            const stream = cameraRef.current?.srcObject as MediaStream
            if (stream) {
              stream.getTracks().forEach(track => track.stop())
            }
          }
        }, 'image/jpeg')
      }
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    
    setIsAnalyzing(true)
    
    try {
      // Simulate AI analysis (replace with actual AI service)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate analysis based on image type
      const analysis = generateImageAnalysis(selectedImage)
      setAnalysisResult(analysis)
      
      // Call parent component with analysis
      onImageAnalysis(selectedImage, analysis)
      
    } catch (error) {
      console.error('Image analysis error:', error)
      setAnalysisResult('Sorry, I encountered an error analyzing this image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateImageAnalysis = (file: File): string => {
    // This is a placeholder - replace with actual AI analysis
    const fileName = file.name.toLowerCase()
    
    if (fileName.includes('math') || fileName.includes('equation')) {
      return 'I can see mathematical content in this image! This appears to be an equation or mathematical problem. I can help you solve it step by step, explain the concepts involved, or provide similar practice problems. What would you like me to help you with?'
    }
    
    if (fileName.includes('science') || fileName.includes('experiment')) {
      return 'This looks like a science experiment or scientific diagram! I can explain the scientific concepts, help you understand the process, or suggest related experiments you can try at home. What aspect would you like to explore?'
    }
    
    if (fileName.includes('history') || fileName.includes('map')) {
      return 'I can see historical content or geographical information! This appears to be related to history, geography, or social studies. I can provide historical context, explain the significance, or help you understand the relationships shown. What would you like to know more about?'
    }
    
    if (fileName.includes('language') || fileName.includes('text')) {
      return 'I can see text or language content! This appears to contain written material that I can help you analyze, translate, or explain. I can help with grammar, vocabulary, comprehension, or any questions you have about the content. What would you like me to help you with?'
    }
    
    return 'I can see an image! While I can\'t analyze the specific visual content yet, I can help you with questions about any topic. What would you like to learn about? You can also describe what you see, and I\'ll provide relevant information and resources.'
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview('')
    setAnalysisResult('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const downloadImage = () => {
    if (imagePreview) {
      const link = document.createElement('a')
      link.href = imagePreview
      link.download = selectedImage?.name || 'image.jpg'
      link.click()
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800">Image Recognition & Analysis</h3>
      
      {/* Image Upload Options */}
      <div className="flex space-x-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Upload size={16} />
          <span>Upload Image</span>
        </button>
        
        <button
          onClick={handleCameraCapture}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Camera size={16} />
          <span>Take Photo</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Camera View */}
      {showCamera && (
        <div className="relative">
          <video
            ref={cameraRef}
            autoPlay
            className="w-full max-w-md rounded-lg border"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button
              onClick={capturePhoto}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Capture
            </button>
            <button
              onClick={() => {
                setShowCamera(false)
                const stream = cameraRef.current?.srcObject as MediaStream
                if (stream) {
                  stream.getTracks().forEach(track => track.stop())
                }
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full max-w-md rounded-lg border shadow-sm"
          />
          
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={downloadImage}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              title="Download"
            >
              <Download size={16} />
            </button>
            <button
              onClick={removeImage}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              title="Remove"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Analysis Button */}
      {selectedImage && (
        <button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="w-full max-w-md px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing Image...' : 'Analyze Image with AI'}
        </button>
      )}

      {/* Analysis Result */}
      {analysisResult && (
        <div className="w-full max-w-md p-4 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500 mb-2">AI Analysis:</div>
          <div className="text-gray-800">{analysisResult}</div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 text-center">
        Upload images of math problems, science diagrams, historical documents, or any educational content.
        <br />
        I'll analyze them and provide explanations, resources, and help!
      </div>
    </div>
  )
} 