import { motion } from 'framer-motion'
import { format } from 'date-fns'
import LuckyAvatar from './LuckyAvatar'

interface Message {
  id: number
  text: string
  sender: 'user' | 'lucky'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-xs md:max-w-md lg:max-w-lg`}>
        {!isUser && <LuckyAvatar size="small" />}
        
        <div className={`chat-bubble ${isUser ? 'user-bubble' : 'lucky-bubble'}`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className={`text-xs mt-1 ${isUser ? 'text-lucky-100' : 'text-gray-500'}`}>
            {format(message.timestamp, 'HH:mm')}
          </p>
        </div>
      </div>
    </motion.div>
  )
} 