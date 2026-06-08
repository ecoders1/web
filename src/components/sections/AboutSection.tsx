"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  Calendar,
  Code2,
  Globe,
  Briefcase,
} from "lucide-react";

const skills = [
  { name: "Next.js", level: 90, color: "from-gray-400 to-gray-600" },
  { name: "React", level: 92, color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
  { name: "TypeScript", level: 80, color: "from-blue-400 to-blue-600" },
  { name: "Supabase", level: 85, color: "from-emerald-400 to-emerald-600" },
  { name: "MySQL", level: 78, color: "from-orange-400 to-orange-600" },
  { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
  { name: "Tailwind CSS", level: 92, color: "from-sky-400 to-sky-600" },
];

const techBadges = [
  "Next.js", "React", "Node.js", "TypeScript", "JavaScript",
  "Supabase", "MySQL", "PostgreSQL", "Tailwind CSS", "Git",
  "REST APIs", "GraphQL", "Docker", "Vercel",
];

const infoItems = [
  { icon: MapPin, label: "Location", value: "Ethiopia" },
  { icon: Mail, label: "Email", value: "isayas@example.com" },
  { icon: Calendar, label: "Experience", value: "3+ Years" },
  { icon: Briefcase, label: "Status", value: "Open to Work" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="About Me"
          title="Who Am I?"
          subtitle="A passionate developer crafting digital experiences"
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left – Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Avatar placeholder */}
            <div className="relative mb-8 inline-block">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 p-1 shadow-2xl shadow-purple-500/30">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                  <Code2 className="w-20 h-20 text-purple-400" />
                </div>
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-3 -right-3 glass px-3 py-1.5 rounded-full text-xs text-green-400 flex items-center gap-1.5 border border-green-400/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Isayas Fikadu</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I&apos;m a passionate Full Stack Web Developer based in Ethiopia, with
              over 3 years of experience building modern, scalable, and
              user-friendly web applications. I love turning complex problems
              into elegant solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              My expertise spans the entire web development stack, from crafting
              pixel-perfect UIs with React and Next.js to building robust APIs
              and managing databases. I&apos;m constantly learning and adapting to
              new technologies to stay at the cutting edge.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right – Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-500" />
              Skills & Expertise
            </h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: "3+", label: "Years Exp." },
                { value: "20+", label: "Projects" },
                { value: "15+", label: "Happy Clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                >
                  <div className="text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
    </motion.div>
  );
}
