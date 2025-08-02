import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Message {
  id: number
  text: string
  sender: 'user' | 'lucky'
  timestamp: Date
}

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
  updateMessage: (id: number, text: string) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () =>
        set(() => ({
          messages: [],
        })),
      updateMessage: (id: number, text: string) =>
        set((state) => ({
          messages: state.messages.map(msg => 
            msg.id === id ? { ...msg, text } : msg
          ),
        })),
    }),
    {
      name: 'lucky-chat-messages',
    }
  )
) 