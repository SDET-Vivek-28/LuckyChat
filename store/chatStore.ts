/**
 * Chat Store - Zustand State Management
 * Copyright © 2024 Appvik. All rights reserved.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: number
  text: string
  sender: 'user' | 'lucky'
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
  updateMessage: (id: number, text: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] }),
      updateMessage: (id, text) => set((state) => ({
        messages: state.messages.map(msg => 
          msg.id === id ? { ...msg, text } : msg
        )
      }))
    }),
    {
      name: 'lucky-chat-storage'
    }
  )
) 