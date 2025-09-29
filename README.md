# MVP Builder

A Next.js 14 application that helps non-technical people build products using AI. This wizard guides users through defining their product, setting preferences, and generating detailed prompts for building with Claude Code.

## Features

- **Step-by-step wizard** to define your product
- **AI-powered research** - Just describe your idea briefly and AI will create a detailed specification
- **Manual specification** - Option to paste your own detailed product spec
- **Preference questions** with time estimates
- **Smart checklist generation** based on project requirements
- **Feature management** with add/remove functionality
- **Detailed build prompts** for Claude Code
- **Beautiful purple/pink gradient UI** with glass morphism design
- **Responsive design** that works on mobile and desktop

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Lucide React for icons
- No authentication (stateless)
- No database (everything client-side)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your Anthropic API key
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

3. Get your Anthropic API key:
   - Visit [Anthropic Console](https://console.anthropic.com/)
   - Create an account or sign in
   - Generate an API key
   - Add it to your `.env.local` file

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `ANTHROPIC_API_KEY` with your API key
4. Deploy with zero configuration

## How It Works

1. **Project Idea Input**: 
   - **AI Research Mode**: Describe your idea briefly and AI will research and create a detailed specification
   - **Manual Mode**: Paste your own detailed product specification
2. **Preference Questions**: 5 multiple choice questions about scope, design, quality, etc.
3. **Review & Edit**: Users can modify project title and features
4. **Setup Checklist**: Automatically generates setup tasks based on project requirements
5. **Build Prompts**: Creates 7 detailed prompts for building with Claude Code

## Smart Detection

The app analyzes project descriptions to automatically include relevant setup items:
- Mentions "auth" or "login" → adds Supabase
- Mentions "reddit" → adds Reddit API setup
- Mentions "bluesky" → adds Bluesky credentials
- Mentions "openai" or "ai" → adds OpenAI API
- Mentions "payment" → adds Stripe setup

## License

MIT
