/**
 * User Store - Zustand State Management
 * Copyright © 2024 Appvik. All rights reserved.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  apiKey?: string
  useAppService: boolean
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  signIn: (userData: User) => void
  signOut: () => void
  getCurrentApiKey: () => string | undefined
  updateApiKey: (apiKey: string) => void
  toggleServiceType: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      signIn: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      signOut: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      getCurrentApiKey: () => get().user?.apiKey,
      updateApiKey: (apiKey: string) => set(state => ({
        user: state.user ? { ...state.user, apiKey } : null
      })),
      toggleServiceType: () => set(state => ({
        user: state.user ? { ...state.user, useAppService: !state.user.useAppService } : null
      }))
    }),
    {
      name: 'lucky-user-storage'
    }
  )
) 