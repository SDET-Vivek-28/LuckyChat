# 🚀 LuckyChat - AI-Powered Educational Chat Assistant

> **Copyright © 2024 Appvik. All rights reserved.**

LuckyChat is a comprehensive AI-powered educational chat assistant that provides personalized learning experiences across multiple subjects including veterinary science, mathematics, science, history, and more. Built with Next.js, TypeScript, and powered by a custom AI knowledge base.

## ✨ Features

### 🎓 **Educational Knowledge Base**
- **Veterinary Science**: Comprehensive animal health and care information
- **K-12 Education**: Complete curriculum coverage from 1st to 12th standard
- **Cross-Subject Learning**: Integrated knowledge across multiple disciplines
- **Advanced Topics**: College-level and specialized subject matter

### 🤖 **AI Capabilities**
- **Custom AI Model**: Proprietary knowledge base with no external API dependencies
- **Intent Recognition**: Smart understanding of user queries and context
- **Cross-Questioning**: Handles follow-up questions and clarifications
- **Resource Recommendations**: Suggests YouTube links, PDFs, and diagrams

### 🔐 **Authentication & Security**
- **Multi-Method Login**: Email/password and mobile/OTP verification
- **Role-Based Access**: User, Admin, and Owner roles with appropriate permissions
- **Secure OTP System**: Time-limited, attempt-limited verification codes
- **Row-Level Security**: Database-level data protection

### 📱 **Advanced Features**
- **Voice Input/Output**: Talk to LuckyChat like Siri/Alexa
- **Image Recognition**: Upload photos for AI analysis and explanations
- **Code Generation**: Programming help and math problem solving
- **Language Translation**: Multi-language support for Indian languages

### 📊 **Analytics & Monitoring**
- **User Analytics**: Track engagement, usage patterns, and learning progress
- **Admin Dashboard**: Comprehensive insights for administrators
- **Real-Time Updates**: Live data synchronization across all users
- **Performance Metrics**: Monitor system health and user satisfaction

## 🏗️ Architecture

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Zustand**: Lightweight state management

### **Backend**
- **Supabase**: PostgreSQL database with real-time capabilities
- **Row-Level Security**: Database-level access control
- **Real-Time Subscriptions**: Live updates for chat and analytics
- **API Routes**: RESTful endpoints for all operations

### **AI Engine**
- **Custom Knowledge Base**: Proprietary educational content
- **Intent Recognition**: Natural language understanding
- **Context Awareness**: Maintains conversation context
- **Resource Generation**: Creates learning materials on demand

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### **1. Clone Repository**
```bash
git clone https://github.com/SDET-Vivek-28/AI_Powered_Lucky.git
cd AI_Powered_Lucky
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Supabase**
1. Create a project at [supabase.com](https://supabase.com)
2. Copy `env.example` to `.env.local`
3. Fill in your Supabase credentials
4. Run the SQL schema from `supabase/schema.sql`

### **4. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 🗄️ Database Setup

### **Supabase Configuration**
1. **Create Project**: Sign up at [supabase.com](https://supabase.com)
2. **Run Schema**: Execute `supabase/schema.sql` in SQL Editor
3. **Get Credentials**: Copy URL and anon key from Settings → API
4. **Environment Variables**: Add to `.env.local`

### **Database Schema**
- **Users**: Authentication, profiles, and preferences
- **Auth Logs**: Security event tracking
- **Chat Messages**: Conversation history and metadata
- **User Analytics**: Learning progress and engagement metrics
- **OTP Storage**: Secure verification code management

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run deploy:prod  # Production deployment
npm run deploy:vercel # Deploy to Vercel
```

### **Database Operations**
```bash
npm run db:setup     # Database setup instructions
npm run db:migrate   # Migration information
npm run db:reset     # Reset instructions
```

### **Code Structure**
```
├── app/                 # Next.js App Router
│   ├── api/            # API endpoints
│   └── page.tsx        # Main chat interface
├── components/          # React components
├── lib/                 # Utility libraries
│   ├── supabase.ts     # Supabase client
│   ├── supabase-database.ts # Database service
│   └── custom-ai-service.ts # AI knowledge base
├── store/               # State management
├── supabase/            # Database schema
└── scripts/             # Deployment scripts
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Manual Deployment**
```bash
# Build the application
npm run build

# Deploy to production
npm run deploy:prod
```

### **Environment Variables**
Required for production:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Optional for enhanced features:
```env
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📊 Monitoring & Analytics

### **Supabase Dashboard**
- **Database**: Monitor table performance and queries
- **Authentication**: Track user sign-ups and logins
- **Logs**: View system errors and performance metrics
- **Storage**: Monitor database usage and growth

### **Application Metrics**
- **User Engagement**: Message counts, session duration
- **Learning Progress**: Subject coverage and topic mastery
- **System Performance**: Response times and error rates
- **Feature Usage**: Voice, image, and translation adoption

## 🔒 Security Features

### **Data Protection**
- **Row-Level Security**: Users can only access their own data
- **Encrypted Storage**: Sensitive data is encrypted at rest
- **Secure Authentication**: Multi-factor verification options
- **API Rate Limiting**: Protection against abuse

### **Privacy Compliance**
- **GDPR Ready**: User data control and deletion
- **Data Minimization**: Only collect necessary information
- **Transparent Policies**: Clear data usage guidelines
- **User Consent**: Explicit permission for data processing

## 🤝 Contributing

### **Development Guidelines**
1. Follow TypeScript best practices
2. Use conventional commit messages
3. Test all changes thoroughly
4. Update documentation as needed

### **Code Standards**
- **ESLint**: Enforce code quality
- **Prettier**: Consistent formatting
- **TypeScript**: Strict type checking
- **Testing**: Unit and integration tests

## 📚 Documentation

- **[Supabase Setup Guide](SUPABASE_SETUP.md)**: Complete database configuration
- **[API Reference](docs/API.md)**: Endpoint documentation
- **[Component Library](docs/COMPONENTS.md)**: UI component guide
- **[Deployment Guide](docs/DEPLOYMENT.md)**: Production deployment steps

## 🆘 Support

### **Getting Help**
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and examples
- **Community**: Join discussions and share knowledge
- **Email**: support@appvik.com

### **Common Issues**
- **Database Connection**: Check Supabase credentials and network
- **Build Errors**: Verify TypeScript types and dependencies
- **Authentication**: Ensure OTP services are configured
- **Performance**: Monitor database queries and optimize

## 📄 License

**Copyright © 2024 Appvik. All rights reserved.**

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 🙏 Acknowledgments

- **Next.js Team**: Amazing React framework
- **Supabase Team**: Excellent database platform
- **Tailwind CSS**: Beautiful utility-first CSS
- **Open Source Community**: Inspiring tools and libraries

---

**Built with ❤️ by the Appvik Team**

For support, contact: support@appvik.com  
Visit us: https://appvik.com 
