# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is IgnitionAI's landing page - a React/TypeScript application built with Vite showcasing AI services including RAG systems, chatbots, LLM integration, and AI agents. The application features multilingual support (French/English), interactive vector database demos, and integration with external AI services.

## Development Commands

- **Start development server**: `pnpm dev`
- **Build for production**: `pnpm build` 
- **Lint code**: `pnpm lint`
- **Preview production build**: `pnpm preview`

**Package Manager**: This project uses pnpm (version 10.8.0+). Always use `pnpm` instead of npm or yarn.

## Architecture Overview

### Core Structure
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot reload
- **Styling**: TailwindCSS with dark mode support
- **State Management**: Zustand for global state (RAG vectors)
- **Internationalization**: Custom i18n system with French/English support

### Key Components Architecture

**Main App (`src/App.tsx`)**:
- Single-page application with hero section, services showcase, features, and contact form
- Manages global state for language selection and modal states
- Integrates with Telegram service and RAG store

**State Management (`src/store/ragStore.ts`)**:
- Zustand store managing vector database state with global persistence
- Handles vector CRUD operations and API communication
- Uses environment-specific endpoints (dev proxy vs production URL)

**AI Integration**:
- OpenAI integration via `src/hooks/useOpenAI.ts` (GPT-4.1 nano model)
- TensorFlow.js integration for vector embeddings using Universal Sentence Encoder
- Vector similarity search capabilities in `VectorDbDemo.tsx`

### API Configuration

**Development**: Vite proxy redirects `/api/*` to `https://rust-chatbot-service.onrender.com`
**Production**: Direct calls to external Rust-based API service

### Component Organization

**UI Components** (`src/components/`):
- Modern, polished component structure with specialized modals (Service, About, VectorDb)
- Interactive components: ChatButton, VectorDbButton with enhanced loading states
- Responsive design with mobile-first approach and modern UI elements
- Glass-morphism design patterns and gradient effects throughout

**Hooks** (`src/hooks/`):
- Consolidated custom hooks for external service integration (OpenAI, Telegram, Sentence Encoder)
- All hooks now unified under single `hooks/` directory

### Environment Variables

Required environment variables:
- `VITE_OPENAI_API_KEY`: OpenAI API key for GPT integration
- Environment detection via `import.meta.env.PROD` for API endpoint switching

### External Dependencies

Key integrations:
- **AI/ML**: TensorFlow.js, Universal Sentence Encoder, OpenAI SDK
- **UI**: Lucide React icons, React Markdown
- **Utils**: Zustand state management, Next-intl for internationalization

## Development Notes

- The application includes a working vector database demo that uses TensorFlow.js for embeddings
- Telegram integration is present but may require additional configuration
- The build uses Vite optimizations with Lucade React excluded from optimization
- Modern UI with glass-morphism effects, gradients, and enhanced visual hierarchy
- Removed YouTube video section (content was banned)
- All hooks consolidated under single directory structure
- Code cleaned and optimized for better performance