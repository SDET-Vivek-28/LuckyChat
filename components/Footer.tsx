import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border-t border-gray-200 py-4 px-4 text-center"
    >
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <Heart className="w-4 h-4 text-paw-500" />
        <span>Made with love by</span>
        <Sparkles className="w-4 h-4 text-lucky-500" />
        <span className="font-semibold text-lucky-600">Appvik</span>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        LuckyChat - A tribute to a beloved companion
      </div>
    </motion.footer>
  )
} 