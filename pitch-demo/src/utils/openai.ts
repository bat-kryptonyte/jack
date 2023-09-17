import axios from 'axios';
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';

export const getAIResponse = async (message: string) => {
  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error fetching response';
  }
};
