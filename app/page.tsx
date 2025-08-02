'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Settings, Plus, Crown } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import { useSubscriptionStore } from '@/store/subscriptionStore'
import ChatMessage from '@/components/ChatMessage'
import LuckyAvatar from '@/components/LuckyAvatar'
import AuthModal from '@/components/AuthModal'
import UserProfile from '@/components/UserProfile'
import NewChatButton from '@/components/NewChatButton'
import PricingModal from '@/components/PricingModal'

export default function Home() {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, addMessage, clearMessages, updateMessage } = useChatStore()
  const { user, signOut, isAuthenticated, getCurrentApiKey } = useUserStore()
  const { canSendMessage, incrementMessageCount, getCurrentPlan } = useSubscriptionStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return

    // Check subscription limits
    if (!canSendMessage()) {
      setShowPricingModal(true)
      return
    }

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    }

    addMessage(userMessage)
    incrementMessageCount()
    setInput('')
    setIsTyping(true)

    // Create placeholder for Lucky's response
    const luckyMessageId = Date.now() + 1
    const luckyMessage = {
      id: luckyMessageId,
      text: '',
      sender: 'lucky' as const,
      timestamp: new Date()
    }
    addMessage(luckyMessage)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userApiKey: getCurrentApiKey(),
          stream: true
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                setIsTyping(false)
                return
              }

              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  const currentMessage = messages.find(msg => msg.id === luckyMessageId)
                  if (currentMessage) {
                    updateMessage(luckyMessageId, currentMessage.text + parsed.text)
                  }
                }
              } catch (e) {
                console.error('Error parsing stream data:', e)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error calling AI service:', error)
      updateMessage(luckyMessageId, "Woof! I'm having trouble connecting right now. But don't worry, I'm still here to help!")
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const currentPlan = getCurrentPlan()

  return (
    <div className="min-h-screen bg-gradient-to-br from-lucky-100 via-paw-100 to-lucky-200">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lucky-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
              <LuckyAvatar size="small" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">LuckyChat</h1>
                <p className="text-sm text-gray-600">Your AI Dog Assistant</p>
              </div>
            </div>
          
          <div className="flex items-center space-x-2">
            {/* Subscription Status */}
            <div className="flex items-center space-x-2">
              <Crown className="w-4 h-4 text-lucky-500" />
              <span className="text-sm font-medium text-gray-700">{currentPlan.name}</span>
            </div>
            
            {/* Upgrade Button */}
            <button
              onClick={() => setShowPricingModal(true)}
              className="bg-lucky-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-lucky-600 transition-colors"
            >
              Upgrade
            </button>
            
            {/* New Chat Button */}
            <NewChatButton onNewChat={clearMessages} />
            
            {/* User Profile */}
            {isAuthenticated() ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowUserProfile(true)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                <button
                  onClick={signOut}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-lucky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-lucky-600 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages Container */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
                           <div className="text-center py-12">
               <div className="mx-auto mb-4">
                 <LuckyAvatar size="large" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to LuckyChat!</h2>
                <p className="text-gray-600 mb-6">
                  I'm Lucky, your friendly AI dog assistant. Ask me anything!
                </p>
                {!isAuthenticated() && (
                  <div className="bg-lucky-50 border border-lucky-200 rounded-lg p-4">
                    <p className="text-sm text-lucky-700 mb-2">
                      💡 <strong>Pro Tip:</strong> Sign in to save your conversations and use your own API key!
                    </p>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="bg-lucky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-lucky-600 transition-colors"
                    >
                      Sign In Now
                    </button>
                  </div>
                )}
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            
            {/* Typing Indicator */}
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
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
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
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-lucky-500 text-white p-3 rounded-lg hover:bg-lucky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Usage Info */}
            <div className="mt-2 text-xs text-gray-500 text-center">
              {currentPlan.name === 'Free' ? (
                <span>
                  {messages.length}/50 messages used • 
                  <button 
                    onClick={() => setShowPricingModal(true)}
                    className="text-lucky-500 hover:text-lucky-600 ml-1"
                  >
                    Upgrade for more
                  </button>
                </span>
              ) : (
                <span>
                  {messages.length}/{currentPlan.messagesPerMonth} messages used
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

             {/* Modals */}
       <AuthModal 
         isOpen={showAuthModal} 
         onClose={() => setShowAuthModal(false)}
         onSignIn={(userData) => {
           // Handle sign in - this will be handled by the store
           console.log('User signed in:', userData)
         }}
       />
       <UserProfile isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
       <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} />
    </div>
  )
} 