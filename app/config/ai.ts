import { setAIConfig } from '../services/ai';

export const initializeAI = () => {
  setAIConfig({
    apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || '',
    baseUrl: process.env.NEXT_PUBLIC_AI_BASE_URL || '',
  });
}; 