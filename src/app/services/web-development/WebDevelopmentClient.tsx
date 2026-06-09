"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Zap,
  Shield,
  Smartphone,
  Code2,
  Layers,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Users,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const techStack = [
  { name: "Next.js", icon: "▲", color: "bg-black text-white", desc: "Full-stack React framework" },
  { name: "React", icon: "⚛", color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20", desc: "UI component library" },
  { name: "Node.js", icon: "⬢", color: "bg-green-500/10 text-green-400 border border-green-500/20", desc: "Server-side runtime" },
  { name: "TypeScript", icon: "TS", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20", desc: "Type-safe JavaScript" },
  { name: "Tailwind CSS", icon: "🎨", color: "bg-sky-500/10 text-sky-400 border border-sky-500/20", desc: "Utility-first CSS" },
  { name: "Supabase", icon: "⚡", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", desc: "Backend as a service" },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Server-side rendering and static generation for sub-second load times.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    desc: "Pixel-perfect layouts on every device — mobile, tablet, and desktop.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Built with security best practices — auth, validation, and safe APIs.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    desc: "Structured data, metadata, sitemaps, and Core Web Vitals tuning.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "Clean, maintainable code designed to grow with your business.",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Code2,
    title: "Custom Solutions",
    desc: "Tailored web apps built to your exact requirements and workflows.",
    color: "from-violet-500 to-purple-500",
  },
];

const services = [
  { title: "Landing Pages", price: "From $200", time: "3-5 days", features: ["Responsive design", "SEO optimized", "Contact form", "Fast loading"] },
  { title: "Business Website", price: "From $500", time: "1-2 weeks", features: ["Multi-page", "CMS integration", "Analytics", "Custom domain"] },
  { title: "Full Stack Web App", price: "From $1,000", time: "2-4 weeks", features: ["Database design", "User auth", "Admin panel", "API development"], highlight: true },
  { title: "E-Commerce Store", price: "From $800", time: "2-3 weeks", features: ["Product catalog", "Cart & checkout", "Payment gateway", "Order management"] },
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "We discuss your goals, target audience, and project requirements in detail.", icon: Users },
  { step: "02", title: "Design", desc: "I create wireframes and mockups for your approval before writing any code.", icon: Layers },
  { step: "03", title: "Development", desc: "Clean, tested code is written with regular progress updates and demos.", icon: Code2 },
  { step: "04", title: "Launch", desc: "Deployment to production with performance checks and full handover.", icon: TrendingUp },
];

const stats = [
  { value: "20+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "3+", label: "Years Experience" },
  { value: "24h", label: "Response Time" },
];

export default function WebDevelopmentClient() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const featuresInView = useInView(featuresRef, { once: true, margin: "-80px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center gradient-bg pt-20">
        {/* Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back button */}
          <motion.a
            href="/#services"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-10 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </motion.a>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-6"
              >
                <Globe className="w-4 h-4" />
                Web Development Services
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Modern Web Apps
                <br />
                <span className="gradient-text">Built to Perform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg leading-relaxed mb-8"
              >
                I build fast, scalable, and beautiful web applications using
                Next.js, React, and Node.js — from simple landing pages to
                complex full-stack enterprise solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="/#contact"
                  className="flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30 animate-pulse-glow"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/#projects"
                  className="flex items-center gap-2 px-7 py-4 glass border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  View My Work
                </a>
              </motion.div>
            </div>

            {/* Right — floating code card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="hidden lg:block"
            >
              <div className="glass rounded-2xl p-6 border border-white/10 shadow-2xl shadow-purple-500/10">
                {/* Code editor header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-gray-400 text-xs">app/page.tsx</span>
                </div>
                {/* Fake code */}
                <div className="font-mono text-sm space-y-1.5">
                  <div><span className="text-purple-400">import</span> <span className="text-cyan-300">&#123; Hero &#125;</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@/components&apos;</span></div>
                  <div className="h-2" />
                  <div><span className="text-purple-400">export default function</span> <span className="text-yellow-300">Page</span><span className="text-white">() &#123;</span></div>
                  <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-white">(</span></div>
                  <div className="pl-8"><span className="text-pink-400">&lt;main&gt;</span></div>
                  <div className="pl-12 text-gray-300">
                    <span className="text-pink-400">&lt;Hero </span>
                    <span className="text-cyan-300">title</span>
                    <span className="text-white">=</span>
                    <span className="text-green-400">&quot;Hello World&quot;</span>
                    <span className="text-pink-400"> /&gt;</span>
                  </div>
                  <div className="pl-8"><span className="text-pink-400">&lt;/main&gt;</span></div>
                  <div className="pl-4"><span className="text-white">)</span></div>
                  <div><span className="text-white">&#125;</span></div>
                </div>
                {/* Stats row */}
                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-white/5">
                      <div className="text-xl font-bold gradient-text">{s.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-16 bg-gray-900/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">
            Technologies I Use
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all group"
              >
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${tech.color}`}>
                  {tech.icon}
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {tech.name}
                </span>
                <span className="text-xs text-gray-500 text-center">{tech.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300 mb-4">
              Why Choose Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What You Get
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          </motion.div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500/40 card-hover"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300 mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Service Packages
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          </motion.div>

          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border card-hover flex flex-col ${
                  s.highlight
                    ? "bg-gradient-to-b from-purple-900/40 to-pink-900/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                    : "bg-gray-900 border-gray-800 hover:border-purple-500/30"
                }`}
              >
                {s.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                  <div className="text-2xl font-bold gradient-text">{s.price}</div>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-400 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {s.time}
                  </div>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {s.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    s.highlight
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                      : "border border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400"
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300 mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My Process
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          </motion.div>

          <div ref={processRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/30">
                  <span className="text-xs font-bold text-purple-200">{step.step}</span>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / RATING ── */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl text-gray-300 italic mb-6 leading-relaxed">
            &ldquo;Isayas delivered an exceptional web application that exceeded our expectations.
            Fast, clean code and excellent communication throughout the project.&rdquo;
          </blockquote>
          <p className="text-gray-400 text-sm">— Happy Client, Ethiopia</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Build Your Web App?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Let&apos;s turn your idea into a fast, modern, and scalable web application.
              Get in touch today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30 w-full sm:w-auto justify-center"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/#projects"
                className="flex items-center gap-2 px-8 py-4 glass border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
              >
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
