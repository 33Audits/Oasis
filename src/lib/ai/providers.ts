// lib/ai/providers.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const openRouterProvider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});