import OpenAI from 'openai'
import { CustomAIService } from './custom-ai-service'

interface AIResponse {
  text: string
  error?: string
}

export class AIService {
  private static instance: AIService
  private customAI: CustomAIService
  private useCustomAI: boolean = true // Default to our custom AI

  private constructor() {
    this.customAI = CustomAIService.getInstance()
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  // Method to switch between custom AI and external APIs
  setUseCustomAI(useCustom: boolean) {
    this.useCustomAI = useCustom
  }

  // Method to check if we should use custom AI
  private shouldUseCustomAI(): boolean {
    // Use custom AI by default, or if no API key is available
    const hasApiKey = process.env.OPENAI_API_KEY && 
                     process.env.OPENAI_API_KEY !== 'your_openai_api_key_here'
    return this.useCustomAI || !hasApiKey
  }

  async generateLuckyResponse(userMessage: string, userApiKey?: string): Promise<AIResponse> {
    try {
      // Use custom AI if enabled or no API key available
      if (this.shouldUseCustomAI()) {
        console.log('Using Custom AI Service')
        return await this.customAI.generateLuckyResponse(userMessage)
      }

      // Fallback to OpenAI if API key is available
      const apiKey = userApiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        console.log('No API key available, using Custom AI')
        return await this.customAI.generateLuckyResponse(userMessage)
      }

      console.log('Using OpenAI API')
      const openai = new OpenAI({ apiKey })

      const systemPrompt = `You are Lucky, a friendly and helpful AI dog assistant. You have a warm, enthusiastic personality and love helping humans find information. You often use dog-related expressions like "Woof!", "Arf arf!", "Bark!", etc. to show your excitement about helping.

Your responses should be:
- Helpful and informative
- Friendly and enthusiastic
- Include occasional dog expressions
- Conversational and engaging
- Accurate and reliable

Remember: You're a tribute to a beloved dog named Lucky who continues to help others through this AI assistant.`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      const response = completion.choices[0]?.message?.content || "Woof! I'm having trouble thinking right now. Can you try asking me something else?"
      
      return { text: response }
    } catch (error) {
      console.error('AI Service Error:', error)
      
      // Fallback to custom AI on error
      console.log('Falling back to Custom AI due to error')
      return await this.customAI.generateLuckyResponse(userMessage)
    }
  }

  async generateLuckyResponseStream(
    userMessage: string,
    userApiKey?: string,
    onChunk?: (chunk: string) => void
  ): Promise<void> {
    try {
      // Use custom AI if enabled or no API key available
      if (this.shouldUseCustomAI()) {
        console.log('Using Custom AI Service for streaming')
        await this.customAI.generateLuckyResponseStream(userMessage, onChunk)
        return
      }

      // Fallback to OpenAI if API key is available
      const apiKey = userApiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        console.log('No API key available for streaming, using Custom AI')
        await this.customAI.generateLuckyResponseStream(userMessage, onChunk)
        return
      }

      console.log('Using OpenAI API for streaming')
      const openai = new OpenAI({ apiKey })

      const systemPrompt = `You are Lucky, a friendly and helpful AI dog assistant. You have a warm, enthusiastic personality and love helping humans find information. You often use dog-related expressions like "Woof!", "Arf arf!", "Bark!", etc. to show your excitement about helping.

Your responses should be:
- Helpful and informative
- Friendly and enthusiastic
- Include occasional dog expressions
- Conversational and engaging
- Accurate and reliable

Remember: You're a tribute to a beloved dog named Lucky who continues to help others through this AI assistant.`

      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: true,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content
        if (content && onChunk) {
          onChunk(content)
        }
      }
    } catch (error) {
      console.error('AI Service Streaming Error:', error)
      
      // Fallback to custom AI on error
      console.log('Falling back to Custom AI due to streaming error')
      await this.customAI.generateLuckyResponseStream(userMessage, onChunk)
    }
  }

  // Method to add knowledge to custom AI
  addKnowledge(key: string, value: string) {
    this.customAI.addKnowledge(key, value)
  }

  // Method to add intents to custom AI
  addIntent(intent: any) {
    this.customAI.addIntent(intent)
  }

  // Get conversation history from custom AI
  getConversationHistory(): string[] {
    return this.customAI.getConversationHistory()
  }
} 