import express from 'express';
import OpenAI from 'openai';
import Image from '../models/Image.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Initialize OpenAI client with project API configuration
const initializeOpenAI = () => {
  try {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    
    if (!apiKey) {
      throw new Error('OpenAI API key is missing');
    }

    return new OpenAI({
      apiKey,
      baseURL: 'https://api.openai.com/v1'
    });
  } catch (error) {
    console.error('OpenAI initialization error:', error);
    return null;
  }
};

let openai = initializeOpenAI();

// Generate an image using AI
router.post('/generate', auth, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        message: 'Prompt is required and must be a string' 
      });
    }

    if (!openai) {
      openai = initializeOpenAI();
      if (!openai) {
        return res.status(500).json({ 
          message: 'Failed to initialize OpenAI client' 
        });
      }
    }

    console.log('Starting image generation with:', {
      prompt,
      apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10),
      hasOpenAI: !!openai
    });

    try {
      const imageRequest = {
        prompt,
        size: "1024x1024"
      };

      console.log('Making OpenAI request with:', imageRequest);

      const response = await openai.images.generate(imageRequest);

      console.log('OpenAI Response:', JSON.stringify(response, null, 2));

      if (!response.data?.[0]?.url) {
        throw new Error('No image URL in response');
      }

      return res.json({ imageUrl: response.data[0].url });

    } catch (openaiError) {
      console.error('OpenAI API Error:', {
        name: openaiError.name,
        message: openaiError.message,
        status: openaiError.status,
        type: openaiError.type,
        code: openaiError.code,
        data: openaiError.response?.data,
        headers: openaiError.response?.headers,
        stack: openaiError.stack
      });

      if (openaiError.status === 400) {
        return res.status(400).json({
          message: 'Invalid request to image generation API',
          details: openaiError.response?.data?.error?.message || openaiError.message
        });
      }

      if (openaiError.status === 401) {
        return res.status(401).json({
          message: 'Invalid API key'
        });
      }

      if (openaiError.status === 429) {
        return res.status(429).json({
          message: 'Rate limit exceeded'
        });
      }

      return res.status(500).json({
        message: 'Failed to generate image',
        details: openaiError.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      message: 'Internal server error',
      details: error.message
    });
  }
});

// Save a generated image
router.post('/', auth, async (req, res) => {
  try {
    const { prompt, imageUrl } = req.body;
    const creator = req.userId;

    const newImage = new Image({
      prompt,
      imageUrl,
      creator,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save image' });
  }
});

// Get all images for a user
router.get('/', auth, async (req, res) => {
  try {
    const images = await Image.find({ creator: req.userId }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// Delete an image
router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (image.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await image.deleteOne();
    res.json({ message: 'Image removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle favorite status
router.put('/:id/favorite', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (image.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    image.isFavorite = !image.isFavorite;
    await image.save();

    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
