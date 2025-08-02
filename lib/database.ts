// Simple database layer for LuckyChat
// Uses localStorage by default, can be extended with free cloud services

export interface User {
  id: string
  name: string
  email: string
  apiKey?: string
  useAppService: boolean
  isAuthenticated: boolean
  createdAt: Date
  lastLogin: Date
}

export interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'lucky'
  timestamp: Date
  userId?: string
}

export interface Subscription {
  userId: string
  tier: 'free' | 'basic' | 'pro' | 'enterprise'
  messagesUsed: number
  messagesLimit: number
  createdAt: Date
  expiresAt?: Date
}

class Database {
  private static instance: Database

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // User Management
  async saveUser(user: User): Promise<void> {
    try {
      const users = this.getUsers()
      const existingUserIndex = users.findIndex(u => u.id === user.id)
      
      if (existingUserIndex >= 0) {
        users[existingUserIndex] = { ...user, lastLogin: new Date() }
      } else {
        users.push({ ...user, createdAt: new Date(), lastLogin: new Date() })
      }
      
      localStorage.setItem('lucky-chat-users', JSON.stringify(users))
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  async getUser(userId: string): Promise<User | null> {
    try {
      const users = this.getUsers()
      return users.find(u => u.id === userId) || null
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = this.getUsers()
      return users.find(u => u.email === email) || null
    } catch (error) {
      console.error('Error getting user by email:', error)
      return null
    }
  }

  private getUsers(): User[] {
    try {
      const usersData = localStorage.getItem('lucky-chat-users')
      return usersData ? JSON.parse(usersData) : []
    } catch (error) {
      console.error('Error getting users:', error)
      return []
    }
  }

  // Chat Messages
  async saveMessages(userId: string, messages: ChatMessage[]): Promise<void> {
    try {
      const key = `lucky-chat-messages-${userId}`
      localStorage.setItem(key, JSON.stringify(messages))
    } catch (error) {
      console.error('Error saving messages:', error)
    }
  }

  async getMessages(userId: string): Promise<ChatMessage[]> {
    try {
      const key = `lucky-chat-messages-${userId}`
      const messagesData = localStorage.getItem(key)
      return messagesData ? JSON.parse(messagesData) : []
    } catch (error) {
      console.error('Error getting messages:', error)
      return []
    }
  }

  // Subscription Management
  async saveSubscription(subscription: Subscription): Promise<void> {
    try {
      const subscriptions = this.getSubscriptions()
      const existingIndex = subscriptions.findIndex(s => s.userId === subscription.userId)
      
      if (existingIndex >= 0) {
        subscriptions[existingIndex] = subscription
      } else {
        subscriptions.push(subscription)
      }
      
      localStorage.setItem('lucky-chat-subscriptions', JSON.stringify(subscriptions))
    } catch (error) {
      console.error('Error saving subscription:', error)
    }
  }

  async getSubscription(userId: string): Promise<Subscription | null> {
    try {
      const subscriptions = this.getSubscriptions()
      return subscriptions.find(s => s.userId === userId) || null
    } catch (error) {
      console.error('Error getting subscription:', error)
      return null
    }
  }

  private getSubscriptions(): Subscription[] {
    try {
      const subscriptionsData = localStorage.getItem('lucky-chat-subscriptions')
      return subscriptionsData ? JSON.parse(subscriptionsData) : []
    } catch (error) {
      console.error('Error getting subscriptions:', error)
      return []
    }
  }

  // Analytics
  async saveAnalytics(event: string, data: any): Promise<void> {
    try {
      const analytics = this.getAnalytics()
      analytics.push({
        event,
        data,
        timestamp: new Date().toISOString()
      })
      
      // Keep only last 1000 events
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000)
      }
      
      localStorage.setItem('lucky-chat-analytics', JSON.stringify(analytics))
    } catch (error) {
      console.error('Error saving analytics:', error)
    }
  }

  private getAnalytics(): any[] {
    try {
      const analyticsData = localStorage.getItem('lucky-chat-analytics')
      return analyticsData ? JSON.parse(analyticsData) : []
    } catch (error) {
      console.error('Error getting analytics:', error)
      return []
    }
  }

  // Export/Import for backup
  async exportData(userId: string): Promise<string> {
    try {
      const user = await this.getUser(userId)
      const messages = await this.getMessages(userId)
      const subscription = await this.getSubscription(userId)
      
      return JSON.stringify({
        user,
        messages,
        subscription,
        exportedAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error exporting data:', error)
      return ''
    }
  }

  async importData(userId: string, data: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(data)
      
      if (parsed.user) {
        await this.saveUser(parsed.user)
      }
      
      if (parsed.messages) {
        await this.saveMessages(userId, parsed.messages)
      }
      
      if (parsed.subscription) {
        await this.saveSubscription(parsed.subscription)
      }
      
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }
}

export default Database 