'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface VoiceChatProps {
  onVoiceInput: (text: string) => void
  currentMessage?: string
  isListening: boolean
  onToggleListening: () => void
}

export default function VoiceChat({ 
  onVoiceInput, 
  currentMessage, 
  isListening, 
  onToggleListening 
}: VoiceChatProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechText, setSpeechText] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Check if speech recognition and synthesis are supported
    const speechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    const speechSynthesis = window.speechSynthesis
    
    if (speechRecognition && speechSynthesis) {
      setIsSupported(true)
      
      // Initialize speech recognition
      recognitionRef.current = new speechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSpeechText(transcript)
        onVoiceInput(transcript)
      }
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
      }
      
      recognitionRef.current.onend = () => {
        // Recognition ended
      }
    }
  }, [onVoiceInput])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
    onToggleListening()
  }

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return
    
    // Stop any current speech
    window.speechSynthesis.cancel()
    
    utteranceRef.current = new SpeechSynthesisUtterance(text)
    utteranceRef.current.rate = 0.9
    utteranceRef.current.pitch = 1
    utteranceRef.current.volume = 1
    
    utteranceRef.current.onstart = () => setIsSpeaking(true)
    utteranceRef.current.onend = () => setIsSpeaking(false)
    utteranceRef.current.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utteranceRef.current)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const handleSpeakCurrent = () => {
    if (currentMessage) {
      speakText(currentMessage)
    }
  }

  if (!isSupported) {
    return (
      <div className="p-4 text-center text-gray-500">
        Voice features are not supported in your browser.
        <br />
        Please use Chrome, Edge, or Safari for voice capabilities.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800">Voice Chat</h3>
      
      {/* Voice Input */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 text-white shadow-lg scale-110' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        <div className="text-sm text-gray-600">
          {isListening ? 'Listening... Speak now!' : 'Click to start voice input'}
        </div>
      </div>

      {/* Speech Text Display */}
      {speechText && (
        <div className="w-full max-w-md p-3 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500 mb-1">You said:</div>
          <div className="text-gray-800">{speechText}</div>
        </div>
      )}

      {/* Voice Output Controls */}
      {currentMessage && (
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSpeakCurrent}
            disabled={isSpeaking}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {isSpeaking ? <Pause size={16} /> : <Play size={16} />}
            <span>{isSpeaking ? 'Speaking...' : 'Speak Response'}</span>
          </button>
          
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Stop
            </button>
          )}
        </div>
      )}

      {/* Voice Settings */}
      <div className="text-xs text-gray-500 text-center">
        Voice features work best with clear speech and a quiet environment.
        <br />
        Supported languages: English, Hindi, and more coming soon!
      </div>
    </div>
  )
} 