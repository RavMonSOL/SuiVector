# SuiVector - Social Trading Platform for NFTs and Meme Coins

## Overview

SuiVector is a social trading platform for vector-based NFTs and meme coins on the Sui blockchain. This application combines elements of social networking with cryptocurrency trading features, allowing users to connect, trade, and engage with the community.

The application follows a modern web architecture with:
- React frontend with Tailwind CSS and shadcn/ui components
- Express backend with API routes
- PostgreSQL database with Drizzle ORM
- Full TypeScript support throughout the stack

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and uses a component-based architecture with the following key technologies:

1. **React**: Main UI library for building the interface
2. **Tailwind CSS**: For styling components using utility classes
3. **shadcn/ui**: Component library built on Radix UI primitives
4. **Wouter**: Lightweight router for page navigation
5. **React Query**: For data fetching and state management

The frontend follows a pages/components pattern with shared UI components and page-specific implementations. The design system uses a dark theme by default, with light theme support through a theme provider.

### Backend Architecture

The backend uses a Node.js Express server with the following architecture:

1. **Express**: Web server framework handling API routes
2. **API Routes**: RESTful endpoints for data access organized by resource type
3. **Storage Layer**: Abstraction over database operations
4. **Drizzle ORM**: For type-safe database queries

The server follows an MVC-like pattern with route handlers delegating to storage operations. API routes are prefixed with `/api` for clear separation from frontend routes.

### Data Model

The application uses a relational database with the following core entities:

1. **Users**: Platform users with authentication info and profiles
2. **NFTs**: Digital collectibles with metadata and ownership
3. **Tokens**: Meme coins and cryptocurrency tokens
4. **Posts**: Social content that can reference NFTs or tokens
5. **Groups**: Trading communities and discussion forums

These entities have relationships like ownership, creation, and references between them (e.g., posts can reference NFTs).

## Key Components

### Frontend Components

1. **Layout Components**: 
   - `Sidebar`: Main navigation sidebar
   - `MobileNav`: Mobile-specific navigation

2. **UI Components**:
   - Comprehensive set of UI components from shadcn/ui
   - Customized components for the platform's needs

3. **Feature Components**:
   - `NFTCard`: For displaying NFTs with their metadata
   - `PostCard`: For social posts
   - `CoinRow`: For token/coin information
   - `WalletButton`: For connecting to crypto wallets
   - `TradeModal`: For executing trades

4. **Pages**:
   - `HomePage`: Main dashboard
   - `ProfilePage`: User profiles
   - `MarketplacePage`: NFT and token marketplace
   - `CreatePage`: Creation of NFTs and tokens
   - `ExplorePage`: Discovery of content and users
   - `GroupsPage`: Trading communities

### Backend Components

1. **Server Setup**: Configuration and middleware setup in `server/index.ts`
2. **Route Handlers**: API endpoints in `server/routes.ts`
3. **Storage Layer**: Database operations in `server/storage.ts`
4. **Development Tools**: Vite configuration in `server/vite.ts`

### Database Schema

The database schema (defined in `shared/schema.ts`) includes:

1. **users table**: Authentication and profile information
2. **nfts table**: Digital assets with metadata
3. **tokens table**: Cryptocurrency tokens
4. **posts table**: Social content
5. **groups table**: Trading communities (referenced in code but not in schema file)

## Data Flow

1. **User Interaction**:
   - User interacts with the frontend interface
   - React components update their local state

2. **API Requests**:
   - Frontend makes API requests to the backend using React Query
   - Requests are authenticated as needed

3. **Backend Processing**:
   - Express routes handle incoming requests
   - Routes delegate to storage layer for data operations
   - Storage layer interacts with the database using Drizzle ORM

4. **Response Handling**:
   - Backend returns JSON responses
   - Frontend updates UI based on received data
   - React Query manages caching and refetching

5. **Real-time Updates** (implied but not explicitly implemented):
   - Social features would likely benefit from real-time updates
   - WebSockets or similar technology would be needed for this

## External Dependencies

### Frontend Dependencies

- **UI Framework**: React with Tailwind CSS
- **Component Library**: shadcn/ui components built on Radix UI
- **Data Fetching**: TanStack React Query
- **Routing**: Wouter (lightweight alternative to React Router)
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form with Zod validation

### Backend Dependencies

- **Web Framework**: Express
- **Database ORM**: Drizzle ORM
- **Database Client**: Neon PostgreSQL serverless client
- **Validation**: Zod for schema validation
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Dependencies

- **Build Tools**: Vite, ESBuild
- **TypeScript**: For type safety across the stack
- **Replit Tooling**: Various Replit-specific plugins

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**:
   - `npm run dev` command starts both frontend and backend in development mode
   - Vite provides hot module replacement for frontend
   - Backend automatically restarts on changes

2. **Production Build**:
   - `npm run build` command builds both frontend and backend
   - Frontend is built with Vite and outputs to `dist/public`
   - Backend is bundled with ESBuild to `dist/index.js`

3. **Production Execution**:
   - `npm run start` runs the production build
   - Express serves static assets from the built frontend

4. **Database Management**:
   - Connected to a PostgreSQL database (likely Neon.tech based on imports)
   - Schema migrations managed with Drizzle Kit

The application supports deployment target "autoscale" in the Replit configuration, indicating it's designed to scale with traffic.

## Development Workflow

1. **Local Development**:
   - Run `npm run dev` to start the development server
   - Frontend is accessible on the exposed port, proxied through the backend

2. **Database Changes**:
   - Update schema in `shared/schema.ts`
   - Run `npm run db:push` to apply schema changes to the database

3. **TypeScript Checks**:
   - Run `npm run check` to verify type correctness

4. **Building for Production**:
   - Run `npm run build` to create optimized production build
   - Run `npm run start` to run the production build