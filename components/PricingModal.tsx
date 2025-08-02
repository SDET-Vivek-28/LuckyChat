'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Star, Zap, Crown, Building } from 'lucide-react'
import { useSubscriptionStore, SubscriptionTier } from '@/store/subscriptionStore'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const { currentTier, upgradeTier, getCurrentPlan, getAllPlans } = useSubscriptionStore()
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null)

  const handleUpgrade = (tier: SubscriptionTier) => {
    setSelectedTier(tier)
    // Here you would integrate with Stripe/PayPal
    console.log(`Upgrading to ${tier} tier`)
    
    // Simulate payment success
    setTimeout(() => {
      upgradeTier(tier)
      setSelectedTier(null)
      onClose()
    }, 2000)
  }

  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'free': return <Star className="w-6 h-6" />
      case 'basic': return <Zap className="w-6 h-6" />
      case 'pro': return <Crown className="w-6 h-6" />
      case 'enterprise': return <Building className="w-6 h-6" />
    }
  }

  const getTierColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-600'
      case 'basic': return 'bg-lucky-100 text-lucky-600'
      case 'pro': return 'bg-paw-100 text-paw-600'
      case 'enterprise': return 'bg-purple-100 text-purple-600'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Choose Your Plan</h2>
                <p className="text-gray-600 mt-2">Unlock the full potential of LuckyChat</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getAllPlans().map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 rounded-xl border-2 ${
                    currentTier === plan.id 
                      ? 'border-lucky-500 bg-lucky-50' 
                      : 'border-gray-200 hover:border-lucky-300'
                  }`}
                >
                  {currentTier === plan.id && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-lucky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Current Plan
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getTierColor(plan.id)} mb-4`}>
                      {getTierIcon(plan.id)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-800">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {plan.messagesPerMonth.toLocaleString()} messages/month
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={currentTier === plan.id || selectedTier === plan.id}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      currentTier === plan.id
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : selectedTier === plan.id
                        ? 'bg-lucky-600 text-white cursor-not-allowed'
                        : 'bg-lucky-500 text-white hover:bg-lucky-600'
                    }`}
                  >
                    {currentTier === plan.id 
                      ? 'Current Plan' 
                      : selectedTier === plan.id 
                      ? 'Processing...' 
                      : plan.price === 0 
                      ? 'Get Started' 
                      : 'Upgrade Now'
                    }
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                💳 Secure payments powered by Stripe • 🔒 30-day money-back guarantee • 🚀 Cancel anytime
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 