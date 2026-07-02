"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  Calendar,
  Globe,
  Briefcase,
  Heart,
  Code2,
  Rocket,
  GraduationCap,
  Coffee,
  Lightbulb,
  Users,
  Award,
  Phone,
  CheckCircle,
  Star,
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────
const skills = [
  { name: "Next.js", level: 90, color: "from-gray-400 to-gray-600" },
  { name: "React", level: 92, color: "from-cyan-400 to-cyan-600" },
  { name: "JavaScript / TypeScript", level: 95, color: "from-yellow-400 to-yellow-600" },
  { name: "Node.js & Express", level: 85, color: "from-green-400 to-green-600" },
  { name: "Supabase & PostgreSQL", level: 85, color: "from-emerald-400 to-emerald-600" },
  { name: "MySQL", level: 78, color: "from-orange-400 to-orange-600" },
  { name: "Tailwind CSS", level: 92, color: "from-sky-400 to-sky-600" },
  { name: "REST APIs & GraphQL", level: 82, color: "from-purple-400 to-purple-600" },
];

const techBadges = [
  { name: "Next.js", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
  { name: "React", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300" },
  { name: "Node.js", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  { name: "TypeScript", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { name: "JavaScript", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" },
  { name: "Supabase", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  { name: "MySQL", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
  { name: "PostgreSQL", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" },
  { name: "Tailwind CSS", color: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300" },
  { name: "Git & GitHub", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" },
  { name: "REST APIs", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  { name: "GraphQL", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300" },
  { name: "Vercel", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
  { name: "Docker", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { name: "Framer Motion", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
];

const infoItems = [
  { icon: MapPin, label: "Location", value: "Ambo, Oromia, Ethiopia" },
  { icon: Mail, label: "Email", value: "iyasu4313@gmail.com" },
  { icon: Phone, label: "Phone", value: "+251 943 133 184" },
  { icon: Calendar, label: "Experience", value: "3+ Years" },
  { icon: Briefcase, label: "Status", value: "Open to Work" },
  { icon: Globe, label: "Languages", value: "Afaan Oromo, Amharic, English" },
];

const timeline = [
  {
    year: "2021",
    icon: Code2,
    title: "Started Web Development",
    desc: "Began my coding journey learning HTML, CSS, and JavaScript. Built my first website and fell in love with web development.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    year: "2022",
    icon: Rocket,
    title: "Mastered React & Node.js",
    desc: "Dived deep into React for frontend and Node.js for backend development. Built full-stack applications with REST APIs.",
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2023",
    icon: GraduationCap,
    title: "Advanced to Next.js & TypeScript",
    desc: "Leveled up to Next.js and TypeScript for professional, production-ready apps. Started working with Supabase and PostgreSQL.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    year: "2024",
    icon: Award,
    title: "Freelancing & Client Projects",
    desc: "Started taking on freelance projects, delivering web apps for clients across various industries. Built 20+ projects.",
    color: "from-orange-500 to-amber-500",
  },
  {
    year: "2025",
    icon: Star,
    title: "Full Stack Expert",
    desc: "Now building modern, scalable web applications with AI integration, real-time features, and world-class UI/UX design.",
    color: "from-rose-500 to-pink-500",
  },
];

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "I write readable, maintainable, and well-documented code following best practices.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Rocket,
    title: "Performance First",
    desc: "Every app I build is optimized for speed, SEO, and the best user experience.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Heart,
    title: "User-Centered",
    desc: "I design and build with the end user in mind — intuitive, accessible, and beautiful.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Lightbulb,
    title: "Always Learning",
    desc: "I stay current with the latest technologies and trends in web development.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Collaborative",
    desc: "I love working with teams and clients to bring shared visions to life.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Coffee,
    title: "Dedicated",
    desc: "Passionate about my craft, I go the extra mile to deliver outstanding results.",
    color: "from-cyan-500 to-blue-500",
  },
];

const tabs = ["Bio", "Skills", "Timeline", "Values"] as const;
type Tab = typeof tabs[number];

// ── Component ────────────────────────────────────────────────────
export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<Tab>("Bio");

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Know Me Better"
          subtitle="Full Stack Developer from Ethiopia passionate about building modern web applications that make a real difference."
        />

        {/* ── Main Content ── */}
        <div ref={ref} className="grid lg:grid-cols-5 gap-12 items-start">

          {/* ── LEFT: Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Photo card */}
            <div className="relative p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl shadow-purple-500/5">
              <div className="flex items-start gap-5">
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 p-0.5 shadow-xl shadow-purple-500/30">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900">
                      <img
                        src="/profile.jpg"
                        alt="Isayas Fikadu"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 glass px-2.5 py-1 rounded-full text-xs text-green-400 flex items-center gap-1 border border-green-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Isayas Fikadu</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mt-0.5">Full Stack Web Developer</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Ambo, Oromia, Ethiopia
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {["Next.js", "React", "Node.js"].map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick info */}
              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-3">
                {infoItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon className="w-3.5 h-3.5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What I bring card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                What I Bring
              </h4>
              <ul className="space-y-2">
                {[
                  "End-to-end web application development",
                  "Modern, responsive UI/UX design",
                  "Scalable backend APIs & databases",
                  "Real-time features & authentication",
                  "Performance & SEO optimization",
                  "Clean, well-documented code",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech badges */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((tech) => (
                  <span
                    key={tech.name}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Tabbed Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Tab buttons */}
            <div className="flex gap-1 p-1 rounded-xl bg-gray-200 dark:bg-gray-800 mb-8 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ── BIO TAB ── */}
            {activeTab === "Bio" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">👋</span> Hello, I&apos;m Isayas Fikadu
                  </h3>
                  <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    <p>
                      I&apos;m a <strong className="text-purple-600 dark:text-purple-400">passionate Full Stack Web Developer</strong> based in Ambo, Oromia, Ethiopia. With over 3 years of hands-on experience, I specialize in building modern, fast, and scalable web applications that solve real-world problems.
                    </p>
                    <p>
                      My journey into web development started in 2021 out of pure curiosity — I wanted to understand how websites worked. That curiosity quickly turned into a deep passion. I taught myself HTML, CSS, and JavaScript, then progressed into React, Node.js, Next.js, and full-stack development.
                    </p>
                    <p>
                      Today, I build complete web solutions — from beautifully designed frontends with <strong className="text-gray-900 dark:text-white">React & Next.js</strong> to powerful backends with <strong className="text-gray-900 dark:text-white">Node.js, Supabase, and MySQL</strong>. I enjoy every part of the development process, from planning and architecture to deployment and optimization.
                    </p>
                    <p>
                      I&apos;m deeply committed to writing <strong className="text-gray-900 dark:text-white">clean, maintainable code</strong> and creating user experiences that are intuitive, accessible, and visually stunning. Every project I take on, I give 100% dedication and attention to detail.
                    </p>
                    <p>
                      Beyond coding, I&apos;m passionate about continuous learning, staying up-to-date with the latest web technologies, and contributing to the growing tech community in Ethiopia. I believe technology has the power to transform lives, and I&apos;m proud to be part of that transformation.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

            {/* ── SKILLS TAB ── */}
            {activeTab === "Skills" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  Technical Skills
                </h3>
                <div className="space-y-5">
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} isInView={activeTab === "Skills"} />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Also familiar with:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Express.js", "Prisma", "Socket.io", "Redux", "Zustand", "Framer Motion", "Storybook", "Jest", "Webpack", "Linux"].map((t) => (
                      <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TIMELINE TAB ── */}
            {activeTab === "Timeline" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  My Journey
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 opacity-30" />
                  <div className="space-y-6">
                    {timeline.map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex gap-5"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center flex-shrink-0 shadow-md z-10`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                              {item.year}
                            </span>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── VALUES TAB ── */}
            {activeTab === "Values" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {values.map((v, i) => (
                    <motion.div
                      key={v.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all group"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                        <v.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {v.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {v.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center italic">
                    &ldquo;I believe great software is not just about writing code — it&apos;s about solving problems, creating value, and building experiences that people love to use.&rdquo;
                  </p>
                  <p className="text-center text-sm font-bold gradient-text mt-2">— Isayas Fikadu</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ───────────────────────────────────────────────
function SkillBar({
  skill,
  index,
  isInView,
}: {
  skill: { name: string; level: number; color: string };
  index: number;
  isInView: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm font-bold gradient-text">{skill.level}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
        />
      </div>
    </div>
  );
}

export function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-4">
        {badge}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
    </motion.div>
  );
}
