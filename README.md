# Care.xyz - Baby Sitting & Elderly Care Service Platform

A full-stack web application connecting families with trusted, verified caregivers for children, elderly, and special-needs individuals.

## 🚀 Tech Stack

- **Framework:** Next.js 15+ (App Router, Server Components, Server Actions)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + daisyUI + shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **Authentication:** NextAuth.js (Google OAuth + Credentials)
- **Payment:** Stripe Checkout (test mode)
- **Email:** Resend + React Email
- **File Upload:** Cloudinary
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google OAuth credentials
- Stripe account (test mode)
- Resend account
- Cloudinary account

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd care-xyz
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Supabase
DATABASE_URL=your_supabase_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend
RESEND_API_KEY=your_resend_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the schema SQL:
   ```bash
   # Copy contents of supabase/schema.sql and run in Supabase SQL Editor
   ```
3. Run the seed data:
   ```bash
   # Copy contents of supabase/seed.sql and run in Supabase SQL Editor
   ```

### 4. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Add the output to `NEXTAUTH_SECRET` in `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (main)/          # Public pages
│   ├── (protected)/     # Protected client pages
│   ├── (caregiver)/     # Caregiver dashboard
│   ├── (admin)/         # Admin dashboard
│   ├── api/             # API routes
│   └── providers.tsx    # Context providers
├── components/          # Reusable components
├── lib/                 # Utilities and configs
│   ├── auth.ts         # NextAuth configuration
│   ├── supabase.ts     # Supabase client
│   └── validators/     # Zod schemas
├── types/              # TypeScript types
└── server/
    └── actions/        # Server Actions
```

## 🎯 Features Implemented

### Phase 1 - Foundation ✅

- [x] Project setup with Next.js 15 + TypeScript
- [x] Tailwind CSS + daisyUI configuration
- [x] Homepage with all sections
- [x] Services listing and detail pages
- [x] Caregiver browse and profile pages
- [x] Custom UI components

### Phase 2 - Authentication & Core Features 🚧

- [x] NextAuth.js setup with Google OAuth
- [x] Login and registration pages
- [x] Database schema and seed data
- [ ] Booking flow (4-step process)
- [ ] My Bookings page
- [ ] User profile management

### Phase 3 - Integrations 📋

- [ ] Stripe Checkout integration
- [ ] Email system with Resend
- [ ] Cloudinary file uploads
- [ ] Server Actions for CRUD operations

### Phase 4 - Dashboards 📋

- [ ] Caregiver dashboard
- [ ] Admin dashboard
- [ ] Review and rating system
- [ ] Dark mode support

## 🔐 Demo Credentials

After running the seed data:

**Admin:**

- Email: admin@care.xyz
- Password: Admin123!

**Client:**

- Email: john@example.com
- Password: Client123!

**Caregiver:**

- Email: sarah@example.com
- Password: Caregiver123!

## 🧪 Testing

```bash
npm run test
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

## 📝 License

This project is for educational/portfolio purposes.

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own use.

## 📧 Contact

For questions or feedback, please open an issue in the repository.
