-- LuckyChat Database Schema for Supabase
-- This file contains all the SQL commands to create the database structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table - Core user information
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mobile VARCHAR(20),
  password_hash VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'owner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  profile JSONB DEFAULT '{
    "avatar": null,
    "bio": null,
    "preferences": {
      "language": "en",
      "theme": "light",
      "notifications": true
    }
  }',
  stats JSONB DEFAULT '{
    "message_count": 0,
    "session_count": 0,
    "total_time_spent": 0,
    "last_message_at": null
  }',
  security JSONB DEFAULT '{
    "failed_login_attempts": 0,
    "last_failed_login": null,
    "password_changed_at": null,
    "two_factor_enabled": false
  }'
);

-- Authentication logs table - Track all auth events
CREATE TABLE IF NOT EXISTS auth_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL CHECK (action IN ('signin', 'signup', 'signout', 'otp_sent', 'otp_verified', 'password_change', 'failed_login')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  details JSONB DEFAULT '{}'
);

-- Chat messages table - Store all chat conversations
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sender VARCHAR(10) NOT NULL CHECK (sender IN ('user', 'lucky')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID NOT NULL,
  metadata JSONB DEFAULT '{
    "message_type": "text",
    "language": null,
    "topic": null
  }'
);

-- User analytics table - Daily user statistics
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  message_count INTEGER DEFAULT 0,
  session_count INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in minutes
  topics_covered TEXT[] DEFAULT '{}',
  languages_used TEXT[] DEFAULT '{}',
  UNIQUE(user_id, date)
);

-- OTP storage table - Secure OTP management
CREATE TABLE IF NOT EXISTS otp_storage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) NOT NULL, -- email or mobile number
  otp VARCHAR(10) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('sms', 'email')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active);

CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON auth_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_timestamp ON auth_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_auth_logs_action ON auth_logs(action);

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_date ON user_analytics(date);

CREATE INDEX IF NOT EXISTS idx_otp_storage_identifier ON otp_storage(identifier);
CREATE INDEX IF NOT EXISTS idx_otp_storage_expires_at ON otp_storage(expires_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_storage ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

-- Chat messages policies
CREATE POLICY "Users can view their own messages" ON chat_messages
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- User analytics policies
CREATE POLICY "Users can view their own analytics" ON user_analytics
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can view all analytics" ON user_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );

-- OTP storage policies (more restrictive)
CREATE POLICY "OTP cleanup - system only" ON otp_storage
  FOR ALL USING (false); -- Only allow through server-side functions

-- Functions for common operations
CREATE OR REPLACE FUNCTION increment_message_count(user_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET stats = jsonb_set(
    stats, 
    '{message_count}', 
    to_jsonb((stats->>'message_count')::int + 1)
  )
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_session_count(user_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET stats = jsonb_set(
    stats, 
    '{session_count}', 
    to_jsonb((stats->>'session_count')::int + 1)
  )
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_user_activity(user_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET last_active = NOW()
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cleanup function for expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_storage 
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a cron job to clean up expired OTPs (if pg_cron extension is available)
-- SELECT cron.schedule('cleanup-otps', '*/15 * * * *', 'SELECT cleanup_expired_otps();');

-- Insert default admin user (you can change this)
INSERT INTO users (id, name, email, role, profile, stats, security) 
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Admin User',
  'admin@appvik.com',
  'admin',
  '{"preferences": {"language": "en", "theme": "light", "notifications": true}}',
  '{"message_count": 0, "session_count": 0, "total_time_spent": 0}',
  '{"failed_login_attempts": 0, "two_factor_enabled": false}'
) ON CONFLICT (email) DO NOTHING;

-- Insert default owner user
INSERT INTO users (id, name, email, role, profile, stats, security) 
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Owner User',
  'owner@appvik.com',
  'owner',
  '{"preferences": {"language": "en", "theme": "light", "notifications": true}}',
  '{"message_count": 0, "session_count": 0, "total_time_spent": 0}',
  '{"failed_login_attempts": 0, "two_factor_enabled": false}'
) ON CONFLICT (email) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated; 