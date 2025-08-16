'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Zap, BookOpen, Plus, PawPrint, GraduationCap, Shield } from 'lucide-react'
import { useUserStore } from '@/store/userStore'

interface AISettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function AISettings({ isOpen, onClose }: AISettingsProps) {
  const { user, hasAdminAccess } = useUserStore()
  const [knowledge, setKnowledge] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddKnowledge = async () => {
    if (!knowledge.trim()) return
    
    setIsLoading(true)
    try {
      // In a real app, this would send to your AI service
      console.log('Adding knowledge:', knowledge)
      setKnowledge('')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Failed to add knowledge:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isAdmin = hasAdminAccess()

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-lucky-100 rounded-xl">
                  <Brain className="w-6 h-6 text-lucky-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Settings</h2>
                  <p className="text-gray-600">Configure your AI assistant</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* AI Model Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model</h3>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 p-4 border-2 border-lucky-200 rounded-xl cursor-pointer hover:border-lucky-300 transition-colors">
                  <input
                    type="radio"
                    name="aiModel"
                    value="custom"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-lucky-600 border-gray-300 focus:ring-lucky-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-5 h-5 text-lucky-600" />
                      <span className="font-semibold text-gray-900">Custom AI (Recommended)</span>
                    </div>
                    <p className="text-gray-600 text-sm">Our own intelligent system - no external dependencies!</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
                  <input
                    type="radio"
                    name="aiModel"
                    value="external"
                    className="mt-1 w-4 h-4 text-gray-400 border-gray-300 focus:ring-gray-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-500">External APIs</span>
                    </div>
                    <p className="text-gray-500 text-sm">Use OpenAI or other external AI services</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom AI Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom AI Features</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-lucky-600" />
                  <span className="text-gray-700">Pattern matching and intent recognition</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Zap className="w-5 h-5 text-lucky-600" />
                  <span className="text-gray-700">Mathematical calculations</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Plus className="w-5 h-5 text-lucky-600" />
                  <span className="text-gray-700">Expandable knowledge base</span>
                </div>
              </div>
            </div>

            {/* Admin-Only Knowledge Sections */}
            {isAdmin ? (
              <>
                {/* Veterinary Knowledge Base */}
                <div className="mb-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <PawPrint className="w-6 h-6 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-900">Veterinary Knowledge Base</h3>
                  </div>
                  <p className="text-orange-800 mb-4">
                    LuckyChat now includes comprehensive veterinary information covering:
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-orange-700">
                    <div>
                      <ul className="space-y-1">
                        <li>• Emergency pet care</li>
                        <li>• Preventive medicine</li>
                        <li>• Veterinary procedures</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1">
                        <li>• Common pet symptoms</li>
                        <li>• Pet nutrition & behavior</li>
                        <li>• Pet life stage care</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-orange-800 text-sm mt-4">
                    Ask Lucky about any pet health topic - from basic care to emergency situations!
                  </p>
                </div>

                {/* Comprehensive Educational Knowledge */}
                <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">Comprehensive Educational Knowledge</h3>
                  </div>
                  <p className="text-blue-800 mb-4">
                    LuckyChat now includes complete educational content from 1st to 12th standard:
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                      <ul className="space-y-1">
                        <li>• Mathematics (Arithmetic to Calculus)</li>
                        <li>• History (Ancient to Modern)</li>
                        <li>• Social Studies & Geography</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1">
                        <li>• Science (Physics, Chemistry, Biology)</li>
                        <li>• English Language Arts</li>
                        <li>• Study Skills & Test Prep</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-blue-800 text-sm mt-4">
                    Students can ask Lucky about any subject - from basic concepts to advanced topics!
                  </p>
                </div>
              </>
            ) : (
              /* Regular User Message */
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-700">Admin Access Required</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Advanced knowledge management features are available to administrators only. 
                  Contact your admin to access veterinary and educational knowledge base features.
                </p>
              </div>
            )}

            {/* Add Knowledge Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Knowledge</h3>
                <button className="text-lucky-600 hover:text-lucky-700 text-sm font-medium">
                  + Add Knowledge
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  rows={5}
                  value={knowledge}
                  onChange={(e) => setKnowledge(e.target.value)}
                  placeholder="Add new information to Lucky's knowledge base..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lucky-500 focus:border-transparent text-base resize-none"
                />
                <button
                  onClick={handleAddKnowledge}
                  disabled={isLoading || !knowledge.trim()}
                  className="w-full py-3 px-6 bg-lucky-600 text-white font-semibold rounded-xl hover:bg-lucky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
                >
                  {isLoading ? 'Adding...' : 'Add to Knowledge Base'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 