# Isayas Fikadu – Developer Portfolio

A world-class, modern, and fully responsive developer portfolio website built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 16 (App Router), TypeScript |
| Styling    | Tailwind CSS v4, Framer Motion      |
| Backend    | Next.js API Routes                  |
| Database   | Supabase (PostgreSQL)               |
| Auth       | Supabase Auth                       |
| Deployment | Vercel                              |
| Icons      | Lucide React                        |

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/     # Protected admin dashboard
│   │   └── login/         # Admin login page
│   ├── api/
│   │   ├── contact/       # Contact form API
│   │   └── projects/      # Projects CRUD API
│   ├── globals.css        # Global styles + animations
│   ├── layout.tsx         # Root layout (SEO, fonts)
│   ├── page.tsx           # Home page (SSR)
│   ├── not-found.tsx      # 404 page
│   ├── sitemap.ts         # SEO sitemap
│   └── robots.ts          # SEO robots
├── components/
│   ├── Navbar.tsx          # Fixed responsive navbar + dark mode
│   ├── Footer.tsx          # Footer with links
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   └── sections/
│       ├── HeroSection.tsx      # Animated hero + canvas particles
│       ├── AboutSection.tsx     # Bio + animated skill bars
│       ├── ProjectsSection.tsx  # Filterable project grid
│       ├── ServicesSection.tsx  # Services cards
│       └── ContactSection.tsx   # Contact form with validation
├── lib/
│   ├── supabase.ts        # Supabase client + DB types
│   ├── supabase-server.ts # Server-side Supabase client
│   └── data.ts            # Demo data + types
└── middleware.ts          # Route protection for admin
```

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/isayasfikadu/portfolio.git
cd isayas-portfolio
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** to get your URL and anon key
3. Run the SQL schema in **SQL Editor**:

```bash
# The schema file is at the root of the project
supabase-schema.sql
```

### 3. Configure environment variables

Copy `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🗄️ Supabase Database Schema

Run `supabase-schema.sql` in your Supabase SQL Editor to create:

- `projects` table – portfolio projects with full CRUD via admin dashboard
- `messages` table – contact form submissions
- Row Level Security (RLS) policies – public reads, authenticated writes
- Seed data – 6 sample projects pre-loaded

## 🔐 Admin Dashboard

Access the admin panel at `/admin` (redirects to `/admin/login`).

**Demo credentials:** `admin@example.com` / `admin123`

In production with Supabase Auth, create a user at:  
Supabase Dashboard → Authentication → Users → Invite User

Admin features:
- ✅ Add / Edit / Delete projects
- ✅ View contact form messages
- ✅ Mark messages as read
- ✅ Dashboard overview with stats

## 🚀 Deploying to Vercel

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** – done!

## 🎨 Features

- **Dark / Light Mode** – toggle in the navbar, persisted to localStorage
- **Animated Hero** – canvas particle system, typewriter effect, gradient orbs
- **Skill Bars** – scroll-triggered animated progress bars
- **Project Filtering** – filter by All / Web Apps / UI/UX / Full Stack
- **Contact Form** – client + server validation, stored in Supabase
- **SEO Ready** – metadata, Open Graph, sitemap, robots.txt
- **SSR / SSG** – projects fetched server-side for fast load
- **Glassmorphism** – modern frosted-glass UI elements
- **Framer Motion** – smooth page and section animations
- **Fully Responsive** – mobile, tablet, and desktop

## 📦 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## 📄 License

MIT — free to use for personal and commercial projects.
