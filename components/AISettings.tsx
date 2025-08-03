'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Zap, Plus, BookOpen, Settings } from 'lucide-react'
import { AIService } from '@/lib/ai-service'

interface AISettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function AISettings({ isOpen, onClose }: AISettingsProps) {
  const [useCustomAI, setUseCustomAI] = useState(true)
  const [newKnowledgeKey, setNewKnowledgeKey] = useState('')
  const [newKnowledgeValue, setNewKnowledgeValue] = useState('')
  const [showAddKnowledge, setShowAddKnowledge] = useState(false)

  const aiService = AIService.getInstance()

  const handleToggleAI = () => {
    const newValue = !useCustomAI
    setUseCustomAI(newValue)
    aiService.setUseCustomAI(newValue)
  }

  const handleAddKnowledge = () => {
    if (newKnowledgeKey.trim() && newKnowledgeValue.trim()) {
      aiService.addKnowledge(newKnowledgeKey.trim(), newKnowledgeValue.trim())
      setNewKnowledgeKey('')
      setNewKnowledgeValue('')
      setShowAddKnowledge(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">AI Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* AI Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose AI Type:
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="aiType"
                  checked={useCustomAI}
                  onChange={handleToggleAI}
                  className="text-lucky-500"
                />
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-lucky-500" />
                  <div>
                    <div className="font-medium text-gray-800">Custom AI (Recommended)</div>
                    <div className="text-sm text-gray-500">Our own intelligent system - no external dependencies!</div>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="aiType"
                  checked={!useCustomAI}
                  onChange={handleToggleAI}
                  className="text-lucky-500"
                />
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-lucky-500" />
                  <div>
                    <div className="font-medium text-gray-800">External APIs</div>
                    <div className="text-sm text-gray-500">Use OpenAI or other external AI services</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Custom AI Features */}
          {useCustomAI && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Custom AI Features</h3>
                <button
                  onClick={() => setShowAddKnowledge(!showAddKnowledge)}
                  className="flex items-center space-x-1 text-lucky-600 hover:text-lucky-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Knowledge</span>
                </button>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-lucky-500" />
                  <span>Pattern matching and intent recognition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-lucky-500" />
                  <span>Mathematical calculations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-lucky-500" />
                  <span>Expandable knowledge base</span>
                </div>
              </div>

              {/* Add Knowledge Form */}
              <AnimatePresence>
                {showAddKnowledge && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Topic/Keyword
                        </label>
                        <input
                          type="text"
                          value={newKnowledgeKey}
                          onChange={(e) => setNewKnowledgeKey(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lucky-500"
                          placeholder="e.g., python, cooking, travel"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Information
                        </label>
                        <textarea
                          value={newKnowledgeValue}
                          onChange={(e) => setNewKnowledgeValue(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lucky-500"
                          rows={3}
                          placeholder="Add information about this topic..."
                        />
                      </div>
                      <button
                        onClick={handleAddKnowledge}
                        className="w-full bg-lucky-500 text-white py-2 px-4 rounded-lg hover:bg-lucky-600 transition-colors text-sm font-medium"
                      >
                        Add to Knowledge Base
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Info */}
          <div className="mt-6 p-3 bg-lucky-50 rounded-lg">
            <p className="text-xs text-lucky-700">
              {useCustomAI 
                ? "🎉 Our Custom AI is completely free and runs locally! No API keys needed!"
                : "🔌 External APIs require API keys and may have usage limits."
              }
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 