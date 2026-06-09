"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  AtSign,
  FileText,
  MessageSquare,
  Clock,
  Zap,
} from "lucide-react";
import { SectionHeader } from "./AboutSection";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type Status = "idle" | "loading" | "success" | "error";

// Full name: at least two words (first + last)
const isFullName = (v: string) => v.trim().split(/\s+/).length >= 2 && v.trim().length >= 5;
// Strict email regex
const isValidEmail = (v: string) =>
  /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim());

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "iyasu4313@gmail.com",
    href: "mailto:iyasu4313@gmail.com",
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+251 943 133 184",
    href: "tel:+251943133184",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@milkibn",
    href: "https://t.me/milkibn",
    gradient: "from-sky-500 to-cyan-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ambo, Oromia, Ethiopia",
    href: null,
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const validate = (f: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!f.fullName.trim()) {
      e.fullName = "Full name is required.";
    } else if (!isFullName(f.fullName)) {
      e.fullName = "Please enter your full name (first and last name).";
    }
    if (!f.email.trim()) {
      e.email = "Email address is required.";
    } else if (!isValidEmail(f.email)) {
      e.email = "Please enter a valid email address (e.g. name@example.com).";
    }
    if (!f.subject.trim()) {
      e.subject = "Subject is required.";
    } else if (f.subject.trim().length < 3) {
      e.subject = "Subject must be at least 3 characters.";
    }
    if (!f.message.trim()) {
      e.message = "Message is required.";
    } else if (f.message.trim().length < 15) {
      e.message = "Message must be at least 15 characters.";
    }
    return e;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors(errs);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name as keyof FormState]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields
    setTouched({ fullName: true, email: true, subject: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          message: `Subject: ${form.subject.trim()}\n\n${form.message.trim()}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("success");
      setForm({ fullName: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind? I'd love to hear from you. Fill in the form and I'll get back to you within 24 hours."
        />

        <div ref={ref} className="grid lg:grid-cols-5 gap-10 xl:gap-16">

          {/* ── LEFT: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Contact Information
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Reach out via the form or any of the channels below. I&apos;m always open to new projects and collaborations.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid gap-3">
              {contactItems.map(({ icon: Icon, label, value, href, gradient, bg }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500/40 transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-sm font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response time card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">Quick Response</span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Clock, text: "Replies within 24 hours" },
                  { icon: CheckCircle, text: "Free project consultation" },
                  { icon: Zap, text: "Available for freelance work" },
                ].map(({ icon: I, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <I className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="relative p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-100 dark:shadow-purple-500/5">

              {/* Success overlay */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 rounded-3xl bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center z-10 p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-5 shadow-lg shadow-green-500/30"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent! 🎉
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Thank you! I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error banner */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-red-700 dark:text-red-300 text-sm font-semibold">Failed to send message</p>
                      <p className="text-red-600 dark:text-red-400 text-xs mt-0.5">
                        Please try again or email directly at{" "}
                        <a href="mailto:iyasu4313@gmail.com" className="underline">iyasu4313@gmail.com</a>
                      </p>
                    </div>
                    <button onClick={() => setStatus("idle")} className="ml-auto text-red-400 hover:text-red-600">
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <Field
                    icon={<User className="w-4 h-4" />}
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="e.g. Isayas Fikadu"
                    value={form.fullName}
                    error={touched.fullName ? errors.fullName : undefined}
                    hint="Enter your first and last name"
                    onChange={handleChange}
                    onBlur={() => handleBlur("fullName")}
                    autoComplete="name"
                    required
                  />
                  {/* Email */}
                  <Field
                    icon={<AtSign className="w-4 h-4" />}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="e.g. name@gmail.com"
                    value={form.email}
                    error={touched.email ? errors.email : undefined}
                    hint="A valid email you can be reached at"
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Subject */}
                <Field
                  icon={<FileText className="w-4 h-4" />}
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Web App Development / Freelance Project"
                  value={form.subject}
                  error={touched.subject ? errors.subject : undefined}
                  onChange={handleChange}
                  onBlur={() => handleBlur("subject")}
                  required
                />

                {/* Message */}
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    Message
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, goals, budget, and timeline..."
                    value={form.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all resize-none text-sm ${
                      touched.message && errors.message
                        ? "border-red-400 focus:border-red-400"
                        : touched.message && !errors.message
                        ? "border-green-400 focus:border-green-400"
                        : "border-gray-200 dark:border-gray-700 focus:border-purple-500"
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {touched.message && errors.message ? (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className={`text-xs ml-auto ${form.message.length > 280 ? "text-red-400" : "text-gray-400"}`}>
                      {form.message.length}/300
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending your message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                  🔒 Your information is kept private and never shared.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  name,
  type,
  placeholder,
  value,
  error,
  hint,
  onChange,
  onBlur,
  autoComplete,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  hint?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  autoComplete?: string;
  required?: boolean;
}) {
  const hasValue = value.trim().length > 0;
  const isOk = hasValue && !error;

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        <span className="text-purple-500">{icon}</span>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm ${
            error
              ? "border-red-400 focus:border-red-400 pr-10"
              : isOk
              ? "border-green-400 focus:border-green-400 pr-10"
              : "border-gray-200 dark:border-gray-700 focus:border-purple-500"
          }`}
        />
        {/* Validation icon */}
        {hasValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-400" />
            )}
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-gray-400">{hint}</p>
      ) : null}
    </div>
  );
}
