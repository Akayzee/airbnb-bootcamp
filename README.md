# Airbnb Clone - Full-Stack Rental Marketplace

A modern, full-featured Airbnb clone built with Next.js 15, featuring property listings, user authentication, booking management, and a comprehensive host onboarding flow.

## 🚀 Features

### For Guests
- **Browse Listings**: Explore properties with advanced filtering by location, price, amenities, and categories
- **Interactive Maps**: Mapbox integration for location visualization
- **Search & Discovery**: Smart search with location-based results
- **Reviews System**: Read and write reviews for properties
- **User Profiles**: Manage personal information and booking history

### For Hosts
- **Multi-Step Listing Creation**: Comprehensive 20+ step onboarding flow including:
  - Property structure and privacy type selection
  - Floor plan (guests, bedrooms, beds, bathrooms)
  - Location with map integration
  - Amenities selection (guest favorites, standout features, safety items)
  - Photo uploads
  - Title and description
  - Pricing (base price, weekend pricing, weekend premium)
  - Discount management (new listing, last-minute, weekly, monthly)
  - Legal and safety details (security cameras, noise monitors, weapons)
  - Instant booking settings
  
- **Listing Management**: Edit, publish/unpublish, and delete listings
- **Dashboard**: Track listing performance and bookings

### Authentication
- **Multiple Providers**: 
  - Google OAuth
  - Magic Link via Email (Resend)
- **Secure Sessions**: NextAuth v5 with JWT strategy
- **Protected Routes**: Automatic redirects and callback URLs

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI primitives
- **Animations**: Framer Motion, Motion
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Icons**: Lucide React, React Icons
- **Maps**: Mapbox GL JS + @mapbox/search-js-react

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma 6.17.1 with Accelerate
- **Auth**: NextAuth v5
- **Email**: Resend
- **API**: Next.js API Routes

### Developer Experience
- **Language**: TypeScript 5
- **Linting**: ESLint 9
- **Package Manager**: npm
- **Build Tools**: PostCSS, Tailwind CSS

## 📦 Installation

### Prerequisites
- Node.js 20+ 
- PostgreSQL database
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Prisma Accelerate)
DATABASE_URL="your_postgres_connection_string"

# NextAuth
AUTH_SECRET="your_nextauth_secret"
AUTH_GOOGLE_ID="your_google_oauth_client_id"
AUTH_GOOGLE_SECRET="your_google_oauth_client_secret"
AUTH_RESEND_KEY="your_resend_api_key"

# Mapbox
NEXT_PUBLIC_MAPBOX_KEY="your_mapbox_public_key"
```

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd airbnb-home
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed amenities data
npm run seed
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
airbnb-home/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── amenities-seed.ts      # Amenity seeding script
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages
│   │   ├── (protected)/      # Protected routes (host dashboard)
│   │   │   └── become-a-host/  # Multi-step listing creation
│   │   ├── (public)/         # Public pages
│   │   ├── api/              # API routes
│   │   └── layout.tsx        # Root layout
│   ├── actions/              # Server actions
│   │   ├── create-user.ts
│   │   ├── login.ts
│   │   └── listing/          # Listing CRUD operations
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── listings/        # Listing-specific components
│   │   ├── auth/            # Auth components
│   │   └── desktop/         # Desktop navigation
│   ├── db/                   # Database queries
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and constants
│   ├── auth.ts              # NextAuth configuration
│   └── middleware.ts        # Route protection middleware
├── public/
│   ├── images/              # Static images
│   └── videos/              # Static videos
└── generated/
    └── prisma/              # Generated Prisma Client
```

## 🗄️ Database Schema

### Core Models
- **User**: User accounts with authentication
- **Listing**: Property listings with comprehensive details
- **Review**: User reviews for listings
- **Amenity**: Available amenities for properties
- **Category**: Property categories (e.g., beachfront, cabins)
- **PrivacyType**: Property privacy types (entire place, private room, shared room)

### Auth Models (NextAuth)
- **Account**: OAuth provider accounts
- **Session**: User sessions
- **VerificationToken**: Email verification tokens
- **Authenticator**: WebAuthn credentials

## 🎨 Key Features Implementation

### Multi-Step Listing Creation
The listing creation flow is split into 20+ pages:
1. Overview (hosting type selection)
2. Structure (property type)
3. Privacy Type
4. Floor Plan
5. Location (with Mapbox integration)
6. Amenities
7. Photos
8. Title
9. Description
10. Pricing
11. Weekend Pricing
12. Discounts
13. Legal/Safety
14. Instant Booking
15. Visibility
16. Receipt/Confirmation

Each step validates data and updates the listing draft in real-time using Zustand state management.

### Authentication Flow
- Email magic links sent via Resend
- Google OAuth integration
- Protected routes with middleware
- Callback URL support for seamless redirects

### Pricing Features
- Base nightly price
- Weekend pricing with premium percentage
- Discount system:
  - New listing promotion (20% default)
  - Last-minute discounts
  - Weekly stay discounts (7+ nights)
  - Monthly stay discounts (28+ nights)
- Real-time validation to ensure weekly < monthly discounts

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Database
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run migrations in development
npx prisma studio   # Open Prisma Studio (database GUI)

# Utilities
npm run seed        # Seed amenities data
npm run lint        # Run ESLint
```

## 🔐 Authentication & Authorization

The app uses NextAuth v5 with:
- **JWT Strategy**: Stateless sessions
- **Prisma Adapter**: Database persistence
- **Multiple Providers**: Google and Email
- **Middleware Protection**: Automatic route guards
- **Session Management**: Secure token handling

## 🎯 Environment Setup

### Development
1. Use Prisma Accelerate for database connection pooling
2. Configure Google OAuth credentials
3. Set up Resend for email delivery
4. Add Mapbox API key for location services

### Production Deployment
- Deploy to Vercel for optimal Next.js performance
- Use Vercel Postgres or external PostgreSQL
- Set all environment variables in deployment platform
- Enable Prisma Accelerate for production database

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

Built with ❤️ using Next.js and Prisma
