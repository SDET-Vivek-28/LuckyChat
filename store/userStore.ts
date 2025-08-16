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
  mobile?: string
  apiKey?: string
  useAppService: boolean
  createdAt: Date
  lastActive: Date
  messageCount: number
  sessionCount: number
  role: 'user' | 'admin' | 'owner'
}

interface UserAnalytics {
  totalUsers: number
  activeUsers: number
  totalMessages: number
  totalSessions: number
  averageMessagesPerUser: number
  averageSessionsPerUser: number
  topUsers: Array<{ name: string; messageCount: number; lastActive: Date }>
  dailyActiveUsers: number
  weeklyActiveUsers: number
  monthlyActiveUsers: number
  adminUsers: number
  premiumUsers: number
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  userAnalytics: UserAnalytics
  signIn: (userData: Omit<User, 'id' | 'createdAt' | 'lastActive' | 'messageCount' | 'sessionCount' | 'role'>) => void
  signOut: () => void
  getCurrentApiKey: () => string | undefined
  updateApiKey: (apiKey: string) => void
  toggleServiceType: () => void
  updateUserActivity: () => void
  incrementMessageCount: () => void
  incrementSessionCount: () => void
  getUserAnalytics: () => UserAnalytics
  getAllUsers: () => User[]
  isAdmin: () => boolean
  isOwner: () => boolean
  hasAdminAccess: () => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      userAnalytics: {
        totalUsers: 0,
        activeUsers: 0,
        totalMessages: 0,
        totalSessions: 0,
        averageMessagesPerUser: 0,
        averageSessionsPerUser: 0,
        topUsers: [],
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        adminUsers: 0,
        premiumUsers: 0,
      },
      signIn: (userData) => set(state => {
        // Determine user role based on email
        const adminEmails = ['admin@appvik.com', 'owner@appvik.com', 'your-email@example.com']
        const userRole = adminEmails.includes(userData.email.toLowerCase()) 
          ? (userData.email.toLowerCase() === 'owner@appvik.com' ? 'owner' : 'admin')
          : 'user'
        
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date(),
          lastActive: new Date(),
          messageCount: 0,
          sessionCount: 1,
          role: userRole
        }
        
        // Update analytics
        const updatedAnalytics = {
          ...state.userAnalytics,
          totalUsers: state.userAnalytics.totalUsers + 1,
          activeUsers: state.userAnalytics.activeUsers + 1,
          totalSessions: state.userAnalytics.totalSessions + 1,
          adminUsers: state.userAnalytics.adminUsers + (userRole === 'admin' || userRole === 'owner' ? 1 : 0),
          topUsers: [...state.userAnalytics.topUsers, { 
            name: newUser.name, 
            messageCount: newUser.messageCount, 
            lastActive: newUser.lastActive 
          }].sort((a, b) => b.messageCount - a.messageCount).slice(0, 10)
        }
        
        return { 
          user: newUser, 
          isAuthenticated: true,
          userAnalytics: updatedAnalytics
        }
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
      })),
      updateUserActivity: () => set(state => {
        if (!state.user) return state
        
        const updatedUser = { ...state.user, lastActive: new Date() }
        
        // Update analytics
        const updatedAnalytics = {
          ...state.userAnalytics,
          totalMessages: state.userAnalytics.totalMessages,
          averageMessagesPerUser: state.userAnalytics.totalUsers > 0 
            ? state.userAnalytics.totalMessages / state.userAnalytics.totalUsers 
            : 0,
          averageSessionsPerUser: state.userAnalytics.totalUsers > 0 
            ? state.userAnalytics.totalSessions / state.userAnalytics.totalUsers 
            : 0
        }
        
        return { user: updatedUser, userAnalytics: updatedAnalytics }
      }),
      incrementMessageCount: () => set(state => {
        if (!state.user) return state
        
        const updatedUser = { ...state.user, messageCount: state.user.messageCount + 1 }
        const updatedAnalytics = {
          ...state.userAnalytics,
          totalMessages: state.userAnalytics.totalMessages + 1,
          averageMessagesPerUser: state.userAnalytics.totalUsers > 0 
            ? (state.userAnalytics.totalMessages + 1) / state.userAnalytics.totalUsers 
            : 0
        }
        
        // Update top users
        const updatedTopUsers = [...state.userAnalytics.topUsers]
        const userIndex = updatedTopUsers.findIndex(u => u.name === state.user!.name)
        if (userIndex !== -1) {
          updatedTopUsers[userIndex] = {
            name: state.user.name,
            messageCount: updatedUser.messageCount,
            lastActive: updatedUser.lastActive
          }
        }
        updatedTopUsers.sort((a, b) => b.messageCount - a.messageCount)
        
        return { 
          user: updatedUser, 
          userAnalytics: { ...updatedAnalytics, topUsers: updatedTopUsers.slice(0, 10) }
        }
      }),
      incrementSessionCount: () => set(state => {
        if (!state.user) return state
        
        const updatedUser = { ...state.user, sessionCount: state.user.sessionCount + 1 }
        const updatedAnalytics = {
          ...state.userAnalytics,
          totalSessions: state.userAnalytics.totalSessions + 1,
          averageSessionsPerUser: state.userAnalytics.totalUsers > 0 
            ? (state.userAnalytics.totalSessions + 1) / state.userAnalytics.totalUsers 
            : 0
        }
        
        return { user: updatedUser, userAnalytics: updatedAnalytics }
      }),
      getUserAnalytics: () => get().userAnalytics,
      getAllUsers: () => {
        // This is a placeholder. In a real application, you would fetch all users from an API.
        // For now, we'll return an empty array or a mock list.
        return [];
      },
      isAdmin: () => get().user?.role === 'admin' || get().user?.role === 'owner',
      isOwner: () => get().user?.role === 'owner',
      hasAdminAccess: () => get().user?.role === 'admin' || get().user?.role === 'owner'
    }),
    {
      name: 'lucky-user-storage'
    }
  )
) 