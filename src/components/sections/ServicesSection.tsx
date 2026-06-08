"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Palette,
  Server,
  Database,
  Smartphone,
  Search,
} from "lucide-react";
import { SectionHeader } from "./AboutSection";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building fast, scalable, and modern web applications using Next.js, React, and Node.js. From single-page apps to complex enterprise solutions.",
    features: ["Next.js / React", "SSR & Static Sites", "Performance Optimized", "SEO Ready"],
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-500/10 to-indigo-500/10",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating beautiful, intuitive, and accessible user interfaces with modern design principles. Glassmorphism, animations, and responsive layouts.",
    features: ["Figma Prototyping", "Responsive Design", "Dark/Light Modes", "Framer Motion"],
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
  },
  {
    icon: Server,
    title: "API Development",
    description:
      "Designing and building robust RESTful and GraphQL APIs with authentication, rate limiting, and comprehensive documentation.",
    features: ["REST & GraphQL", "JWT Auth", "API Documentation", "Rate Limiting"],
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/10 to-amber-500/10",
  },
  {
    icon: Database,
    title: "Database Integration",
    description:
      "Setting up and managing relational and non-relational databases with efficient schemas, migrations, and optimized queries.",
    features: ["Supabase / PostgreSQL", "MySQL", "Real-time Data", "Database Design"],
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: Smartphone,
    title: "Responsive Development",
    description:
      "Ensuring your application looks and works perfectly on all devices — mobile, tablet, and desktop — with pixel-perfect precision.",
    features: ["Mobile First", "Cross-browser", "PWA Support", "Touch Optimized"],
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Implementing technical SEO best practices to improve your website's visibility on search engines and drive organic traffic.",
    features: ["Meta Tags", "Schema Markup", "Core Web Vitals", "Sitemap & Robots"],
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What I Do"
          title="My Services"
          subtitle="Comprehensive web development services to bring your vision to life"
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Have a project in mind? Let&apos;s work together.
          </p>
          <motion.button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 card-hover hover:border-purple-500/50 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
