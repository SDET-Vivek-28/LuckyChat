import { supabase, TABLES, type User, type AuthLog, type ChatMessage, type UserAnalytics, type OTPStorage } from './supabase'

export class SupabaseDatabaseService {
  // User Management Methods

  /**
   * Create a new user
   */
  async createUser(userData: {
    name: string
    email: string
    mobile?: string
    password_hash?: string
    role?: 'user' | 'admin' | 'owner'
  }): Promise<User> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .insert({
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        password_hash: userData.password_hash,
        role: userData.role || 'user'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return data as User
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error finding user by email:', error)
      throw new Error(`Failed to find user: ${error.message}`)
    }

    return data as User | null
  }

  /**
   * Find user by mobile
   */
  async findUserByMobile(mobile: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('mobile', mobile)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error finding user by mobile:', error)
      throw new Error(`Failed to find user: ${error.message}`)
    }

    return data as User | null
  }

  /**
   * Find user by ID
   */
  async findUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error finding user by ID:', error)
      throw new Error(`Failed to find user: ${error.message}`)
    }

    return data || null
  }

  /**
   * Update user
   */
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      throw new Error(`Failed to update user: ${error.message}`)
    }

    return data
  }

  /**
   * Get all users with pagination
   */
  async getAllUsers(page: number = 1, limit: number = 20): Promise<{
    users: User[]
    total: number
    page: number
    totalPages: number
  }> {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: users, error, count } = await supabase
      .from(TABLES.USERS)
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      throw new Error(`Failed to fetch users: ${error.message}`)
    }

    const total = count || 0
    const totalPages = Math.ceil(total / limit)

    return {
      users: users || [],
      total,
      page,
      totalPages
    }
  }

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<User[]> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,mobile.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching users:', error)
      throw new Error(`Failed to search users: ${error.message}`)
    }

    return data || []
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: User['role']): Promise<User[]> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users by role:', error)
      throw new Error(`Failed to fetch users by role: ${error.message}`)
    }

    return data || []
  }

  // Authentication Logging Methods

  /**
   * Log authentication event
   */
  async logAuthEvent(logData: Omit<AuthLog, 'id' | 'timestamp'>): Promise<AuthLog> {
    const { data, error } = await supabase
      .from(TABLES.AUTH_LOGS)
      .insert(logData)
      .select()
      .single()

    if (error) {
      console.error('Error logging auth event:', error)
      throw new Error(`Failed to log auth event: ${error.message}`)
    }

    return data
  }

  /**
   * Get authentication logs for a user
   */
  async getUserAuthLogs(userId: string, limit: number = 50): Promise<AuthLog[]> {
    const { data, error } = await supabase
      .from(TABLES.AUTH_LOGS)
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching user auth logs:', error)
      throw new Error(`Failed to fetch auth logs: ${error.message}`)
    }

    return data || []
  }

  // Chat Messages Methods

  /**
   * Save chat message
   */
  async saveChatMessage(messageData: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from(TABLES.CHAT_MESSAGES)
      .insert(messageData)
      .select()
      .single()

    if (error) {
      console.error('Error saving chat message:', error)
      throw new Error(`Failed to save chat message: ${error.message}`)
    }

    return data
  }

  /**
   * Get chat messages for a user
   */
  async getUserChatMessages(userId: string, limit: number = 100): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from(TABLES.CHAT_MESSAGES)
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching chat messages:', error)
      throw new Error(`Failed to fetch chat messages: ${error.message}`)
    }

    return data || []
  }

  /**
   * Get chat messages by session
   */
  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from(TABLES.CHAT_MESSAGES)
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })

    if (error) {
      console.error('Error fetching chat messages by session:', error)
      throw new Error(`Failed to fetch chat messages: ${error.message}`)
    }

    return data || []
  }

  // Analytics Methods

  /**
   * Update user analytics
   */
  async updateUserAnalytics(userId: string, date: string, updates: Partial<UserAnalytics>): Promise<void> {
    const { error } = await supabase
      .from(TABLES.USER_ANALYTICS)
      .upsert({
        user_id: userId,
        date,
        ...updates
      })

    if (error) {
      console.error('Error updating user analytics:', error)
      throw new Error(`Failed to update user analytics: ${error.message}`)
    }
  }

  /**
   * Increment message count
   */
  async incrementMessageCount(userId: string): Promise<void> {
    // Use the database function for atomic increment
    const { error } = await supabase.rpc('increment_message_count', {
      user_uuid: userId
    })

    if (error) {
      console.error('Error incrementing message count:', error)
      throw new Error(`Failed to increment message count: ${error.message}`)
    }
  }

  /**
   * Increment session count
   */
  async incrementSessionCount(userId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_session_count', {
      user_uuid: userId
    })

    if (error) {
      console.error('Error incrementing session count:', error)
      throw new Error(`Failed to increment session count: ${error.message}`)
    }
  }

  /**
   * Update user activity
   */
  async updateUserActivity(userId: string): Promise<void> {
    const { error } = await supabase.rpc('update_user_activity', {
      user_uuid: userId
    })

    if (error) {
      console.error('Error updating user activity:', error)
      throw new Error(`Failed to update user activity: ${error.message}`)
    }
  }

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(): Promise<{
    totalUsers: number
    totalMessages: number
    totalSessions: number
    dailyStats: Record<string, any>
    userStats: Record<string, any>
  }> {
    // Get total counts
    const { count: totalUsers } = await supabase
      .from(TABLES.USERS)
      .select('*', { count: 'exact', head: true })

    const { count: totalMessages } = await supabase
      .from(TABLES.CHAT_MESSAGES)
      .select('*', { count: 'exact', head: true })

    // Get daily stats for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: dailyStats } = await supabase
      .from(TABLES.USER_ANALYTICS)
      .select('*')
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('date', { ascending: false })

    // Get top users by message count
    const { data: topUsers } = await supabase
      .from(TABLES.USERS)
      .select('id, name, stats')
      .order('stats->message_count', { ascending: false })
      .limit(10)

    return {
      totalUsers: totalUsers || 0,
      totalMessages: totalMessages || 0,
      totalSessions: 0, // This would need a separate calculation
      dailyStats: dailyStats || [],
      userStats: topUsers || []
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string): Promise<any> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('stats')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user stats:', error)
      return null
    }

    return data?.stats || null
  }

  /**
   * Update daily statistics
   */
  async updateDailyStats(): Promise<void> {
    const today = new Date().toISOString().split('T')[0]
    
    // Get all users who were active today
    const { data: activeUsers } = await supabase
      .from(TABLES.USERS)
      .select('id, last_active')
      .gte('last_active', `${today}T00:00:00Z`)
      .lt('last_active', `${today}T23:59:59Z`)

    if (activeUsers && activeUsers.length > 0) {
      // Update daily stats for active users
      for (const user of activeUsers) {
        await this.updateUserAnalytics(user.id, today, {
          user_id: user.id,
          date: today,
          message_count: 0,
          session_count: 0,
          time_spent: 0,
          topics_covered: [],
          languages_used: []
        })
      }
    }
  }

  // OTP Management Methods

  /**
   * Store OTP
   */
  async storeOTP(otpData: Omit<OTPStorage, 'id' | 'created_at'>): Promise<OTPStorage> {
    const { data, error } = await supabase
      .from(TABLES.OTP_STORAGE)
      .insert(otpData)
      .select()
      .single()

    if (error) {
      console.error('Error storing OTP:', error)
      throw new Error(`Failed to store OTP: ${error.message}`)
    }

    return data
  }

  /**
   * Verify OTP
   */
  async verifyOTP(identifier: string, otp: string, type: 'sms' | 'email'): Promise<{
    success: boolean
    message: string
  }> {
    const { data, error } = await supabase
      .from(TABLES.OTP_STORAGE)
      .select('*')
      .eq('identifier', identifier)
      .eq('type', type)
      .eq('otp', otp)
      .gt('expires_at', new Date().toISOString())
      .lt('attempts', 3)
      .single()

    if (error || !data) {
      return {
        success: false,
        message: 'Invalid or expired OTP'
      }
    }

    // Increment attempts
    await supabase
      .from(TABLES.OTP_STORAGE)
      .update({ attempts: data.attempts + 1 })
      .eq('id', data.id)

    // Delete the OTP after successful verification
    await supabase
      .from(TABLES.OTP_STORAGE)
      .delete()
      .eq('id', data.id)

    return {
      success: true,
      message: 'OTP verified successfully'
    }
  }

  // Real-time subscriptions

  /**
   * Subscribe to user messages
   */
  subscribeToUserMessages(userId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`user-messages-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.CHAT_MESSAGES,
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as ChatMessage)
        }
      )
      .subscribe()
  }

  /**
   * Subscribe to user analytics updates
   */
  subscribeToUserAnalytics(userId: string, callback: (analytics: UserAnalytics) => void) {
    return supabase
      .channel(`user-analytics-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.USER_ANALYTICS,
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as UserAnalytics)
        }
      )
      .subscribe()
  }
}

// Export singleton instance
export const supabaseDatabase = new SupabaseDatabaseService() 