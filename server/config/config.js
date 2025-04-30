import 'dotenv/config';

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pixelmind',
  jwtSecret: process.env.JWT_SECRET,
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    isProjectKey: process.env.OPENAI_API_KEY?.startsWith('sk-proj-'),
    baseURL: 'https://api.openai.com/v1',
    defaultModel: 'dall-e-2'
  }
};

// Validate OpenAI configuration
const openaiKey = process.env.OPENAI_API_KEY?.trim();
if (!openaiKey) {
  console.error('Error: OPENAI_API_KEY is missing');
} else {
  console.log('OpenAI configuration:', {
    keyType: openaiKey.startsWith('sk-proj-') ? 'Project' : 'Standard',
    keyPrefix: openaiKey.substring(0, 7)
  });
}

export const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};