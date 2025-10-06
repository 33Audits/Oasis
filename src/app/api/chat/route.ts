// app/api/chat/route.ts
import { streamText } from 'ai';
import { openRouterProvider } from '@/lib/ai/providers';
import { systemPrompt } from '@/lib/ai/prompts';
import { getTools } from '@/lib/ai/tools/tool-agents';
import { z } from 'zod';

const ContextSchema = z.object({
  walletAddress: z.string().optional(),
  agentId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const { messages, context } = await request.json();
    
    const validationResult = ContextSchema.safeParse(context);
    if (!validationResult.success) {
      return new Response(JSON.stringify(validationResult.error.errors), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { walletAddress, agentId } = validationResult.data;

    // Get dynamic tools based on selected agent
    let dynamicTools = {};
    try {
      dynamicTools = await getTools(agentId as any);
    } catch (error) {
      console.error('Error loading dynamic tools:', error);
    }

    const result = streamText({
      model: openRouterProvider('google/gemini-2.5-flash'),
      system: systemPrompt({ walletAddress }),
      messages,
      tools: dynamicTools,
      maxSteps: 5,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}