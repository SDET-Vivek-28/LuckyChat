# 🚀 LuckyChat Supabase Setup Guide

This guide will help you set up Supabase (PostgreSQL database) for LuckyChat production deployment.

## 📋 Prerequisites

- [Supabase Account](https://supabase.com) (Free tier available)
- [GitHub Account](https://github.com) (for deployment)
- [Vercel Account](https://vercel.com) (for hosting)

## 🎯 Step 1: Create Supabase Project

### 1.1 Sign Up/Login to Supabase
- Go to [https://supabase.com](https://supabase.com)
- Click "Start your project" or "Sign In"
- Sign in with GitHub or create account

### 1.2 Create New Project
- Click "New Project"
- Choose your organization
- Enter project details:
  - **Name:** `lucky-chat`
  - **Database Password:** Choose a strong password (save this!)
  - **Region:** Choose closest to your users (e.g., `Asia Pacific (Mumbai)` for India)
- Click "Create new project"

### 1.3 Wait for Setup
- Project setup takes 2-3 minutes
- You'll see "Project is ready" when complete

## 🗄️ Step 2: Set Up Database Schema

### 2.1 Access SQL Editor
- In your Supabase project dashboard
- Go to **SQL Editor** in the left sidebar
- Click **"New query"**

### 2.2 Run Schema Script
- Copy the entire content from `supabase/schema.sql`
- Paste it into the SQL editor
- Click **"Run"** to execute

### 2.3 Verify Tables Created
- Go to **Table Editor** in left sidebar
- You should see these tables:
  - `users`
  - `auth_logs`
  - `chat_messages`
  - `user_analytics`
  - `otp_storage`

## 🔑 Step 3: Get API Keys

### 3.1 Project Settings
- Go to **Settings** → **API** in left sidebar
- Copy these values:

### 3.2 Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🌐 Step 4: Configure Environment Variables

### 4.1 Local Development
- Copy `env.example` to `.env.local`
- Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4.2 Vercel Deployment
- Go to your Vercel project dashboard
- Go to **Settings** → **Environment Variables**
- Add the same variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔐 Step 5: Configure Authentication

### 5.1 Enable Email Auth
- In Supabase dashboard, go to **Authentication** → **Providers**
- Enable **Email** provider
- Configure settings as needed

### 5.2 Set Up Row Level Security (RLS)
- RLS is already configured in the schema
- Users can only access their own data
- Admins can access all data

## 📱 Step 6: Configure OTP Services (Optional)

### 6.1 SMS OTP with Twilio
- Sign up at [Twilio](https://twilio.com)
- Get Account SID and Auth Token
- Add to environment variables:
```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 6.2 Email OTP with Gmail
- Enable 2FA on your Gmail account
- Generate App Password
- Add to environment variables:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@luckychat.com
```

## 🚀 Step 7: Test the Setup

### 7.1 Local Testing
```bash
# Install dependencies
npm install

# Set environment variables
cp env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

### 7.2 Test Database Connection
- Open [http://localhost:3000](http://localhost:3000)
- Try to sign up/sign in
- Check Supabase dashboard for new users

## 📊 Step 8: Monitor and Maintain

### 8.1 Database Monitoring
- **Supabase Dashboard** → **Database** → **Logs**
- Monitor query performance
- Check for errors

### 8.2 User Analytics
- **Table Editor** → `user_analytics`
- View daily user statistics
- Monitor growth trends

### 8.3 Authentication Logs
- **Table Editor** → `auth_logs`
- Track login attempts
- Monitor security events

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "Missing Supabase environment variables"
- Check `.env.local` file exists
- Verify variable names are correct
- Restart development server

#### 2. "Database connection failed"
- Check Supabase project is active
- Verify API keys are correct
- Check internet connection

#### 3. "RLS policy violation"
- Check user authentication
- Verify RLS policies are enabled
- Check user permissions

#### 4. "OTP verification failed"
- Check OTP expiration (10 minutes)
- Verify OTP attempts limit (3 attempts)
- Check database connection

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to Git
- Use strong, unique passwords
- Rotate API keys regularly

### 2. Database Security
- RLS policies are already configured
- Users can only access their own data
- Admins have controlled access

### 3. API Security
- All endpoints validate user authentication
- Input validation on all requests
- Rate limiting recommended for production

## 📈 Performance Optimization

### 1. Database Indexes
- Already configured in schema
- Monitor query performance
- Add indexes for slow queries

### 2. Connection Pooling
- Supabase handles this automatically
- Monitor connection usage
- Scale up if needed

### 3. Caching
- Implement Redis for session storage
- Cache frequently accessed data
- Use CDN for static assets

## 🚀 Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables configured
- [ ] Local testing successful
- [ ] Vercel environment variables set
- [ ] Production deployment tested
- [ ] OTP services configured (optional)
- [ ] Monitoring setup complete

## 📞 Support

### Supabase Support
- [Documentation](https://supabase.com/docs)
- [Community](https://github.com/supabase/supabase/discussions)
- [Discord](https://discord.supabase.com)

### LuckyChat Support
- Check GitHub issues
- Review error logs
- Test with minimal configuration

## 🎉 Congratulations!

You now have a production-ready database for LuckyChat with:
- ✅ **Real PostgreSQL database**
- ✅ **User authentication & management**
- ✅ **Secure data storage**
- ✅ **Real-time capabilities**
- ✅ **Analytics & monitoring**
- ✅ **Scalable architecture**

Your LuckyChat is now ready for production use! 🚀✨ 