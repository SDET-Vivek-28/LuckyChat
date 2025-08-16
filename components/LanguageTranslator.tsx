'use client'

import React, { useState } from 'react'
import { Languages, Globe, Volume2, Copy, Download, BookOpen, MessageSquare } from 'lucide-react'

interface LanguageTranslatorProps {
  onTranslation: (originalText: string, translatedText: string, targetLanguage: string) => void
}

export default function LanguageTranslator({ onTranslation }: LanguageTranslatorProps) {
  const [originalText, setOriginalText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('hindi')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [showExamples, setShowExamples] = useState(false)

  const supportedLanguages = [
    { value: 'hindi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { value: 'english', label: 'English', native: 'English', flag: '🇺🇸' },
    { value: 'gujarati', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { value: 'marathi', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { value: 'tamil', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { value: 'telugu', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { value: 'bengali', label: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
    { value: 'punjabi', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { value: 'urdu', label: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { value: 'sanskrit', label: 'Sanskrit', native: 'संस्कृत', flag: '🇮🇳' }
  ]

  const educationalExamples = [
    {
      title: 'Mathematics',
      english: 'What is the formula for the area of a circle?',
      hindi: 'वृत्त का क्षेत्रफल क्या होता है?',
      subject: 'math'
    },
    {
      title: 'Science',
      english: 'Explain Newton\'s laws of motion.',
      hindi: 'न्यूटन के गति के नियमों की व्याख्या करें।',
      subject: 'science'
    },
    {
      title: 'History',
      english: 'Who was Mahatma Gandhi?',
      hindi: 'महात्मा गांधी कौन थे?',
      subject: 'history'
    },
    {
      title: 'Geography',
      english: 'What are the major rivers of India?',
      hindi: 'भारत की प्रमुख नदियां कौन सी हैं?',
      subject: 'geography'
    }
  ]

  const translateText = async () => {
    if (!originalText.trim()) return
    
    setIsTranslating(true)
    
    try {
      // Simulate AI translation (replace with actual AI service)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const translation = generateTranslation(originalText, targetLanguage)
      setTranslatedText(translation)
      
      // Call parent component
      onTranslation(originalText, translation, targetLanguage)
      
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Sorry, I encountered an error translating this text. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  const generateTranslation = (text: string, language: string): string => {
    const lowerText = text.toLowerCase()
    
    // Hindi translations
    if (language === 'hindi') {
      if (lowerText.includes('hello') || lowerText.includes('hi')) {
        return 'नमस्ते! आप कैसे हैं?'
      }
      if (lowerText.includes('how are you')) {
        return 'आप कैसे हैं? मैं ठीक हूं, धन्यवाद।'
      }
      if (lowerText.includes('thank you') || lowerText.includes('thanks')) {
        return 'धन्यवाद! आपका स्वागत है।'
      }
      if (lowerText.includes('goodbye') || lowerText.includes('bye')) {
        return 'अलविदा! फिर मिलेंगे।'
      }
      if (lowerText.includes('what is your name')) {
        return 'मेरा नाम लकीचैट है। मैं आपकी शिक्षा में मदद करने के लिए यहां हूं।'
      }
      if (lowerText.includes('help') || lowerText.includes('help me')) {
        return 'मैं आपकी कैसे मदद कर सकता हूं? मैं गणित, विज्ञान, इतिहास और अन्य विषयों में आपकी सहायता कर सकता हूं।'
      }
      if (lowerText.includes('math') || lowerText.includes('mathematics')) {
        return 'गणित एक महत्वपूर्ण विषय है! मैं आपको अंकगणित, बीजगणित, ज्यामिति और अन्य गणितीय अवधारणाओं में मदद कर सकता हूं।'
      }
      if (lowerText.includes('science')) {
        return 'विज्ञान प्रकृति के रहस्यों को समझने में मदद करता है! मैं आपको भौतिकी, रसायन विज्ञान, जीव विज्ञान और अन्य वैज्ञानिक विषयों में सहायता कर सकता हूं।'
      }
      if (lowerText.includes('history')) {
        return 'इतिहास हमें अतीत के बारे में सिखाता है! मैं आपको भारतीय इतिहास, विश्व इतिहास और महत्वपूर्ण ऐतिहासिक घटनाओं के बारे में जानकारी दे सकता हूं।'
      }
    }
    
    // Gujarati translations
    if (language === 'gujarati') {
      if (lowerText.includes('hello') || lowerText.includes('hi')) {
        return 'નમસ્તે! તમે કેમ છો?'
      }
      if (lowerText.includes('how are you')) {
        return 'તમે કેમ છો? હું બરાબર છું, આભાર।'
      }
      if (lowerText.includes('thank you') || lowerText.includes('thanks')) {
        return 'આભાર! તમારું સ્વાગત છે।'
      }
    }
    
    // Marathi translations
    if (language === 'marathi') {
      if (lowerText.includes('hello') || lowerText.includes('hi')) {
        return 'नमस्कार! तुम्ही कसे आहात?'
      }
      if (lowerText.includes('how are you')) {
        return 'तुम्ही कसे आहात? मी बरे आहे, धन्यवाद।'
      }
      if (lowerText.includes('thank you') || lowerText.includes('thanks')) {
        return 'धन्यवाद! तुमचे स्वागत आहे।'
      }
    }
    
    // Default translation (simplified)
    return `[${language.toUpperCase()} Translation]: ${text}\n\nNote: This is a simplified translation. For complex educational content, I recommend using professional translation services or consulting with language experts.`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Text copied to clipboard!'))
      .catch(() => alert('Failed to copy text'))
  }

  const downloadTranslation = () => {
    const content = `Original Text:\n${originalText}\n\nTranslated Text (${targetLanguage}):\n${translatedText}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `translation_${targetLanguage}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const speakText = (text: string, language: string) => {
    if (!window.speechSynthesis) return
    
    // Stop any current speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set language based on target
    const languageMap: { [key: string]: string } = {
      'hindi': 'hi-IN',
      'gujarati': 'gu-IN',
      'marathi': 'mr-IN',
      'tamil': 'ta-IN',
      'telugu': 'te-IN',
      'bengali': 'bn-IN',
      'punjabi': 'pa-IN',
      'urdu': 'ur-PK',
      'english': 'en-US'
    }
    
    utterance.lang = languageMap[language] || 'en-US'
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1
    
    window.speechSynthesis.speak(utterance)
  }

  const loadExample = (example: any) => {
    setOriginalText(example.english)
    setTargetLanguage('hindi')
    setTranslatedText('')
  }

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800">Language Translator</h3>
      
      {/* Language Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Target Language:</label>
        <div className="grid grid-cols-5 gap-2">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setTargetLanguage(lang.value)}
              className={`p-2 rounded-lg border transition-colors ${
                targetLanguage === lang.value
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-lg">{lang.flag}</div>
              <div className="text-xs">{lang.label}</div>
              <div className="text-xs opacity-75">{lang.native}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Text */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Enter text to translate:
        </label>
        <textarea
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          placeholder="Type or paste text here to translate..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Translate Button */}
      <button
        onClick={translateText}
        disabled={isTranslating || !originalText.trim()}
        className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isTranslating ? (
                      <>
              <MessageSquare className="animate-spin" size={20} />
              <span>Translating...</span>
            </>
        ) : (
          <>
            <Languages size={20} />
            <span>Translate to {supportedLanguages.find(l => l.value === targetLanguage)?.label}</span>
          </>
        )}
      </button>

      {/* Translation Result */}
      {translatedText && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-800">
              Translation ({supportedLanguages.find(l => l.value === targetLanguage)?.label}):
            </h4>
            <div className="flex space-x-2">
              <button
                onClick={() => speakText(translatedText, targetLanguage)}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 flex items-center space-x-1"
              >
                <Volume2 size={14} />
                <span>Speak</span>
              </button>
              <button
                onClick={() => copyToClipboard(translatedText)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center space-x-1"
              >
                <Copy size={14} />
                <span>Copy</span>
              </button>
              <button
                onClick={downloadTranslation}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 flex items-center space-x-1"
              >
                <Download size={14} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="whitespace-pre-wrap text-gray-800">{translatedText}</div>
          </div>
        </div>
      )}

      {/* Educational Examples */}
      <button
        onClick={() => setShowExamples(!showExamples)}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-800 text-sm"
      >
        <BookOpen size={16} />
        <span>{showExamples ? 'Hide' : 'Show'} Educational Examples</span>
      </button>

      {showExamples && (
        <div className="bg-white p-4 rounded-lg border space-y-3">
          <h4 className="font-medium text-gray-800">Educational Examples:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {educationalExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => loadExample(example)}
                className="p-2 text-left border rounded hover:bg-gray-50"
              >
                <div className="font-medium">{example.title}</div>
                <div className="text-gray-600 text-xs">{example.english.substring(0, 40)}...</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-500 text-center">
        Translate educational content, questions, or any text to your preferred language.
        <br />
        Perfect for students learning in their native language!
      </div>
    </div>
  )
} 