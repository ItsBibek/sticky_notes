interface AIConfig {
  apiKey: string;
  baseUrl: string;
}

let aiConfig: AIConfig = {
  apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_AI_BASE_URL || '',
};

export const setAIConfig = (config: AIConfig) => {
  aiConfig = config;
};

export const rewriteText = async (text: string): Promise<string> => {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'rewrite',
        payload: { text },
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rewrittenText || text;
  } catch (error) {
    console.error('Error rewriting text:', error);
    return text;
  }
}; 