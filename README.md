# PodBite AI 

## Overview

PodBite AI is a Next.js application that provides AI-powered summaries of YouTube podcast videos. Users can paste a YouTube URL, and the system will generate a concise summary along with key insights and questions. The application features user authentication, a coin-based payment system for summaries, and a dashboard to view past summaries.

## Key Features

- **AI-Powered Summaries**: Uses Google's Gemini AI to generate detailed summaries of podcast videos
- **User Authentication**: Google OAuth integration for secure sign-in
- **Coin System**: Users start with 50 coins and spend 10 coins per summary
- **Dashboard**: View and manage all your past summaries
- **Responsive Design**: Works on mobile and desktop devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **AI**: Google Gemini via LangChain
- **State Management**: React hooks and server components
- **Deployment**: Vercel (recommended)

## Project Structure

```
podbite-ai/
├── app/
│   ├── api/
│   │   ├── add-url/route.ts         # Endpoint to add new URLs
│   │   ├── auth/[...nextauth]/      # NextAuth configuration
│   │   └── summarize/route.ts       # Endpoint to generate summaries
│   ├── dashboard/                   # User dashboard
│   ├── summarize/                   # Summary viewing page
│   ├── error.tsx                    # Error boundary
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   ├── loading.tsx                  # Loading component
│   ├── not-found.tsx                # 404 page
│   └── page.tsx                     # Homepage
├── components/
│   ├── auth/                        # Authentication components
│   ├── common/                      # Shared components
│   ├── dashboard/                   # Dashboard components
│   ├── landing/                     # Marketing page components
│   ├── summary/                     # Summary display components
│   └── ui/                          # shadcn/ui components
├── lib/
│   ├── langchain.ts                 # AI model configuration
│   ├── prisma.ts                    # Database client
│   ├── prompts.ts                   # AI prompt templates
│   └── utils.ts                     # Utility functions
├── prisma/
│   ├── migrations/                  # Database migrations
│   └── schema.prisma               # Database schema
├── public/                          # Static assets
├── src/
│   ├── actions/                     # Server actions
│   ├── middleware.ts                # Route protection
│   ├── providers/                   # Context providers
│   └── types.ts                     # Type definitions
├── validations/                     # Form validation
├── .eslintrc.json                   # ESLint config
├── next.config.js                   # Next.js config
├── package.json                     # Project dependencies
├── postcss.config.js                # PostCSS config
├── tailwind.config.js               # Tailwind config
└── tsconfig.json                    # TypeScript config
```

## Database Schema

The application uses PostgreSQL with the following models:

1. **User**: Stores user information from OAuth providers
2. **Summary**: Contains podcast summaries with URLs and AI responses
3. **Transactions**: Records coin purchases
4. **CoinSpend**: Tracks when users spend coins on summaries
5. **Products**: Stores available coin packages for purchase

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/podbite-ai.git
   cd podbite-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required values in the `.env` file.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The easiest way to deploy PodBite AI is using Vercel:

1. Push your code to a GitHub repository
2. Create a new project in Vercel and connect your repository
3. Add all required environment variables
4. Deploy!

## Usage

1. **Sign in** with your Google account
2. **Paste a YouTube URL** of a podcast video
3. The system will:
   - Verify you have enough coins (10 coins per summary)
   - Extract the video transcript
   - Generate an AI summary with key points and questions
   - Deduct coins from your balance
4. View and manage all your summaries in the dashboard

## Customization

- **Branding**: Update colors in `src/app/globals.css`
- **AI Prompts**: Modify templates in `src/lib/prompts.ts`
- **Pricing**: Adjust coin values in the database or UI components

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
