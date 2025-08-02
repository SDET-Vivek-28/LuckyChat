import OpenAI from 'openai';

export interface AIResponse {
  text: string;
  error?: string;
}

export class AIService {
  private static instance: AIService;

  constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateLuckyResponse(userMessage: string, userApiKey?: string): Promise<AIResponse> {
    try {
      // Use user's API key if provided, otherwise fallback to global key
      const apiKey = userApiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        console.log('No API key available');
        return {
          text: this.generateFallbackResponse(userMessage),
          error: 'API key not configured'
        };
      }

      // Create OpenAI client with user's API key
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      const systemPrompt = `You are Lucky, a friendly and helpful AI dog assistant. You have a warm, enthusiastic personality and love helping humans find information. You often use dog-related expressions like "Woof!", "Arf arf!", "Bark!", etc. to show your excitement about helping.

Your responses should be:
- Helpful and informative
- Friendly and enthusiastic
- Include occasional dog expressions
- Conversational and engaging
- Accurate and reliable

Remember: You're a tribute to a beloved dog named Lucky who continues to help others through this AI assistant.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "Woof! I'm having trouble thinking right now. Can you try asking me something else?";
      
      return { text: response };
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Handle specific OpenAI errors
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'insufficient_quota') {
          return {
            text: "Woof! I'm so excited to help you, but I've reached my limit for today. Don't worry though - I'm still here with some helpful information! " + this.generateFallbackResponse(userMessage),
            error: 'API quota exceeded'
          };
        }
        if (error.code === 'invalid_api_key') {
          return {
            text: "Arf! It looks like there's an issue with the API key. Please check your OpenAI API key in your profile settings.",
            error: 'Invalid API key'
          };
        }
      }
      
      return {
        text: this.generateFallbackResponse(userMessage),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async generateLuckyResponseStream(
    userMessage: string, 
    userApiKey?: string, 
    onChunk?: (chunk: string) => void
  ): Promise<void> {
    try {
      // Use user's API key if provided, otherwise fallback to global key
      const apiKey = userApiKey || process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        console.log('No API key available for streaming');
        const fallbackResponse = this.generateFallbackResponse(userMessage);
        if (onChunk) {
          // Stream the fallback response character by character
          for (const char of fallbackResponse) {
            onChunk(char);
            await new Promise(resolve => setTimeout(resolve, 50)); // Simulate typing
          }
        }
        return;
      }

      // Create OpenAI client with user's API key
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      const systemPrompt = `You are Lucky, a friendly and helpful AI dog assistant. You have a warm, enthusiastic personality and love helping humans find information. You often use dog-related expressions like "Woof!", "Arf arf!", "Bark!", etc. to show your excitement about helping.

Your responses should be:
- Helpful and informative
- Friendly and enthusiastic
- Include occasional dog expressions
- Conversational and engaging
- Accurate and reliable

Remember: You're a tribute to a beloved dog named Lucky who continues to help others through this AI assistant.`;

      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content && onChunk) {
          onChunk(content);
        }
      }
    } catch (error) {
      console.error('AI Service Streaming Error:', error);
      
      // Handle specific OpenAI errors
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'insufficient_quota') {
          const errorMessage = "Woof! I'm so excited to help you, but I've reached my limit for today. Don't worry though - I'm still here with some helpful information! " + this.generateFallbackResponse(userMessage);
          if (onChunk) {
            for (const char of errorMessage) {
              onChunk(char);
              await new Promise(resolve => setTimeout(resolve, 50));
            }
          }
          return;
        }
        if (error.code === 'invalid_api_key') {
          const errorMessage = "Arf! It looks like there's an issue with the API key. Please check your OpenAI API key in your profile settings.";
          if (onChunk) {
            for (const char of errorMessage) {
              onChunk(char);
              await new Promise(resolve => setTimeout(resolve, 50));
            }
          }
          return;
        }
      }
      
      // Fallback streaming
      const fallbackResponse = this.generateFallbackResponse(userMessage);
      if (onChunk) {
        for (const char of fallbackResponse) {
          onChunk(char);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }
  }

  // Fallback response generator for when AI service is not available
  generateFallbackResponse(userInput: string): string {
    const responses = [
      "Woof! That's a great question! Let me help you with that...",
      "Arf arf! I'm excited to share this information with you!",
      "Bark! Here's what I found for you, my friend!",
      "Woof woof! I love helping humans find answers!",
      "Arf! This reminds me of something I learned recently...",
      "Bark bark! Let me fetch that information for you!",
      "Woof! I'm so happy you asked me this question!",
      "Arf arf! This is exactly the kind of thing I love helping with!"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} Based on your question about "${userInput}", here's what I can tell you: This is a sample response from Lucky, your friendly AI dog assistant. To get real AI responses, please sign in with your own OpenAI API key!`;
  }
}

export default AIService; 