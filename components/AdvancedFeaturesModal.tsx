'use client'

import React, { useState } from 'react'
import { X, Mic, Image as ImageIcon, Code, Languages, Sparkles, Settings } from 'lucide-react'
import VoiceChat from './VoiceChat'
import ImageRecognition from './ImageRecognition'
import CodeGenerator from './CodeGenerator'
import LanguageTranslator from './LanguageTranslator'

interface AdvancedFeaturesModalProps {
  isOpen: boolean
  onClose: () => void
  onVoiceInput: (text: string) => void
  onImageAnalysis: (imageFile: File, description: string) => void
  onCodeGenerated: (code: string, language: string, explanation: string) => void
  onTranslation: (originalText: string, translatedText: string, targetLanguage: string) => void
}

export default function AdvancedFeaturesModal({
  isOpen,
  onClose,
  onVoiceInput,
  onImageAnalysis,
  onCodeGenerated,
  onTranslation
}: AdvancedFeaturesModalProps) {
  const [activeTab, setActiveTab] = useState('voice')
  const [isListening, setIsListening] = useState(false)

  if (!isOpen) return null

  const tabs = [
    {
      id: 'voice',
      label: 'Voice Chat',
      icon: Mic,
      description: 'Talk to LuckyChat like Siri',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'image',
      label: 'Image Recognition',
      icon: ImageIcon,
      description: 'Upload photos for AI analysis',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'code',
      label: 'Code Generator',
      icon: Code,
      description: 'Generate code & solve math problems',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'translate',
      label: 'Language Translator',
      icon: Languages,
      description: 'Multi-language support for education',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const handleVoiceInput = (text: string) => {
    onVoiceInput(text)
    // Auto-close modal after voice input
    setTimeout(() => onClose(), 1000)
  }

  const handleImageAnalysis = (imageFile: File, description: string) => {
    onImageAnalysis(imageFile, description)
    // Keep modal open for further analysis
  }

  const handleCodeGenerated = (code: string, language: string, explanation: string) => {
    onCodeGenerated(code, language, explanation)
    // Keep modal open for code review
  }

  const handleTranslation = (originalText: string, translatedText: string, targetLanguage: string) => {
    onTranslation(originalText, translatedText, targetLanguage)
    // Keep modal open for further translation
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles size={28} />
              <div>
                <h2 className="text-2xl font-bold">Advanced Features</h2>
                <p className="text-blue-100">Unlock the full power of LuckyChat AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-1 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : 'text-gray-600 hover:bg-white hover:text-gray-800'
                }`}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'voice' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  🎤 Voice Chat with LuckyChat
                </h3>
                <p className="text-gray-600">
                  Speak naturally and get instant responses. Perfect for hands-free learning!
                </p>
              </div>
              <VoiceChat
                onVoiceInput={handleVoiceInput}
                currentMessage=""
                isListening={isListening}
                onToggleListening={() => setIsListening(!isListening)}
              />
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  📸 AI Image Recognition
                </h3>
                <p className="text-gray-600">
                  Upload photos of math problems, science diagrams, or any educational content for instant AI analysis.
                </p>
              </div>
              <ImageRecognition onImageAnalysis={handleImageAnalysis} />
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  💻 Code Generator & Math Solver
                </h3>
                <p className="text-gray-600">
                  Generate working code, solve programming problems, and get step-by-step math solutions.
                </p>
              </div>
              <CodeGenerator onCodeGenerated={handleCodeGenerated} />
            </div>
          )}

          {activeTab === 'translate' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  🌍 Multi-Language Translator
                </h3>
                <p className="text-gray-600">
                  Translate educational content to Hindi, Gujarati, Marathi, and many more Indian languages.
                </p>
              </div>
              <LanguageTranslator onTranslation={handleTranslation} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Settings size={16} />
              <span className="text-sm">Advanced AI powered by LuckyChat</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Reset all states and close
                  setActiveTab('voice')
                  setIsListening(false)
                  onClose()
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 