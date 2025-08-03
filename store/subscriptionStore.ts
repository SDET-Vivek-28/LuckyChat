/**
 * Subscription Store - Zustand State Management
 * Copyright © 2024 Appvik. All rights reserved.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  messagesPerMonth: number
  features: string[]
  apiKeyRequired: boolean
}

interface SubscriptionState {
  currentPlan: string
  messageCount: number
  plans: SubscriptionPlan[]
  canSendMessage: () => boolean
  incrementMessageCount: () => void
  getCurrentPlan: () => SubscriptionPlan | undefined
  upgradePlan: (planId: string) => void
  // Add methods for PricingModal
  currentTier: SubscriptionTier
  upgradeTier: (tier: SubscriptionTier) => void
  getAllPlans: () => SubscriptionPlan[]
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      currentPlan: 'free',
      messageCount: 0,
      plans: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          messagesPerMonth: 1000, // Increased for user acquisition
          features: ['Custom AI', 'Unlimited Chat', '1000 messages/month', 'All Features'],
          apiKeyRequired: false
        },
        {
          id: 'basic',
          name: 'Basic',
          price: 0, // Free for now
          messagesPerMonth: 5000,
          features: ['Custom AI', 'Priority Support', '5000 messages/month', 'Advanced Features'],
          apiKeyRequired: false
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 0, // Free for now
          messagesPerMonth: 10000,
          features: ['Custom AI', 'Premium Support', '10000 messages/month', 'All Features'],
          apiKeyRequired: false
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 0, // Free for now
          messagesPerMonth: 50000,
          features: ['Custom AI', 'Unlimited Usage', 'API Access', 'Dedicated Support'],
          apiKeyRequired: false
        }
      ],
      canSendMessage: () => {
        const state = get()
        const plan = state.plans.find(p => p.id === state.currentPlan)
        return state.messageCount < (plan?.messagesPerMonth || 0)
      },
      incrementMessageCount: () => set(state => ({ 
        messageCount: state.messageCount + 1 
      })),
      getCurrentPlan: () => {
        const state = get()
        return state.plans.find(p => p.id === state.currentPlan)
      },
      upgradePlan: (planId) => set({ currentPlan: planId }),
      // Add methods for PricingModal
      get currentTier() {
        return get().currentPlan as SubscriptionTier
      },
      upgradeTier: (tier: SubscriptionTier) => set({ currentPlan: tier }),
      getAllPlans: () => get().plans
    }),
    {
      name: 'lucky-subscription-storage'
    }
  )
) 