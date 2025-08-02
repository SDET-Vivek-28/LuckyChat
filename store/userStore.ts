import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  apiKey?: string // Optional - for users who want to use their own key
  useAppService: boolean // Whether to use app's AI service or user's own key
  isAuthenticated: boolean
}

interface UserStore {
  user: User | null
  signIn: (userData: { name: string; email: string; apiKey?: string; useAppService?: boolean }) => void
  signOut: () => void
  updateApiKey: (apiKey: string) => void
  toggleServiceType: () => void
  isAuthenticated: () => boolean
  getCurrentApiKey: () => string | null
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      
      signIn: (userData) => {
        const user: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          apiKey: userData.apiKey,
          useAppService: userData.useAppService ?? true, // Default to app service
          isAuthenticated: true,
        }
        set({ user })
      },
      
      signOut: () => {
        set({ user: null })
      },
      
      updateApiKey: (apiKey: string) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              apiKey,
            },
          })
        }
      },
      
      toggleServiceType: () => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              useAppService: !currentUser.useAppService,
            },
          })
        }
      },
      
      isAuthenticated: () => {
        return get().user?.isAuthenticated || false
      },
      
      getCurrentApiKey: () => {
        const user = get().user
        if (!user) return null
        
        // If user wants to use app service, return null (will use global key)
        if (user.useAppService) return null
        
        // If user wants to use their own key, return their key
        return user.apiKey || null
      },
    }),
    {
      name: 'lucky-chat-user',
    }
  )
) 