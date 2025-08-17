import fs from 'fs'
import path from 'path'

// Database file paths
const DB_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DB_DIR, 'users.json')
const AUTH_LOGS_FILE = path.join(DB_DIR, 'auth_logs.json')
const ANALYTICS_FILE = path.join(DB_DIR, 'analytics.json')

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true })
}

// Initialize empty database files if they don't exist
const initializeDatabase = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(AUTH_LOGS_FILE)) {
    fs.writeFileSync(AUTH_LOGS_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify({
      totalUsers: 0,
      totalMessages: 0,
      totalSessions: 0,
      dailyStats: {},
      userStats: {}
    }, null, 2))
  }
}

// Database interfaces
export interface User {
  id: string
  name: string
  email: string
  mobile?: string
  password?: string
  role: 'user' | 'admin' | 'owner'
  createdAt: Date
  lastActive: Date
  lastLogin: Date
  isActive: boolean
  profile: {
    avatar?: string
    bio?: string
    preferences?: {
      language: string
      theme: 'light' | 'dark'
      notifications: boolean
    }
  }
  stats: {
    messageCount: number
    sessionCount: number
    totalTimeSpent: number // in minutes
    lastMessageAt?: Date
  }
  security: {
    failedLoginAttempts: number
    lastFailedLogin?: Date
    passwordChangedAt?: Date
    twoFactorEnabled: boolean
  }
}

export interface AuthLog {
  id: string
  userId: string
  action: 'signin' | 'signup' | 'signout' | 'otp_sent' | 'otp_verified' | 'password_change' | 'failed_login'
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  success: boolean
  details?: {
    method: 'email' | 'mobile' | 'password'
    otpType?: 'sms' | 'email'
    failureReason?: string
  }
}

export interface UserAnalytics {
  totalUsers: number
  totalMessages: number
  totalSessions: number
  dailyStats: {
    [date: string]: {
      newUsers: number
      activeUsers: number
      messagesSent: number
      sessionsStarted: number
    }
  }
  userStats: {
    [userId: string]: {
      messageCount: number
      sessionCount: number
      lastActive: Date
      totalTimeSpent: number
    }
  }
}

export class DatabaseService {
  private users: User[] = []
  private authLogs: AuthLog[] = []
  private analytics!: UserAnalytics

  constructor() {
    initializeDatabase()
    this.loadData()
  }

  /**
   * Load data from JSON files
   */
  private loadData() {
    try {
      this.users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
      this.authLogs = JSON.parse(fs.readFileSync(AUTH_LOGS_FILE, 'utf8'))
      this.analytics = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'))
    } catch (error) {
      console.error('Error loading database:', error)
      this.users = []
      this.authLogs = []
      this.analytics = {
        totalUsers: 0,
        totalMessages: 0,
        totalSessions: 0,
        dailyStats: {},
        userStats: {}
      }
    }
  }

  /**
   * Save data to JSON files
   */
  private saveData() {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2))
      fs.writeFileSync(AUTH_LOGS_FILE, JSON.stringify(this.authLogs, null, 2))
      fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(this.analytics, null, 2))
    } catch (error) {
      console.error('Error saving database:', error)
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // User Management Methods

  /**
   * Create a new user
   */
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'lastActive' | 'lastLogin' | 'stats' | 'security'>): Promise<User> {
    const user: User = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date(),
      lastActive: new Date(),
      lastLogin: new Date(),
      stats: {
        messageCount: 0,
        sessionCount: 0,
        totalTimeSpent: 0
      },
      security: {
        failedLoginAttempts: 0,
        twoFactorEnabled: false
      }
    }

    this.users.push(user)
    this.analytics.totalUsers++
    this.analytics.userStats[user.id] = {
      messageCount: 0,
      sessionCount: 0,
      lastActive: user.lastActive,
      totalTimeSpent: 0
    }

    this.saveData()
    return user
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  /**
   * Find user by mobile
   */
  async findUserByMobile(mobile: string): Promise<User | null> {
    return this.users.find(user => user.mobile === mobile) || null
  }

  /**
   * Find user by ID
   */
  async findUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null
  }

  /**
   * Update user
   */
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...updates }
    this.saveData()
    return this.users[userIndex]
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)
    delete this.analytics.userStats[id]
    this.analytics.totalUsers--
    this.saveData()
    return true
  }

  /**
   * Get all users (with pagination)
   */
  async getAllUsers(page: number = 1, limit: number = 20): Promise<{ users: User[]; total: number; page: number; totalPages: number }> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = this.users.slice(startIndex, endIndex)
    const totalPages = Math.ceil(this.users.length / limit)

    return {
      users: paginatedUsers,
      total: this.users.length,
      page,
      totalPages
    }
  }

  // Authentication Logging Methods

  /**
   * Log authentication event
   */
  async logAuthEvent(logData: Omit<AuthLog, 'id' | 'timestamp'>): Promise<AuthLog> {
    const log: AuthLog = {
      ...logData,
      id: this.generateId(),
      timestamp: new Date()
    }

    this.authLogs.push(log)
    this.saveData()
    return log
  }

  /**
   * Get authentication logs for a user
   */
  async getUserAuthLogs(userId: string, limit: number = 50): Promise<AuthLog[]> {
    return this.authLogs
      .filter(log => log.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  /**
   * Get all authentication logs (with pagination)
   */
  async getAllAuthLogs(page: number = 1, limit: number = 50): Promise<{ logs: AuthLog[]; total: number; page: number; totalPages: number }> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedLogs = this.authLogs.slice(startIndex, endIndex)
    const totalPages = Math.ceil(this.authLogs.length / limit)

    return {
      logs: paginatedLogs,
      total: this.authLogs.length,
      page,
      totalPages
    }
  }

  // Analytics Methods

  /**
   * Update user analytics
   */
  async updateUserAnalytics(userId: string, updates: Partial<UserAnalytics['userStats'][string]>): Promise<void> {
    if (!this.analytics.userStats[userId]) {
      this.analytics.userStats[userId] = {
        messageCount: 0,
        sessionCount: 0,
        lastActive: new Date(),
        totalTimeSpent: 0
      }
    }

    this.analytics.userStats[userId] = {
      ...this.analytics.userStats[userId],
      ...updates
    }

    this.saveData()
  }

  /**
   * Increment message count
   */
  async incrementMessageCount(userId: string): Promise<void> {
    this.analytics.totalMessages++
    if (this.analytics.userStats[userId]) {
      this.analytics.userStats[userId].messageCount++
      this.analytics.userStats[userId].lastActive = new Date()
    }
    this.saveData()
  }

  /**
   * Increment session count
   */
  async incrementSessionCount(userId: string): Promise<void> {
    this.analytics.totalSessions++
    if (this.analytics.userStats[userId]) {
      this.analytics.userStats[userId].sessionCount++
      this.analytics.userStats[userId].lastActive = new Date()
    }
    this.saveData()
  }

  /**
   * Update daily statistics
   */
  async updateDailyStats(): Promise<void> {
    const today = new Date().toISOString().split('T')[0]
    
    if (!this.analytics.dailyStats[today]) {
      this.analytics.dailyStats[today] = {
        newUsers: 0,
        activeUsers: 0,
        messagesSent: 0,
        sessionsStarted: 0
      }
    }

    // Count today's active users
    const todayStart = new Date(today)
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)
    
    const activeUsers = this.users.filter(user => 
      user.lastActive >= todayStart && user.lastActive < todayEnd
    ).length

    this.analytics.dailyStats[today].activeUsers = activeUsers
    this.saveData()
  }

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(): Promise<UserAnalytics> {
    return this.analytics
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string): Promise<UserAnalytics['userStats'][string] | null> {
    return this.analytics.userStats[userId] || null
  }

  // Utility Methods

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<User[]> {
    const lowerQuery = query.toLowerCase()
    return this.users.filter(user =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      (user.mobile && user.mobile.includes(lowerQuery))
    )
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: User['role']): Promise<User[]> {
    return this.users.filter(user => user.role === role)
  }

  /**
   * Get active users (active in last 7 days)
   */
  async getActiveUsers(): Promise<User[]> {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return this.users.filter(user => user.lastActive >= sevenDaysAgo)
  }

  /**
   * Backup database
   */
  async backupDatabase(): Promise<string> {
    const backupData = {
      users: this.users,
      authLogs: this.authLogs,
      analytics: this.analytics,
      timestamp: new Date().toISOString()
    }

    const backupPath = path.join(DB_DIR, `backup_${Date.now()}.json`)
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2))
    return backupPath
  }

  /**
   * Restore database from backup
   */
  async restoreDatabase(backupPath: string): Promise<boolean> {
    try {
      const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
      
      this.users = backupData.users || []
      this.authLogs = backupData.authLogs || []
      this.analytics = backupData.analytics || {
        totalUsers: 0,
        totalMessages: 0,
        totalSessions: 0,
        dailyStats: {},
        userStats: {}
      }

      this.saveData()
      return true
    } catch (error) {
      console.error('Error restoring database:', error)
      return false
    }
  }
}

// Export singleton instance
export const database = new DatabaseService() 