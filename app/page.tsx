/**
 * LuckyChat - Main Application Page
 * 
 * Copyright © 2024 Appvik. All rights reserved.
 * 
 * This is the main chat interface for LuckyChat, featuring:
 * - Real-time chat with our custom AI assistant
 * - User authentication and profile management
 * - Subscription tier management
 * - Responsive design with dog-themed UI
 * - Streaming AI responses for dynamic chat experience
 * 
 * PROPRIETARY SOFTWARE - DO NOT COPY, MODIFY, OR DISTRIBUTE
 * Contact: licensing@appvik.com for commercial use
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Settings, User, Crown, BarChart3, Users, Activity, MessageSquare, Plus, Sparkles } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import { useSubscriptionStore } from '@/store/subscriptionStore'
import AuthModal from '@/components/AuthModal'
import UserProfile from '@/components/UserProfile'
// import PricingModal from '@/components/PricingModal'
import AISettings from '@/components/AISettings'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import NewChatButton from '@/components/NewChatButton'
import ChatMessage from '@/components/ChatMessage'
import LuckyAvatar from '@/components/LuckyAvatar'
import AdvancedFeaturesModal from '@/components/AdvancedFeaturesModal'

/**
 * Main Home Component - LuckyChat Application
 * 
 * This component serves as the primary interface for the LuckyChat application.
 * It manages the chat interface, user authentication, subscription management,
 * and real-time communication with our custom AI assistant.
 */
export default function Home() {
  const { messages, addMessage, updateMessage, clearMessages } = useChatStore()
  const { user, isAuthenticated, signIn, signOut, hasAdminAccess } = useUserStore()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showAISettings, setShowAISettings] = useState(false)
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false)
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  /**
   * Auto-scroll to bottom of chat when new messages arrive
   * Provides smooth user experience during conversations
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Effect to scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  /**
   * Handle sending messages to our custom AI assistant
   * 
   * This function:
   * 1. Validates user input and subscription limits
   * 2. Creates user message and adds to chat
   * 3. Creates placeholder for AI response
   * 4. Streams AI response in real-time
   * 5. Handles errors gracefully with fallback responses
   */
  const handleSendMessage = async () => {
    // Prevent sending empty messages or while AI is typing
    if (!input.trim() || isTyping) {
      console.log('Message blocked:', { input: input.trim(), isTyping })
      return
    }

    console.log('Sending message:', input)

    // Check if user is signed in - require sign-in for all features
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    // Create user message and add to chat
    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user' as const,
      timestamp: new Date()
    }
    addMessage(userMessage)
    
    setInput('')
    setIsTyping(true)

    // Create placeholder for Lucky's response (for streaming)
    const luckyMessageId = Date.now() + 1
    const luckyMessage = {
      id: luckyMessageId,
      text: '',
      sender: 'lucky' as const,
      timestamp: new Date()
    }
    addMessage(luckyMessage)

    try {
      // Call our custom AI service with simple response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userApiKey: user?.apiKey, // Assuming user object has an apiKey
          stream: false
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Update the placeholder message with AI response
      updateMessage(luckyMessageId, data.text || "Woof! I'm here to help!")
      
    } catch (error) {
      console.error('Error calling AI service:', error)
      // Provide friendly fallback response on error
      updateMessage(luckyMessageId, "Woof! I'm having trouble connecting right now. But don't worry, I'm still here to help!")
    } finally {
      setIsTyping(false)
    }
  }

  /**
   * Handle keyboard events for sending messages
   * Allows users to send messages with Enter key
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      console.log('Enter key pressed, calling handleSendMessage')
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lucky-100 via-paw-100 to-lucky-200">
      {/* Header Section - Navigation and User Controls */}
      <header className="bg-white shadow-sm border-b border-lucky-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* App Logo and Branding */}
          <div className="flex items-center space-x-3">
            <LuckyAvatar size="small" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">LuckyChat</h1>
              <p className="text-sm text-gray-600">Your AI Dog Assistant</p>
            </div>
          </div>
          
          {/* Header Controls - Subscription, AI Settings, User Profile */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Subscription Status Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg">
              <Crown className="w-4 h-4 text-lucky-500" />
              <span className="text-sm font-medium text-gray-700">{user?.useAppService ? 'App Service' : 'My API Key'}</span>
            </div>
            
            {/* Upgrade Button - Temporarily disabled */}
            {/* <button
              onClick={() => setShowPricingModal(true)}
              className="bg-lucky-500 text-white px-4 md:px-6 py-3 rounded-lg text-sm font-medium hover:bg-lucky-600 transition-colors"
            >
              <span className="hidden sm:inline">Upgrade</span>
              <span className="sm:hidden">↑</span>
            </button> */}
            
            {/* Usage Summary - Show basic stats */}
            <div className="hidden lg:flex items-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{user?.messageCount || 0} messages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>{user?.sessionCount || 0} sessions</span>
              </div>
            </div>
            
            {/* AI Settings Button - Opens AI configuration modal */}
            <button
              onClick={() => setShowAISettings(true)}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="AI Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Advanced Features Button - Opens advanced features modal */}
            <button
              onClick={() => setShowAdvancedFeatures(true)}
              className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Advanced Features"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            {/* Analytics Dashboard Button - Admin Only */}
            {user && hasAdminAccess() && (
              <button
                onClick={() => setShowAnalyticsDashboard(true)}
                className="flex items-center space-x-2 bg-lucky-500 hover:bg-lucky-600 px-4 py-3 rounded-lg transition-colors text-white"
                title="Analytics Dashboard (Admin Only)"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Analytics</span>
                <span className="hidden lg:inline text-xs bg-lucky-600 px-2 py-1 rounded-full">ADMIN</span>
              </button>
            )}
            
            {/* New Chat Button - Clear conversation */}
            <NewChatButton onNewChat={clearMessages} />
            
            {/* User Profile Section - Authentication and Profile Management */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={() => setShowUserProfile(true)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 md:px-6 py-3 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                </button>
                <button
                  onClick={signOut}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-lucky-500 text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-lucky-600 transition-colors"
              >
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Chat Area - Messages and Input */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages Container - Scrollable chat history */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              // Welcome Screen - Shown when no messages exist
              <div className="text-center py-12">
                <div className="mx-auto mb-4">
                  <LuckyAvatar size="large" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to LuckyChat!</h2>
                <p className="text-gray-600 mb-6">
                  I'm Lucky, your friendly AI dog assistant. Ask me anything!
                </p>
                {!isAuthenticated && (
                  <div className="bg-lucky-50 border border-lucky-200 rounded-lg p-4">
                    <p className="text-sm text-lucky-700 mb-2">
                      🚀 <strong>Get Started:</strong> Sign in to start chatting with Lucky! All features are completely FREE!
                    </p>
                    <p className="text-xs text-lucky-600 mb-3">
                      ✅ Unlimited AI conversations • ✅ All features included • ✅ No credit card required
                    </p>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="bg-lucky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-lucky-600 transition-colors"
                    >
                      Sign In & Start Chatting
                    </button>
                  </div>
                )}
                {isAuthenticated && hasAdminAccess() ? (
                  <>
                    <div className="bg-lucky-50 border border-lucky-200 rounded-lg p-4">
                      <p className="text-sm text-lucky-700 mb-2">
                        🐾 <strong>New Feature:</strong> Comprehensive Veterinary Knowledge Base!
                      </p>
                      <p className="text-xs text-lucky-600 mb-3">
                        Ask Lucky about pet health, emergency care, symptoms, nutrition, behavior, and more!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-lucky-600">
                        <div>• Emergency pet care guidance</div>
                        <div>• Common symptoms & treatments</div>
                        <div>• Preventive medicine advice</div>
                        <div>• Pet nutrition & training tips</div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-700 mb-2">
                        📚 <strong>New Feature:</strong> Complete Educational Knowledge Base!
                      </p>
                      <p className="text-xs text-blue-600 mb-3">
                        Ask Lucky about any subject from 1st to 12th standard - math, science, history, English, and more!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-600">
                        <div>• Mathematics (Arithmetic to Calculus)</div>
                        <div>• Science (Physics, Chemistry, Biology)</div>
                        <div>• History (Ancient to Modern)</div>
                        <div>• English & Social Studies</div>
                      </div>
                      <p className="text-xs text-blue-500 mt-3">
                        Perfect for homework help, test preparation, and cross-subject learning!
                      </p>
                    </div>
                  </>
                ) : isAuthenticated ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      🔒 <strong>Welcome to LuckyChat!</strong>
                    </p>
                    <p className="text-xs text-gray-600 mb-3">
                      Your AI dog assistant is ready to help! Ask Lucky about anything - from general knowledge to 
                      specific questions. For advanced features, contact your administrator.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              // Display chat messages with smooth animations
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            
            {/* Typing Indicator - Shows when AI is responding */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <LuckyAvatar size="small" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-lucky-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-lucky-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-lucky-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Message composition and sending */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              {/* Text Input - Auto-expanding textarea */}
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Lucky anything..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-lucky-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              {/* Send Button - Triggers message sending */}
              <button
                onClick={() => {
                  console.log('Send button clicked')
                  handleSendMessage()
                }}
                disabled={!input.trim() || isTyping}
                className="bg-lucky-500 text-white p-3 rounded-lg hover:bg-lucky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Usage Information - Shows message limits and upgrade options */}
            <div className="mt-2 text-xs text-gray-500 text-center">
              <span>
                {messages.length} messages used • Powered by LuckyChat Custom AI
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Components - Authentication, Profile, Pricing, AI Settings */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
      <UserProfile isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
      {/* <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} /> */}
      <AISettings isOpen={showAISettings} onClose={() => setShowAISettings(false)} />
      <AnalyticsDashboard isOpen={showAnalyticsDashboard} onClose={() => setShowAnalyticsDashboard(false)} />
      <AdvancedFeaturesModal 
        isOpen={showAdvancedFeatures} 
        onClose={() => setShowAdvancedFeatures(false)}
        onVoiceInput={(text) => {
          setInput(text)
          setShowAdvancedFeatures(false)
        }}
        onImageAnalysis={(imageFile, description) => {
          // Handle image analysis - could send to AI for processing
          console.log('Image analysis:', { imageFile, description })
        }}
        onCodeGenerated={(code, language, explanation) => {
          // Handle code generation - could send to chat
          console.log('Code generated:', { code, language, explanation })
        }}
        onTranslation={(originalText, translatedText, targetLanguage) => {
          // Handle translation - could send to chat
          console.log('Translation:', { originalText, translatedText, targetLanguage })
        }}
      />
    </div>
  )
} 