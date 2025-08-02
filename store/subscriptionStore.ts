import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise'

interface SubscriptionPlan {
  id: SubscriptionTier
  name: string
  price: number
  messagesPerMonth: number
  features: string[]
  apiKeyRequired: boolean
}

interface SubscriptionStore {
  currentTier: SubscriptionTier
  messagesUsed: number
  messagesLimit: number
  upgradeTier: (tier: SubscriptionTier) => void
  incrementMessageCount: () => void
  canSendMessage: () => boolean
  getCurrentPlan: () => SubscriptionPlan
  getAllPlans: () => SubscriptionPlan[]
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    messagesPerMonth: 50,
    features: ['Basic AI responses', 'Standard support', 'App service only'],
    apiKeyRequired: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    messagesPerMonth: 500,
    features: ['Enhanced AI responses', 'Priority support', 'Personal API key', 'Chat history'],
    apiKeyRequired: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    messagesPerMonth: 2000,
    features: ['Advanced AI responses', '24/7 support', 'Personal API key', 'Unlimited history', 'Custom themes'],
    apiKeyRequired: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    messagesPerMonth: 10000,
    features: ['Enterprise AI responses', 'Dedicated support', 'Custom integrations', 'White-label options', 'Analytics'],
    apiKeyRequired: true
  }
]

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      currentTier: 'free',
      messagesUsed: 0,
      messagesLimit: 50,
      
      upgradeTier: (tier: SubscriptionTier) => {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === tier)
        if (plan) {
          set({
            currentTier: tier,
            messagesLimit: plan.messagesPerMonth
          })
        }
      },
      
      incrementMessageCount: () => {
        set((state) => ({
          messagesUsed: state.messagesUsed + 1
        }))
      },
      
      canSendMessage: () => {
        const state = get()
        return state.messagesUsed < state.messagesLimit
      },
      
      getCurrentPlan: () => {
        const state = get()
        return SUBSCRIPTION_PLANS.find(p => p.id === state.currentTier) || SUBSCRIPTION_PLANS[0]
      },
      
      getAllPlans: () => SUBSCRIPTION_PLANS
    }),
    {
      name: 'lucky-chat-subscription',
    }
  )
) 