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
              {/* Free Plan */}
              <div className="relative bg-white border-2 border-lucky-200 rounded-2xl p-6 shadow-lg">
                <div className="absolute -top-3 -left-3 bg-lucky-500 text-white text-xs font-bold px-3 py-1 rounded-full transform -rotate-12">
                  Current Plan
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-lucky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-lucky-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                  <div className="text-3xl font-bold text-lucky-600 mb-1">$0<span className="text-lg text-gray-500">/month</span></div>
                  <p className="text-gray-600">1,000 messages/month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Custom AI
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Unlimited Chat
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    1000 messages/month
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    All Features
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-gray-300 text-gray-600 font-semibold rounded-xl cursor-not-allowed">
                        Current Plan
                </button>
                    </div>

              {/* Basic Plan */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                  <div className="text-3xl font-bold text-yellow-600 mb-1">$0<span className="text-lg text-gray-500">/month</span></div>
                  <p className="text-gray-600">5,000 messages/month</p>
                    </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Custom AI
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Priority Support
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    5000 messages/month
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Advanced Features
                  </li>
                </ul>
                {/* <button className="w-full py-3 px-6 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition-colors">
                  Upgrade Now
                </button> */}
                <button className="w-full py-3 px-6 bg-gray-300 text-gray-600 font-semibold rounded-xl cursor-not-allowed">
                  Coming Soon
                </button>
                    </div>

              {/* Pro Plan */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-1">$0<span className="text-lg text-gray-500">/month</span></div>
                  <p className="text-gray-600">10,000 messages/month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Custom AI
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Premium Support
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    10000 messages/month
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    All Features
                  </li>
                </ul>
                {/* <button className="w-full py-3 px-6 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-colors">
                  Upgrade Now
                </button> */}
                <button className="w-full py-3 px-6 bg-gray-300 text-gray-600 font-semibold rounded-xl cursor-not-allowed">
                  Coming Soon
                </button>
                      </div>

              {/* Enterprise Plan */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">$0<span className="text-lg text-gray-500">/month</span></div>
                  <p className="text-gray-600">50,000 messages/month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Custom AI
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Unlimited Usage
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    API Access
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Dedicated Support
                  </li>
                </ul>
                {/* <button className="w-full py-3 px-6 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors">
                  Contact Sales
                </button> */}
                <button className="w-full py-3 px-6 bg-gray-300 text-gray-600 font-semibold rounded-xl cursor-not-allowed">
                  Coming Soon
                  </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                All plans include our custom AI technology. No credit card required for free plans.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 