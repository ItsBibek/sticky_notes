interface AIConfig {
  apiKey: string;
  baseUrl: string;
}

export const setAIConfig = (config: AIConfig) => {
  // Implementation not needed for the current setup
};

export const rewriteText = async (text: string): Promise<string> => {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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