import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'

interface LuckyAvatarProps {
  size?: 'small' | 'medium' | 'large'
}

export default function LuckyAvatar({ size = 'medium' }: LuckyAvatarProps) {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-lg',
    large: 'w-16 h-16 text-2xl'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`lucky-avatar ${sizeClasses[size]} flex items-center justify-center`}
    >
      <PawPrint className="w-1/2 h-1/2" />
    </motion.div>
  )
} 