export type Project = {
  id: string
  title: string
  description: string
  image_url: string | null
  tech_stack: string[]
  live_url: string | null
  github_url: string | null
  category: string
  featured: boolean
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}

export const DEMO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, payment gateway integration, and admin dashboard.',
    image_url: null,
    tech_stack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind CSS'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    category: 'Full Stack',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative project management tool with real-time updates, drag-and-drop boards, and team collaboration features.',
    image_url: null,
    tech_stack: ['React', 'Node.js', 'MySQL', 'Socket.io'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    category: 'Web App',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Portfolio Dashboard UI',
    description: 'A modern analytics dashboard with interactive charts, dark mode, and responsive design for data visualization.',
    image_url: null,
    tech_stack: ['React', 'Tailwind CSS', 'Chart.js'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    category: 'UI/UX',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'RESTful API Service',
    description: 'A scalable REST API with JWT authentication, rate limiting, and comprehensive documentation using Swagger.',
    image_url: null,
    tech_stack: ['Node.js', 'Express', 'MySQL', 'JWT'],
    live_url: null,
    github_url: 'https://github.com',
    category: 'Full Stack',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Blog Platform',
    description: 'A full-featured blogging platform with Markdown support, SEO optimization, and a custom CMS.',
    image_url: null,
    tech_stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'MDX'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    category: 'Web App',
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Social Media UI Kit',
    description: 'A comprehensive UI component library with 50+ components designed for social media applications.',
    image_url: null,
    tech_stack: ['React', 'Storybook', 'Tailwind CSS'],
    live_url: 'https://example.com',
    github_url: 'https://github.com',
    category: 'UI/UX',
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
