import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { message, userApiKey, stream = false } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('API Key check:', userApiKey ? 'User API Key' : 'Global API Key');
    
    const aiService = AIService.getInstance();
    
    if (stream) {
      // Streaming response like ChatGPT
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            const response = await aiService.generateLuckyResponseStream(message, userApiKey, (chunk: string) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
            });
            
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          } catch (error) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Regular response
      const response = await aiService.generateLuckyResponse(message, userApiKey);
      return NextResponse.json({
        text: response.text,
        error: response.error
      });
    }

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        text: "Woof! I'm having trouble connecting right now. But don't worry, I'm still here to help!",
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
} 