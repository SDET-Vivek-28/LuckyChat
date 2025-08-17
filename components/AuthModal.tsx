'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Key, Mail, Lock, Sparkles, Zap, Phone } from 'lucide-react'
import { useUserStore } from '@/store/userStore'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn } = useUserStore()
  const [isSignUp, setIsSignUp] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'mobile'>('email')
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setErrors({})

    try {
    // Validation
    const newErrors: Record<string, string> = {}
    
      if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
      if (verificationMethod === 'email') {
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
      } else {
        if (!formData.mobile.trim()) {
          newErrors.mobile = 'Mobile number is required'
        } else if (!/^\d{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number'
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
        setIsLoading(false)
        return
      }

      // If mobile verification, show OTP input first
      if (verificationMethod === 'mobile' && !showOTP) {
        await handleSendOTP()
        return
      }

      // If OTP is required, validate it
      if (verificationMethod === 'mobile' && !otp) {
        setErrors({ otp: 'Please enter the OTP sent to your mobile' })
        setIsLoading(false)
        return
      }

      // Validate OTP if using email verification
      if (verificationMethod === 'email' && !otp) {
        setErrors({ otp: 'Please enter the OTP sent to your email' })
        setIsLoading(false)
        return
      }

      // Verify OTP using Supabase API
      if (otp) {
        try {
          const otpResponse = await fetch('/api/otp/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: verificationMethod === 'mobile' ? 'sms' : 'email',
              identifier: verificationMethod === 'mobile' ? formData.mobile : formData.email,
              otp: otp
            })
          })

          const otpResult = await otpResponse.json()

          if (!otpResult.success) {
            setError(otpResult.error || 'Invalid OTP. Please try again.')
            setIsLoading(false)
            return
          }
        } catch (err) {
          console.error('OTP verification error:', err)
          setError('Failed to verify OTP. Please try again.')
          setIsLoading(false)
          return
        }
      }

      // Determine user role based on email
      let userRole: 'user' | 'admin' | 'owner' = 'user'
      if (formData.email.includes('admin@appvik.com')) {
        userRole = 'admin'
      } else if (formData.email.includes('owner@appvik.com')) {
        userRole = 'owner'
      } else if (formData.email.includes('vivek') || formData.email.includes('vivek28')) {
        userRole = 'admin' // Give vivek admin access
      }

      if (isSignUp) {
        // Create user data object matching the store interface
        const userData = {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          apiKey: undefined, // No external API key for now
          useAppService: true // Always use app service for now
        }
        await signIn(userData) // Use signIn for both signup and signin
      } else {
        // For sign in, we need to create a minimal user data object
        const userData = {
          name: formData.email.split('@')[0], // Use email prefix as name for sign in
          email: formData.email,
          mobile: formData.mobile,
          apiKey: undefined, // No external API key for now
          useAppService: true // Always use app service for now
        }
        await signIn(userData)
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOTP = async () => {
    if (!formData.mobile.trim()) {
      setErrors({ mobile: 'Please enter a mobile number first' })
      return
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setErrors({ mobile: 'Please enter a valid 10-digit mobile number' })
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sms',
          identifier: formData.mobile
        })
      })

      const result = await response.json()

      if (result.success) {
        setOtpSent(true)
        setShowOTP(true)
        setCountdown(60) // 60 second countdown
        
        // Show success message
        setError(`✅ ${result.message}`)
        
        // In development, show the OTP for testing
        if (result.otp) {
          setError(`✅ ${result.message} (Test OTP: ${result.otp})`)
        }
      } else {
        setError(result.error || 'Failed to send OTP. Please try again.')
      }
    } catch (err) {
      console.error('OTP Send Error:', err)
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmailOTP = async () => {
    if (!formData.email.trim()) {
      setErrors({ email: 'Please enter an email address first' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' })
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'email',
          identifier: formData.email
        })
      })

      const result = await response.json()

      if (result.success) {
        setOtpSent(true)
        setShowOTP(true)
        setCountdown(60) // 60 second countdown
        
        // Show success message
        setError(`✅ ${result.message}`)
        
        // In development, show the OTP for testing
        if (result.otp) {
          setError(`✅ ${result.message} (Test OTP: ${result.otp})`)
        }
      } else {
        setError(result.error || 'Failed to send email OTP. Please try again.')
      }
    } catch (err) {
      console.error('Email OTP Send Error:', err)
      setError('Failed to send email OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = () => {
    if (countdown === 0) {
      handleSendOTP()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleVerificationMethodChange = (method: 'email' | 'mobile') => {
    setVerificationMethod(method)
    setShowOTP(false)
    setOtp('')
    setOtpSent(false)
    setCountdown(0)
    setErrors({})
    setError('')
  }

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = otp.split('')
    newOtp[index] = value
    setOtp(newOtp.join(''))
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement
      if (prevInput) prevInput.focus()
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
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl"
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

            {/* Service Type Selection - Only Custom AI */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                AI Service Type:
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border-2 border-lucky-200 rounded-lg cursor-pointer bg-lucky-50">
                  <input
                    type="radio"
                    name="serviceType"
                    checked={true}
                    disabled
                    className="text-lucky-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-lucky-500" />
                    <div>
                      <div className="font-medium text-gray-800">Custom AI Service (Active)</div>
                      <div className="text-sm text-gray-500">Our own intelligent system - no API keys needed!</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 text-base ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Email/Mobile */}
              <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email/Mobile
                  </label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => handleVerificationMethodChange('email')}
                      className={`flex-1 py-3 px-4 border rounded-lg text-base font-medium transition-colors ${
                        verificationMethod === 'email'
                          ? 'bg-lucky-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                  Email
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVerificationMethodChange('mobile')}
                      className={`flex-1 py-3 px-4 border rounded-lg text-base font-medium transition-colors ${
                        verificationMethod === 'mobile'
                          ? 'bg-lucky-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    >
                      Mobile
                    </button>
                  </div>
                </div>

                {showOTP ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <div className="space-y-3">
                      <div className="flex space-x-2 justify-center">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otp[index] || ''}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 focus:border-transparent text-lg font-semibold"
                            placeholder="•"
                          />
                        ))}
                      </div>
                      {errors.otp && (
                        <p className="text-red-500 text-sm text-center">{errors.otp}</p>
                      )}
                      <p className="text-xs text-gray-500 text-center">
                        OTP sent to {verificationMethod === 'email' ? formData.email : formData.mobile}
                      </p>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={countdown > 0}
                          className={`text-sm ${
                            countdown > 0 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-lucky-600 hover:text-lucky-700'
                          }`}
                        >
                          {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                        </button>
                      </div>
                    </div>
              </div>
                ) : (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {verificationMethod === 'email' ? 'Email' : 'Mobile'}
                  </label>
                  <div className="relative">
                      {verificationMethod === 'email' ? (
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      ) : (
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      )}
                    <input
                        type="text"
                        value={formData[verificationMethod]}
                        onChange={(e) => handleInputChange(verificationMethod, e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 text-base ${
                          errors[verificationMethod] ? 'border-red-500' : 'border-gray-300'
                      }`}
                        placeholder={verificationMethod === 'email' ? 'your@email.com' : '1234567890'}
                      />
                    </div>
                    {errors[verificationMethod] && (
                      <p className="text-red-500 text-sm mt-2">{errors[verificationMethod]}</p>
                    )}
                  </div>
                )}
                </div>

              {/* Password (Sign Up Only) */}
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 text-base ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 text-base ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-lucky-500 text-white py-3 px-6 rounded-lg hover:bg-lucky-600 transition-colors font-medium text-base"
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
                🎉 Free AI service provided by LuckyChat - no API key needed! Start chatting immediately!
              </p>
              {verificationMethod === 'mobile' && (
                <p className="text-xs text-green-600 mt-2">
                  📱 <strong>Real OTP:</strong> OTP will be sent to your mobile number
                </p>
              )}
              {verificationMethod === 'email' && (
                <p className="text-xs text-green-600 mt-2">
                  📧 <strong>Real OTP:</strong> OTP will be sent to your email address
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 