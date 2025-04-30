# PixelMind - AI Image Generation Platform

## Overview

PixelMind is a powerful AI-powered image generation platform that allows users to create, share, and explore AI-generated artwork.

## Features

- 🎨 AI Image Generation
- 👥 User Authentication
- 💾 Image Storage & Management
- 🔍 Search & Browse Images
- 💫 Share Creations

## Tech Stack

- Node.js
- Express.js
- MongoDB
- OpenAI API
- JWT Authentication
- React.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Account
- OpenAI API Key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pixelmind.git
```

2. Install dependencies:

```bash
cd pixelmind
npm install
```

3. Configure environment variables:
   Create a `.env` file with the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

4. Start the server:

```bash
npm start
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/images/generate` - Generate new image
- `GET /api/images` - Get all images
- `GET /api/images/:id` - Get specific image

## Security

- JWT based authentication
- Encrypted password storage
- Secure API key handling

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
