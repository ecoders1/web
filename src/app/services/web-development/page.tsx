import type { Metadata } from "next";
import WebDevelopmentClient from "./WebDevelopmentClient";

export const metadata: Metadata = {
  title: "Web Development Services | Isayas Fikadu",
  description:
    "Professional web development services using Next.js, React, and Node.js. Building fast, scalable, modern web applications.",
};

export default function WebDevelopmentPage() {
  return <WebDevelopmentClient />;
}
