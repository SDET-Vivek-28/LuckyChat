'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Key, Mail, Lock, Sparkles, Zap } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSignIn: (userData: UserData) => void
}

interface UserData {
  name: string
  email: string
  apiKey?: string
  useAppService: boolean
}

export default function AuthModal({ isOpen, onClose, onSignIn }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [useAppService, setUseAppService] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    apiKey: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    // Only validate API key if user wants to use their own
    if (!useAppService) {
      if (!formData.apiKey.trim()) {
        newErrors.apiKey = 'OpenAI API Key is required'
      } else if (!formData.apiKey.startsWith('sk-')) {
        newErrors.apiKey = 'Please enter a valid OpenAI API key (starts with sk-)'
      }
    }
    
    if (isSignUp) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Submit user data
    onSignIn({
      name: formData.name,
      email: formData.email,
      apiKey: useAppService ? undefined : formData.apiKey,
      useAppService
    })
    
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-lucky-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {isSignUp ? 'Join LuckyChat' : 'Welcome Back'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose your AI service:
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="serviceType"
                    checked={useAppService}
                    onChange={() => setUseAppService(true)}
                    className="text-lucky-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-lucky-500" />
                    <div>
                      <div className="font-medium text-gray-800">Use App Service (Recommended)</div>
                      <div className="text-sm text-gray-500">Free AI service provided by LuckyChat - no setup required!</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="serviceType"
                    checked={!useAppService}
                    onChange={() => setUseAppService(false)}
                    className="text-lucky-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-lucky-500" />
                    <div>
                      <div className="font-medium text-gray-800">Use My Own API Key</div>
                      <div className="text-sm text-gray-500">Use your own OpenAI API key for unlimited usage</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* API Key (Only if user chooses their own key) */}
              {!useAppService && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={formData.apiKey}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 ${
                        errors.apiKey ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="sk-..."
                    />
                  </div>
                  {errors.apiKey && (
                    <p className="text-red-500 text-sm mt-1">{errors.apiKey}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Get your API key from{' '}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lucky-600 hover:underline"
                    >
                      OpenAI Platform
                    </a>
                  </p>
                </div>
              )}

              {/* Password (Sign Up Only) */}
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-lucky-500 text-white py-2 px-4 rounded-lg hover:bg-lucky-600 transition-colors font-medium"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-lucky-600 hover:text-lucky-700 text-sm"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Info */}
            <div className="mt-4 p-3 bg-lucky-50 rounded-lg">
              <p className="text-xs text-lucky-700">
                {useAppService 
                  ? "🎉 Free AI service provided by LuckyChat - no API key needed! Start chatting immediately!"
                  : "🔒 Your API key is stored locally and never shared. Each user uses their own OpenAI quota for unlimited usage."
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 