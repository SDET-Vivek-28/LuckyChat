'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Key, Mail, Edit, Save, X, Sparkles, Zap, ToggleLeft, Phone, Crown, Shield } from 'lucide-react'
import { useUserStore } from '@/store/userStore'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, updateApiKey, toggleServiceType } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [newApiKey, setNewApiKey] = useState(user?.apiKey || '')
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!newApiKey.trim()) {
      setError('API key is required')
      return
    }
    
    if (!newApiKey.startsWith('sk-')) {
      setError('Please enter a valid OpenAI API key (starts with sk-)')
      return
    }

    updateApiKey(newApiKey)
    setIsEditing(false)
    setError('')
  }

  const handleCancel = () => {
    setNewApiKey(user?.apiKey || '')
    setIsEditing(false)
    setError('')
  }

  if (!isOpen) return null

  return (
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
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-800 text-base">{user?.name}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-800 text-base">{user?.email}</span>
            </div>
          </div>

          {user?.mobile && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-800 text-base">{user.mobile}</span>
              </div>
            </div>
          )}

          {/* User Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              {user?.role === 'owner' ? (
                <Crown className="w-5 h-5 text-yellow-500" />
              ) : user?.role === 'admin' ? (
                <Shield className="w-5 h-5 text-red-500" />
              ) : (
                <User className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-gray-800 text-base capitalize">
                {user?.role === 'owner' ? 'Owner' : user?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
              {user?.role === 'owner' && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  FULL ACCESS
                </span>
              )}
              {user?.role === 'admin' && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  ADMIN ACCESS
                </span>
              )}
            </div>
          </div>

          {/* Service Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              AI Service Type
            </label>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {user?.useAppService ? (
                  <>
                    <Sparkles className="w-5 h-5 text-lucky-500" />
                    <span className="text-gray-800 text-base">App Service (Free)</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-lucky-500" />
                    <span className="text-gray-800 text-base">My API Key</span>
                  </>
                )}
              </div>
              <button
                onClick={toggleServiceType}
                className="flex items-center space-x-2 text-lucky-600 hover:text-lucky-700 text-sm"
              >
                <ToggleLeft className="w-4 h-4" />
                <span>Switch</span>
              </button>
            </div>
          </div>

          {/* API Key (Only show if using own key) */}
          {!user?.useAppService && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  OpenAI API Key
                </label>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-lucky-600 hover:text-lucky-700 text-sm flex items-center space-x-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={newApiKey}
                      onChange={(e) => setNewApiKey(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lucky-500 text-base"
                      placeholder="sk-..."
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-lucky-500 text-white py-3 px-4 rounded-lg hover:bg-lucky-600 transition-colors text-sm font-medium"
                    >
                      <Save className="w-4 h-4 inline mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Key className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-800 text-base">
                    {user?.apiKey ? '••••••••••••••••' : 'Not set'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 p-3 bg-lucky-50 rounded-lg">
          <p className="text-xs text-lucky-700">
            {user?.useAppService 
              ? "🎉 You're using the free app service provided by LuckyChat!"
              : "🔒 Your API key is stored locally and never shared. Each user uses their own OpenAI quota."
            }
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
} 