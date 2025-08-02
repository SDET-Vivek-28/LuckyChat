# LuckyChat 🐕

A tribute to Lucky - Your Talking Dog AI Assistant

LuckyChat is a beautiful web and mobile application featuring an AI-powered dog assistant that helps users find information quickly. This project is a heartfelt tribute to a beloved companion who continues to help others through technology.

## Features

- 🤖 **AI-Powered Assistant**: Real-time responses using OpenAI GPT
- 🐕 **Dog-Themed Design**: Beautiful UI with paw prints and dog animations
- 📱 **Cross-Platform**: Web app + React Native mobile app (Android & iOS)
- 💬 **Real-time Chat**: Smooth chat interface with typing indicators
- 🎨 **Modern UI**: Responsive design with animations and gradients
- 🔄 **State Management**: Zustand for efficient state management

## Tech Stack

### Web Application
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **OpenAI API** - AI chat responses

### Mobile Application
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation between screens
- **Linear Gradient** - Beautiful gradient backgrounds
- **Vector Icons** - Material Design icons

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- OpenAI API key (for AI functionality)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd LuckyChat
```

### 2. Install Dependencies
```bash
# Install web app dependencies
npm install

# Install mobile app dependencies
cd mobile
npm install
cd ..
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```bash
# Copy the example file
cp env.example .env.local

# Edit the file and add your OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the Web Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Start the Mobile Application

#### For Android:
```bash
cd mobile
npm run android
```

#### For iOS:
```bash
cd mobile
npm run ios
```

## Project Structure

```
LuckyChat/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ChatMessage.tsx    # Chat message component
│   └── LuckyAvatar.tsx    # Lucky's avatar
├── lib/                   # Utility libraries
│   └── ai-service.ts      # AI service integration
├── store/                 # State management
│   └── chatStore.ts       # Chat state store
├── mobile/                # React Native app
│   ├── src/
│   │   └── screens/       # Mobile screens
│   └── App.tsx            # Mobile app entry
└── README.md
```

## AI Integration

The app uses OpenAI's GPT model to generate responses. Lucky is programmed with a friendly, enthusiastic personality and uses dog-related expressions like "Woof!", "Arf arf!", and "Bark!" to make conversations more engaging.

### Getting an OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Add it to your `.env.local` file

## Customization

### Changing Lucky's Personality
Edit the system prompt in `lib/ai-service.ts` to modify Lucky's personality and responses.

### Styling
- Web: Modify `tailwind.config.js` and `app/globals.css`
- Mobile: Edit styles in individual screen components

### Adding Features
- New chat features: Add to `store/chatStore.ts`
- API endpoints: Create new files in `app/api/`
- Mobile screens: Add to `mobile/src/screens/`

## Deployment

### Web Application
```bash
npm run build
npm start
```

### Mobile Application
```bash
cd mobile
# For Android
npx react-native run-android --variant=release

# For iOS
npx react-native run-ios --configuration=Release
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own AI assistant!

## Tribute

This project is dedicated to Lucky, a beloved dog who inspired this AI assistant. Through technology, Lucky continues to help and bring joy to people around the world. 🐕❤️

---

**Made with ❤️ and lots of 🐕 woofs!**

---

**Powered by Appvik** 🚀 