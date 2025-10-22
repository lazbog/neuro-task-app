# Neuro Task App

A modern task management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Real-time task counters
- Clean and responsive UI
- Keyboard shortcuts (Enter to save, Escape to cancel)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Class Variance Authority (CVA)
- clsx & tailwind-merge

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/ui/` - Reusable UI components
- `lib/` - Utility functions and helpers

## API Endpoints

- `GET /api/ping` - Health check endpoint

## Build

```bash
npm run build
```

## Start

```bash
npm start
```