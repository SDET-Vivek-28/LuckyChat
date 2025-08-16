/**
 * AI Service - Main interface for AI interactions
 * 
 * This service acts as a bridge between the chat interface and the AI backend.
 * It can use either our custom AI system or external APIs based on configuration.
 * 
 * Copyright © 2024 Appvik. All rights reserved.
 */

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
    // Always use custom AI - we don't want external dependencies
    return true
  }

  async generateLuckyResponse(userMessage: string, userApiKey?: string): Promise<AIResponse> {
    try {
      // Always use our custom AI service
      console.log('Using Custom AI Service')
      return await this.customAI.generateLuckyResponse(userMessage)
    } catch (error) {
      console.error('AI Service Error:', error)
      
      // Provide a helpful fallback response
      return { 
        text: "Woof! I'm having trouble thinking right now. But don't worry, I'm still here to help! Can you try asking me something else?" 
      }
    }
  }

  async generateLuckyResponseStream(
    userMessage: string,
    userApiKey?: string,
    onChunk?: (chunk: string) => void
  ): Promise<void> {
    try {
      // Always use our custom AI service for streaming
      console.log('Using Custom AI Service for streaming')
      await this.customAI.generateLuckyResponseStream(userMessage, onChunk)
    } catch (error) {
      console.error('AI Service Streaming Error:', error)
      
      // Provide a helpful fallback response
      if (onChunk) {
        onChunk("Woof! I'm having trouble thinking right now. But don't worry, I'm still here to help!")
      }
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