"""
Resume content. Edit this file, then run: bash .claude/resume/build.sh

All content lives here. The HTML template at resume.html handles styling only.
Inline emphasis uses <strong>...</strong>. Use &amp; for literal ampersands.
"""

# --------------------------------------------------------------------------
# HEADER
# --------------------------------------------------------------------------

NAME = "Sapan Mozammel"
ROLE = "Frontend Developer"

CONTACT = {
    "email": "sapanmozammel@gmail.com",
    "website": "sapan-dev.vercel.app",
    "linkedin": "linkedin.com/in/sapanmozammel",
    "github": "github.com/SapanMozammel",
    "location": "Dhaka, Bangladesh · Remote",
}

# --------------------------------------------------------------------------
# SUMMARY
# --------------------------------------------------------------------------

SUMMARY = (
    "Product-minded frontend developer with <strong>5+ years</strong> shipping "
    "React, Next.js, and TypeScript applications for SaaS, AI, and developer-tool "
    "companies serving <strong>6M+ users across 180+ countries</strong>. "
    "Experienced designing v1 frontend foundations, re-architecting complex admin "
    "panels, and integrating REST/GraphQL APIs with strict typing, accessibility, "
    "and performance discipline. Available for full-time remote; EOR / "
    "contractor-friendly; 30-day notice."
)

# --------------------------------------------------------------------------
# PROFESSIONAL EXPERIENCE
# Each entry: role, date, location, bullets (list of sentences)
# --------------------------------------------------------------------------

EXPERIENCE = [
    {
        "role": "Frontend Developer, Startise",
        "date": "Jun 2024 — Present",
        "location": "Dhaka, Bangladesh · Full-time",
        "bullets": [
            "Architected and shipped the <strong>v1 frontend for xCloud</strong>, a cloud hosting platform — designed component structure, state model, and API integration patterns that scale with the team.",
            "Delivered <strong>Templately</strong> across the admin SPA, Next.js marketing site, and WordPress plugin — three React surfaces against a shared GraphQL API.",
            "Built typed, reusable UI primitives in <strong>React 19 + TypeScript + Tailwind CSS</strong>, reducing duplicate component code across products.",
            "Translated Figma specs with pixel-level fidelity including hover and transition intent; collaborated daily with backend, design, and product teams.",
        ],
    },
    {
        "role": "Frontend Developer, TubeOnAI",
        "date": "Nov 2023 — May 2024",
        "location": "Wyoming, USA · Remote, Part-time",
        "bullets": [
            "Owned the <strong>Next.js + TypeScript</strong> web app for an AI content-repurposing platform (videos, podcasts, PDFs, articles → structured summaries).",
            "Introduced a <strong>React Query</strong> caching strategy that measurably reduced API load and improved perceived performance.",
            "Unblocked a stalled audio-player integration using React Modern Audio Player — shipped a long-delayed feature.",
            "Built type-safe forms with <strong>React Hook Form + Zod</strong>, wired Firebase auth, and instrumented Sentry for error monitoring.",
        ],
    },
    {
        "role": "Frontend Developer, WPDeveloper",
        "date": "Nov 2020 — May 2024",
        "location": "Dhaka, Bangladesh · Full-time",
        "bullets": [
            "Delivered admin frontends for <strong>BetterDocs, NotificationX, SchedulePress, BetterLinks</strong>, and WPDeveloper Store — a plugin suite with <strong>6M+ active installations across 180+ countries</strong>.",
            "<strong>Re-architected the BetterDocs admin panel</strong> and built its analytics dashboard + FAQ Builder; UX improvements measurably reduced support-ticket volume.",
            "<strong>Established the frontend foundation for BetterLinks</strong> as the first frontend developer on the project.",
            "Built rich content editors (Draft.js, QuickBuilder), analytics dashboards (ApexCharts), and complex admin workflows across React + Redux + WordPress REST APIs.",
        ],
    },
    {
        "role": "Junior Frontend Developer, Easy.Jobs",
        "date": "Feb 2020 — Oct 2020",
        "location": "Dhaka, Bangladesh · Internship",
        "bullets": [
            "<strong>First frontend developer</strong> on an AI recruiting SaaS — scaffolded the Vue.js + Laravel frontend that the team still extends today.",
            "Built public career-site interfaces and interactive recruiter dashboards with ApexCharts.",
            "Defined reusable Vue component patterns that accelerated feature delivery for follow-on engineers.",
        ],
    },
]

# --------------------------------------------------------------------------
# FEATURED PROJECTS
# Each entry: name, stack, desc
# --------------------------------------------------------------------------

PROJECTS = [
    {
        "name": "sapan-dev.vercel.app",
        "stack": "— Next.js · React 19 · Three.js",
        "desc": "Portfolio, 16 locales incl. RTL Arabic, server-component-first.",
    },
    {
        "name": "TubeOnAI",
        "stack": "— Next.js · React Query · Firebase",
        "desc": "AI content-repurposing platform for videos, podcasts, PDFs.",
    },
    {
        "name": "Templately",
        "stack": "— Next.js · Redux · GraphQL",
        "desc": "Three React surfaces sharing one GraphQL API.",
    },
    {
        "name": "xCloud",
        "stack": "— Vue 3 · Vite · Laravel API",
        "desc": "V1 frontend architecture from empty repo to production.",
    },
    {
        "name": "BetterDocs",
        "stack": "— React · Draft.js · ApexCharts",
        "desc": "Re-architected admin panel, analytics dashboard, FAQ Builder.",
    },
    {
        "name": "+ 4 More",
        "stack": "— React · Redux · WordPress",
        "desc": "NotificationX, BetterLinks, SchedulePress, WPDeveloper Store, Easy.Jobs.",
    },
]

# --------------------------------------------------------------------------
# EDUCATION
# --------------------------------------------------------------------------

EDUCATION = [
    {
        "title": "B.Sc. in Computer Science &amp; Engineering",
        "date": "Sep 2018 — May 2022",
        "sub": "Daffodil International University, Dhaka, Bangladesh · 145 credits",
    },
    {
        "title": "Diploma in Computer Engineering",
        "date": "2014 — 2017",
        "sub": "Brahmanbaria Polytechnic Institute, Brahmanbaria, Bangladesh",
    },
]

# --------------------------------------------------------------------------
# TECHNICAL SKILLS (rendered in a 4-column grid)
# --------------------------------------------------------------------------

SKILLS = [
    "React 19", "Next.js 16", "TypeScript", "Vue.js",
    "Redux Toolkit", "React Query", "GraphQL", "REST APIs",
    "Zod", "React Hook Form", "Tailwind CSS", "SCSS",
    "shadcn/ui", "Framer Motion", "GSAP", "Three.js",
    "Node.js", "Prisma", "MongoDB", "Firebase",
    "Jest", "Playwright", "Vitest", "Vercel",
    "Docker", "CI/CD", "WordPress", "Figma",
    "Design Systems", "Accessibility (WCAG)", "i18n / RTL", "Core Web Vitals",
]

# --------------------------------------------------------------------------
# ADDITIONAL INFORMATION (bullet list with bold label prefix)
# --------------------------------------------------------------------------

ADDITIONAL = [
    {
        "label": "Languages",
        "text": "English (Professional), Bengali (Native)",
    },
    {
        "label": "Certifications",
        "text": (
            "Artificial Intelligence &amp; Machine Learning "
            "(Bangladesh Computer Council, ICT Division, 2021); "
            "Interactivity with JavaScript (University of Michigan, 2020); "
            "Advanced Mobile Game Development (ICT Division, 2017); "
            "Mobile Game Graphics Design (ICT Division, 2017)."
        ),
    },
    {
        "label": "Strengths",
        "text": (
            "Frontend architecture &amp; design systems; "
            "Performance &amp; Core Web Vitals; "
            "Accessibility (WCAG, ARIA, RTL); "
            "Figma → code with pixel fidelity; "
            "Async remote collaboration; "
            "Clean, typed, maintainable code."
        ),
    },
]
