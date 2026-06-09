"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Code2,
  Eye,
  Mail,
  X,
  Save,
  ExternalLink,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
import { supabase } from "@/lib/supabase";
import type { Project, Message } from "@/lib/data";
import { DEMO_PROJECTS } from "@/lib/data";

type Tab = "overview" | "projects" | "messages";

const DEMO_MESSAGES: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    message: "Hi Isayas, I'd like to discuss a project with you. Are you available for a consultation?",
    read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Love your portfolio! I'm interested in hiring you for a full-stack project.",
    read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const demo = !supabaseUrl || supabaseUrl === "your-supabase-url";
    setIsDemoMode(demo);

    if (demo) {
      setProjects(DEMO_PROJECTS);
      setMessages(DEMO_MESSAGES);
      setLoading(false);
      return;
    }

    const [{ data: projectsData }, { data: messagesData }] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
    ]);

    setProjects((projectsData as Project[]) ?? []);
    setMessages((messagesData as Message[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    sessionStorage.removeItem("admin_authenticated");
    if (!isDemoMode) await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    if (isDemoMode) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return;
    }

    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMarkRead = async (id: string) => {
    if (isDemoMode) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
      return;
    }
    await supabase.from("messages").update({ read: true }).eq("id", id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">Isayas Fikadu</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 border border-purple-500/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {label}
              </span>
              {badge ? (
                <span className="px-2 py-0.5 rounded-full text-xs bg-purple-600 text-white font-bold">
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Demo Mode indicator */}
        {isDemoMode && (
          <div className="mx-4 mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-yellow-400 text-xs font-medium">Demo Mode</p>
            <p className="text-gray-500 text-xs mt-0.5">Connect Supabase for full features</p>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <OverviewTab
                  projects={projects}
                  messages={messages}
                  unreadCount={unreadCount}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <ProjectsTab
                  projects={projects}
                  setProjects={setProjects}
                  onAdd={() => {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  }}
                  onEdit={(p) => {
                    setEditingProject(p);
                    setShowProjectForm(true);
                  }}
                  onDelete={handleDeleteProject}
                />
              )}

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <MessagesTab
                  messages={messages}
                  onSelect={(m) => {
                    setSelectedMessage(m);
                    handleMarkRead(m.id);
                  }}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <ProjectFormModal
            project={editingProject}
            isDemoMode={isDemoMode}
            onClose={() => setShowProjectForm(false)}
            onSave={(p) => {
              if (editingProject) {
                setProjects((prev) =>
                  prev.map((proj) => (proj.id === p.id ? p : proj))
                );
              } else {
                setProjects((prev) => [p, ...prev]);
              }
              setShowProjectForm(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <MessageModal
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewTab({
  projects,
  messages,
  unreadCount,
  setActiveTab,
}: {
  projects: Project[];
  messages: Message[];
  unreadCount: number;
  setActiveTab: (tab: Tab) => void;
}) {
  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderOpen, gradient: "from-purple-500 to-indigo-500" },
    { label: "Total Messages", value: messages.length, icon: MessageSquare, gradient: "from-pink-500 to-rose-500" },
    { label: "Unread Messages", value: unreadCount, icon: Mail, gradient: "from-orange-500 to-amber-500" },
    { label: "Featured Projects", value: projects.filter((p) => p.featured).length, icon: Eye, gradient: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <button onClick={() => setActiveTab("projects")} className="text-sm text-purple-400 hover:text-purple-300">
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {projects.slice(0, 3).map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                <Code2 className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{p.title}</p>
                <p className="text-sm text-gray-400">{p.category}</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-purple-900/30 text-purple-300">{p.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Messages</h2>
          <button onClick={() => setActiveTab("messages")} className="text-sm text-purple-400 hover:text-purple-300">
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {messages.slice(0, 3).map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
              {!m.read && <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />}
              <div className="flex-1 min-w-0 ml-2">
                <p className="font-medium truncate">{m.name}</p>
                <p className="text-sm text-gray-400 truncate">{m.message}</p>
              </div>
              <p className="text-xs text-gray-500 flex-shrink-0">
                {new Date(m.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsTab({
  projects,
  onAdd,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onAdd: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{projects.length} projects total</p>
        <motion.button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:opacity-90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-gray-900 border border-gray-800 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <span className="text-xs text-gray-400">{project.category}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                <button onClick={() => onEdit(project)}
                  className="p-1.5 rounded-lg bg-gray-800 hover:bg-blue-900/50 text-gray-400 hover:text-blue-400 transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => onDelete(project.id)}
                  className="p-1.5 rounded-lg bg-gray-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack.slice(0, 3).map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs rounded bg-gray-800 text-gray-300">{t}</span>
              ))}
              {project.tech_stack.length > 3 && (
                <span className="px-2 py-0.5 text-xs rounded bg-purple-900/30 text-purple-400">
                  +{project.tech_stack.length - 3}
                </span>
              )}
            </div>
            {project.featured && (
              <div className="mt-3">
                <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  ⭐ Featured
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab({
  messages,
  onSelect,
}: {
  messages: Message[];
  onSelect: (m: Message) => void;
}) {
  return (
    <div className="space-y-3">
      {messages.length === 0 && (
        <div className="text-center py-16 text-gray-500">No messages yet.</div>
      )}
      {messages.map((message, i) => (
        <motion.button
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(message)}
          className="w-full text-left p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
              {message.name[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className={`font-semibold ${!message.read ? "text-white" : "text-gray-300"}`}>
                  {message.name}
                </p>
                {!message.read && (
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                )}
              </div>
              <p className="text-sm text-gray-400 truncate">{message.email}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{message.message}</p>
            </div>
            <p className="text-xs text-gray-500 flex-shrink-0">
              {new Date(message.created_at).toLocaleDateString()}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function MessageModal({
  message,
  onClose,
}: {
  message: Message;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">Message from {message.name}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="text-gray-400 w-16">From:</span>
            <a href={`mailto:${message.email}`} className="text-purple-400 hover:underline">{message.email}</a>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-400 w-16">Date:</span>
            <span>{new Date(message.created_at).toLocaleString()}</span>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-gray-800 border border-gray-700">
            <p className="whitespace-pre-wrap">{message.message}</p>
          </div>
          <a
            href={`mailto:${message.email}?subject=Re: Your message&from=iyasu4313@gmail.com`}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity w-full justify-center mt-2"
          >
            <Mail className="w-4 h-4" />
            Reply via Email
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectFormModal({
  project,
  isDemoMode,
  onClose,
  onSave,
}: {
  project: Project | null;
  isDemoMode: boolean;
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
  const [form, setForm] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    image_url: project?.image_url ?? "",
    tech_stack: project?.tech_stack.join(", ") ?? "",
    live_url: project?.live_url ?? "",
    github_url: project?.github_url ?? "",
    category: project?.category ?? "Web App",
    featured: project?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const techArray = form.tech_stack.split(",").map((t) => t.trim()).filter(Boolean);

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim() || null,
      tech_stack: techArray,
      live_url: form.live_url.trim() || null,
      github_url: form.github_url.trim() || null,
      category: form.category,
      featured: form.featured,
    };

    if (isDemoMode) {
      const saved: Project = {
        id: project?.id ?? Date.now().toString(),
        ...projectData,
        created_at: project?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      onSave(saved);
      return;
    }

    if (project) {
      const { data } = await supabase
        .from("projects")
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq("id", project.id)
        .select()
        .single();
      if (data) onSave(data as Project);
    } else {
      const { data } = await supabase
        .from("projects")
        .insert([projectData])
        .select()
        .single();
      if (data) onSave(data as Project);
    }

    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">
            {project ? "Edit Project" : "Add New Project"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Project title"
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option>Web App</option>
                <option>UI/UX</option>
                <option>Full Stack</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Project description..."
              className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Tech Stack (comma separated)
            </label>
            <input
              value={form.tech_stack}
              onChange={(e) => setForm((f) => ({ ...f, tech_stack: e.target.value }))}
              placeholder="Next.js, React, Supabase, Tailwind CSS"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Live URL</label>
              <input
                type="url"
                value={form.live_url}
                onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                placeholder="https://..."
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">GithubIcon URL</label>
              <input
                type="url"
                value={form.github_url}
                onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                placeholder="https://GithubIcon.com/..."
                className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Image URL</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              placeholder="https://... (optional)"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span className="text-sm text-gray-300">Mark as Featured Project</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm font-medium">
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-60"
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : project ? "Update Project" : "Create Project"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
