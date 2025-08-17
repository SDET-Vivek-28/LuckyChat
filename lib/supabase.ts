import { createClient } from '@supabase/supabase-js'

// Lazy initialization to avoid build-time errors
let supabaseClient: ReturnType<typeof createClient> | null = null

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    if (!supabaseClient) {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error('Missing Supabase environment variables:', {
            url: supabaseUrl ? 'SET' : 'MISSING',
            key: supabaseAnonKey ? 'SET' : 'MISSING'
          })
          throw new Error('Missing Supabase environment variables')
        }
        
        supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
          },
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        })
      } catch (error) {
        console.error('Failed to initialize Supabase client:', error)
        // Return a mock client that will throw errors when used
        const mockClient = {
          from: () => ({
            insert: () => Promise.reject(new Error('Supabase client not initialized')),
            select: () => Promise.reject(new Error('Supabase client not initialized')),
            update: () => Promise.reject(new Error('Supabase client not initialized')),
            delete: () => Promise.reject(new Error('Supabase client not initialized')),
            eq: () => Promise.reject(new Error('Supabase client not initialized')),
            single: () => Promise.reject(new Error('Supabase client not initialized')),
            rpc: () => Promise.reject(new Error('Supabase client not initialized'))
          }),
          auth: {},
          channel: () => ({}),
          functions: {},
          getChannels: () => [],
          realtime: {},
          removeAllChannels: () => ({}),
          removeChannel: () => ({}),
          rpc: () => Promise.reject(new Error('Supabase client not initialized')),
          schema: {},
          storage: {}
        }
        return mockClient[prop as keyof typeof mockClient]
      }
    }
    
    return supabaseClient[prop as keyof typeof supabaseClient]
  }
})

// Database table names
export const TABLES = {
  USERS: 'users',
  AUTH_LOGS: 'auth_logs',
  CHAT_MESSAGES: 'chat_messages',
  USER_ANALYTICS: 'user_analytics',
  OTP_STORAGE: 'otp_storage'
} as const

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          mobile?: string
          password_hash?: string
          role: 'user' | 'admin' | 'owner'
          created_at: string
          last_active: string
          last_login: string
          is_active: boolean
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
            message_count: number
            session_count: number
            total_time_spent: number
            last_message_at?: string
          }
          security: {
            failed_login_attempts: number
            last_failed_login?: string
            password_changed_at?: string
            two_factor_enabled: boolean
          }
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      auth_logs: {
        Row: {
          id: string
          user_id: string
          action: 'signin' | 'signup' | 'signout' | 'otp_sent' | 'otp_verified' | 'password_change' | 'failed_login'
          timestamp: string
          ip_address?: string
          user_agent?: string
          success: boolean
          details?: {
            method: 'email' | 'mobile' | 'password'
            otp_type?: 'sms' | 'email'
            failure_reason?: string
          }
        }
        Insert: Omit<Database['public']['Tables']['auth_logs']['Row'], 'id' | 'timestamp'>
        Update: Partial<Database['public']['Tables']['auth_logs']['Insert']>
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          text: string
          sender: 'user' | 'lucky'
          timestamp: string
          session_id: string
          metadata?: {
            message_type: 'text' | 'image' | 'voice' | 'code'
            language?: string
            topic?: string
          }
        }
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'id' | 'timestamp'>
        Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>
      }
      user_analytics: {
        Row: {
          id: string
          user_id: string
          date: string
          message_count: number
          session_count: number
          time_spent: number
          topics_covered: string[]
          languages_used: string[]
        }
        Insert: Omit<Database['public']['Tables']['user_analytics']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['user_analytics']['Insert']>
      }
      otp_storage: {
        Row: {
          id: string
          identifier: string
          otp: string
          type: 'sms' | 'email'
          expires_at: string
          attempts: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['otp_storage']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['otp_storage']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type AuthLog = Database['public']['Tables']['auth_logs']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
export type UserAnalytics = Database['public']['Tables']['user_analytics']['Row']
export type OTPStorage = Database['public']['Tables']['otp_storage']['Row'] 