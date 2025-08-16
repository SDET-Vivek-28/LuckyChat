'use client'

import { motion } from 'framer-motion'
import { Plus, MessageSquare } from 'lucide-react'

interface NewChatButtonProps {
  onNewChat: () => void
}

export default function NewChatButton({ onNewChat }: NewChatButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onNewChat}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium"
    >
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">New Chat</span>
      <span className="sm:hidden">New</span>
    </motion.button>
  )
} 