import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AIAssistant from "@/components/AIAssistant";

export const metadata: Metadata = {
  title: "Isayas Fikadu | Full Stack Web Developer",
  description:
    "Passionate full stack web developer from Ambo, Ethiopia, building modern web applications using JavaScript technologies. Specializing in Next.js, React, Node.js, and Supabase.",
  keywords: [
    "Isayas Fikadu",
    "Full Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "Node.js",
    "Supabase",
    "Ethiopia",
    "Ambo",
    "Oromia",
  ],
  authors: [{ name: "Isayas Fikadu", url: "https://github.com/ecoders1" }],
  openGraph: {
    title: "Isayas Fikadu | Full Stack Web Developer",
    description:
      "Passionate full stack web developer from Ambo, Ethiopia building modern web applications.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
        <ThemeProvider>
          {children}
          <AIAssistant />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white !shadow-lg",
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
