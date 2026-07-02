-- ============================================================
-- Isayas Fikadu Portfolio – Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url   TEXT,
  tech_stack  TEXT[] NOT NULL DEFAULT '{}',
  live_url    TEXT,
  github_url  TEXT,
  category    TEXT NOT NULL DEFAULT 'Web App'
              CHECK (category IN ('Web App', 'UI/UX', 'Full Stack')),
  featured    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- MESSAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Projects: Public read, authenticated write
CREATE POLICY "projects_public_read"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "projects_auth_insert"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "projects_auth_update"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "projects_auth_delete"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Messages: Anyone can insert (contact form), only authenticated can read
CREATE POLICY "messages_public_insert"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Also allow service role and anon to insert
ALTER TABLE messages FORCE ROW LEVEL SECURITY;

CREATE POLICY "messages_auth_read"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "messages_auth_update"
  ON messages FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "messages_auth_delete"
  ON messages FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- SEED DATA – Sample Projects
-- ============================================================
INSERT INTO projects (title, description, image_url, tech_stack, live_url, github_url, category, featured)
VALUES
(
  'E-Commerce Platform',
  'A full-stack e-commerce platform with real-time inventory management, payment gateway integration (Stripe), and a powerful admin dashboard.',
  NULL,
  ARRAY['Next.js', 'Supabase', 'Stripe', 'Tailwind CSS'],
  'https://example.com',
  'https://github.com',
  'Full Stack',
  true
),
(
  'Task Management App',
  'A collaborative project management tool with real-time updates, drag-and-drop boards, and team collaboration features.',
  NULL,
  ARRAY['React', 'Node.js', 'MySQL', 'Socket.io'],
  'https://example.com',
  'https://github.com',
  'Web App',
  true
),
(
  'Portfolio Dashboard UI',
  'A modern analytics dashboard with interactive charts, dark mode, and responsive design for data visualization.',
  NULL,
  ARRAY['React', 'Tailwind CSS', 'Chart.js'],
  'https://example.com',
  'https://github.com',
  'UI/UX',
  false
),
(
  'RESTful API Service',
  'A scalable REST API with JWT authentication, rate limiting, caching, and comprehensive Swagger documentation.',
  NULL,
  ARRAY['Node.js', 'Express', 'MySQL', 'JWT', 'Swagger'],
  NULL,
  'https://github.com',
  'Full Stack',
  false
),
(
  'Blog Platform',
  'A full-featured blogging platform with Markdown support, SEO optimization, and a custom content management system.',
  NULL,
  ARRAY['Next.js', 'Supabase', 'Tailwind CSS', 'MDX'],
  'https://example.com',
  'https://github.com',
  'Web App',
  true
),
(
  'Social Media UI Kit',
  'A comprehensive UI component library with 50+ components designed specifically for social media applications.',
  NULL,
  ARRAY['React', 'Storybook', 'Tailwind CSS', 'TypeScript'],
  'https://example.com',
  'https://github.com',
  'UI/UX',
  false
);
