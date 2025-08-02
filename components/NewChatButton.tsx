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
      className="w-full flex items-center justify-center space-x-2 bg-lucky-500 text-white py-3 px-4 rounded-lg hover:bg-lucky-600 transition-colors font-medium"
    >
      <Plus className="w-4 h-4" />
      <span>New Chat</span>
    </motion.button>
  )
} 