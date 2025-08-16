'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, MessageSquare, Activity, TrendingUp, Calendar, BarChart3, UserCheck, Clock, Shield, AlertTriangle, Crown } from 'lucide-react'
import { useUserStore } from '@/store/userStore'

interface AnalyticsDashboardProps {
  isOpen: boolean
  onClose: () => void
}

// Admin access control - only specific admin emails can access
const ADMIN_EMAILS = [
  'admin@appvik.com',
  'owner@appvik.com',
  'your-email@example.com' // Replace with your actual email
]

export default function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
  const { user, userAnalytics, getAllUsers, hasAdminAccess } = useUserStore()
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (isOpen && user) {
      // Check if current user has admin access
      const adminAccess = hasAdminAccess()
      setIsAdmin(adminAccess)
      
      if (adminAccess) {
        // Fetch all users when dashboard opens (admin only)
        const users = getAllUsers()
        setAllUsers(users)
      }
    }
  }, [isOpen, user, getAllUsers, hasAdminAccess])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  // Show access denied for non-admin users
  if (!isAdmin) {
    return (
      <AnimatePresence>
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
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
              <p className="text-gray-600">
                This Analytics Dashboard is only accessible to administrators.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Contact:</strong> admin@appvik.com
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  for access to analytics and user statistics
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
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
          className="bg-white rounded-2xl p-8 w-full max-w-6xl shadow-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
              <p className="text-gray-600 mt-2">Monitor user activity and application usage</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="mb-6">
            <div className="flex space-x-2">
              {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-lucky-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-3xl font-bold">{userAnalytics.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Users</p>
                  <p className="text-3xl font-bold">{userAnalytics.activeUsers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-200" />
              </div>
            </div>

            {/* Total Messages */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Messages</p>
                  <p className="text-3xl font-bold">{userAnalytics.totalMessages}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-200" />
              </div>
            </div>

            {/* Total Sessions */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Sessions</p>
                  <p className="text-3xl font-bold">{userAnalytics.totalSessions}</p>
                </div>
                <Activity className="w-8 h-8 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Admin Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Admin Users */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Admin Users</p>
                  <p className="text-3xl font-bold">{userAnalytics.adminUsers}</p>
                  <p className="text-red-200 text-sm">
                    {userAnalytics.totalUsers > 0 
                      ? `${((userAnalytics.adminUsers / userAnalytics.totalUsers) * 100).toFixed(1)}% of total`
                      : '0% of total'
                    }
                  </p>
                </div>
                <Shield className="w-8 h-8 text-red-200" />
              </div>
            </div>

            {/* Premium Users */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Premium Users</p>
                  <p className="text-3xl font-bold">{userAnalytics.premiumUsers}</p>
                  <p className="text-yellow-200 text-sm">
                    {userAnalytics.totalUsers > 0 
                      ? `${((userAnalytics.premiumUsers / userAnalytics.totalUsers) * 100).toFixed(1)}% of total`
                      : '0% of total'
                    }
                  </p>
                </div>
                <Crown className="w-8 h-8 text-yellow-200" />
              </div>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Averages */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-lucky-500" />
                <span>User Averages</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Messages per User</span>
                  <span className="font-semibold text-gray-800">
                    {userAnalytics.averageMessagesPerUser.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sessions per User</span>
                  <span className="font-semibold text-gray-800">
                    {userAnalytics.averageSessionsPerUser.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Time-based Activity */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-lucky-500" />
                <span>Activity by Time</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Active</span>
                  <span className="font-semibold text-gray-800">{userAnalytics.dailyActiveUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Active</span>
                  <span className="font-semibold text-gray-800">{userAnalytics.weeklyActiveUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Active</span>
                  <span className="font-semibold text-gray-800">{userAnalytics.monthlyActiveUsers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-lucky-500" />
              <span>Top Users by Activity</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Messages</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {userAnalytics.topUsers.slice(0, 10).map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.messageCount}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(user.lastActive)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-lucky-500" />
              <span>Recent User Activity</span>
            </h3>
            <div className="space-y-3">
              {allUsers.slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-lucky-100 rounded-full flex items-center justify-center">
                      <span className="text-lucky-600 font-medium text-sm">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.messageCount} messages • {user.sessionCount} sessions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last active</p>
                    <p className="text-xs text-gray-500">{formatTime(user.lastActive)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 