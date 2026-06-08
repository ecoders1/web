import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Isayas Fikadu Portfolio",
  description: "Admin dashboard for managing portfolio content",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
