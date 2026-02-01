# Wagmidle

Daily crypto guessing games. Test your knowledge of the crypto ecosystem with three unique game modes—guess the daily crypto figure, token, or NFT collection!

## Features

- **🎭 Character Game**: Guess the crypto personality of the day based on attribute clues.
- **🪙 Token Game**: Identify the mystery token using hints about network, category, and market cap.
- **🖼️ NFT Game**: Recognize the NFT collection from progressively revealed images.
- **📊 Stats & History**: Track your guessing streaks and past performance.
- **🔄 Daily Refresh**: New challenges every day at midnight UTC.

📖 **[View Game Rules](./docs/game-rules.md)**

## Tech Stack

This project is built with a modern web stack:

- [Next.js 15](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static typing for better developer experience
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [Vitest](https://vitest.dev/) - Blazing fast unit test framework

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components.
- `data/`: Static data and fixtures (e.g., characters, figures).
- `hooks/`: Custom React hooks.
- `types/`: TypeScript type definitions.
- `utils/`: Helper functions and utilities.
- `__tests__/`: Unit and integration tests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
