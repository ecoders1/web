import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant for Isayas Fikadu's developer portfolio website.
You help visitors learn about Isayas and his services.

About Isayas Fikadu:
- Full Stack Web Developer based in Ambo, Oromia, Ethiopia
- 3+ years of experience building modern web applications
- Specializes in: Next.js, React, Node.js, TypeScript, Supabase, MySQL, Tailwind CSS
- Email: iyasu4313@gmail.com
- Telegram: @milkibn
- Phone: +251 943 133 184
- GitHub: github.com/ecoders1

Services offered:
1. Web Development - Next.js, React apps, landing pages, full-stack apps
2. UI/UX Design - Modern interfaces, glassmorphism, animations
3. API Development - REST APIs, GraphQL, JWT auth
4. Database Integration - Supabase, PostgreSQL, MySQL
5. Responsive Development - Mobile-first designs
6. SEO Optimization - Technical SEO, Core Web Vitals

Pricing (approximate):
- Landing Pages: From $200 (3-5 days)
- Business Website: From $500 (1-2 weeks)
- Full Stack Web App: From $1,000 (2-4 weeks)
- E-Commerce Store: From $800 (2-3 weeks)

Be friendly, helpful, and concise. Answer questions about Isayas's skills, projects, services, and how to hire him.
If asked about something unrelated to the portfolio or web development, politely redirect to relevant topics.
Keep responses under 150 words unless the question requires more detail.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // Demo mode — no API key
    if (!apiKey) {
      const demo = getDemoResponse(message.toLowerCase());
      return NextResponse.json({ reply: demo });
    }

    // Real OpenAI call
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).slice(-6), // last 6 messages for context
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("OpenAI error:", err);
      return NextResponse.json({ reply: getDemoResponse(message.toLowerCase()) });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ reply: reply || getDemoResponse(message.toLowerCase()) });
  } catch (err) {
    console.error("AI assistant error:", err);
    return NextResponse.json({
      reply: "Sorry, I'm having trouble connecting. Please try again or contact Isayas directly at iyasu4313@gmail.com",
    });
  }
}

function getDemoResponse(msg: string): string {
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hi there! 👋 I'm Isayas's AI assistant. I can help you learn about his skills, services, and projects. What would you like to know?";
  }
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack")) {
    return "Isayas specializes in **Next.js, React, Node.js, TypeScript, Supabase, MySQL** and **Tailwind CSS**. He builds full-stack web applications with 3+ years of experience. Want to know about a specific technology?";
  }
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("rate")) {
    return "Isayas's services start from:\n• Landing Pages: **$200** (3-5 days)\n• Business Website: **$500** (1-2 weeks)\n• Full Stack App: **$1,000** (2-4 weeks)\n• E-Commerce: **$800** (2-3 weeks)\n\nContact him for a custom quote!";
  }
  if (msg.includes("contact") || msg.includes("hire") || msg.includes("reach")) {
    return "You can reach Isayas at:\n📧 **iyasu4313@gmail.com**\n📱 **+251 943 133 184**\n💬 Telegram: **@milkibn**\n\nOr use the contact form on this page!";
  }
  if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio")) {
    return "Isayas has built 20+ projects including e-commerce platforms, task management apps, REST APIs, blog platforms, and UI component libraries. Check the Projects section above to see his featured work!";
  }
  if (msg.includes("service") || msg.includes("what do you")) {
    return "Isayas offers:\n🌐 **Web Development** (Next.js, React)\n🎨 **UI/UX Design**\n⚙️ **API Development**\n🗄️ **Database Integration**\n📱 **Responsive Development**\n🔍 **SEO Optimization**\n\nWhich service interests you?";
  }
  if (msg.includes("location") || msg.includes("where") || msg.includes("ethiopia")) {
    return "Isayas is based in **Ambo, Oromia, Ethiopia** 🇪🇹. He works with clients globally and is available for remote projects worldwide!";
  }
  if (msg.includes("experience") || msg.includes("year")) {
    return "Isayas has **3+ years** of professional web development experience, having delivered 20+ projects for clients across various industries. He's constantly learning new technologies!";
  }
  if (msg.includes("next.js") || msg.includes("nextjs")) {
    return "Next.js is Isayas's primary framework! He uses it for SSR, static generation, API routes, and full-stack apps. He's built multiple production apps with Next.js 13/14/15+ using the App Router.";
  }
  if (msg.includes("supabase")) {
    return "Isayas uses Supabase as his go-to backend solution — PostgreSQL database, Auth, real-time subscriptions, and storage. This very portfolio uses Supabase for storing contact messages and projects!";
  }
  if (msg.includes("available") || msg.includes("free") || msg.includes("busy")) {
    return "Isayas is currently **open to work** and available for new projects! 🟢 He typically responds within 24 hours. Send him a message through the contact form or reach out on Telegram @milkibn.";
  }
  if (msg.includes("thank")) {
    return "You're welcome! 😊 If you have more questions or want to start a project with Isayas, don't hesitate to reach out. Have a great day!";
  }
  return "That's a great question! I can help you with information about Isayas's **skills, services, pricing, projects, and contact details**. What would you like to know? You can also scroll up to explore the full portfolio!";
}
