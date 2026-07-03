"""
Resume content. Edit this file, then run: bash .claude/resume/build.sh

All content lives here. The HTML template at resume.html handles styling only.
Inline emphasis uses <strong>...</strong>. Use &amp; for literal ampersands.
"""

# --------------------------------------------------------------------------
# HEADER
# --------------------------------------------------------------------------

NAME = "Sapan Mozammel"
LEGAL_NAME = "Mozammel Ali"
ROLE = "Frontend Developer"

CONTACT = {
    "phone": "+88 01627134085",
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
    "Product-minded frontend developer with <strong>6+ years</strong> shipping "
    "React, Next.js, and TypeScript applications for SaaS, AI, and developer-tool "
    "companies serving <strong>6M+ users across 180+ countries</strong>. "
    "Experienced designing v1 frontend foundations, re-architecting complex admin "
    "panels, and integrating REST/GraphQL APIs with strict typing, accessibility, "
    "and performance discipline. Immediately available for full-time remote; "
    "EOR / contractor-friendly."
)

# --------------------------------------------------------------------------
# PROFESSIONAL EXPERIENCE
# Each entry: role, date, location, bullets (list of sentences)
# --------------------------------------------------------------------------

EXPERIENCE = [
    {
        "role": "Frontend Developer, Startise",
        "date": "Jun 2024 — May 2026",
        "location": "Dhaka, Bangladesh · Full-time",
        "bullets": [
            "Architected and shipped the <strong>v1 frontend for xCloud</strong>, a cloud hosting platform — designed component structure, state model, and API integration patterns that scale with the team.",
            "Delivered <strong>Templately</strong> across the admin SPA, Next.js marketing site, and WordPress plugin — three React surfaces against a shared GraphQL API.",
            "Built typed, reusable UI primitives in <strong>React 19 + TypeScript + Tailwind CSS</strong>, reducing duplicate component code across products.",
        ],
    },
    {
        "role": "Frontend Developer, WPDeveloper",
        "date": "Apr 2022 — May 2024",
        "location": "Dhaka, Bangladesh · Full-time",
        "bullets": [
            "<strong>Promoted from Junior Frontend Developer</strong> for consistent delivery and increasing ownership.",
            "<strong>Re-architected the BetterDocs admin panel</strong> and built its analytics dashboard + FAQ Builder, measurably reducing support-ticket volume.",
            "<strong>Established the frontend foundation for BetterLinks</strong> as first frontend dev on the project, part of a suite with <strong>6M+ installs across 180+ countries</strong>.",
        ],
    },
    {
        "role": "Junior Frontend Developer, WPDeveloper",
        "date": "Nov 2020 — Mar 2022",
        "location": "Dhaka, Bangladesh · Full-time",
        "bullets": [
            "Delivered admin frontends for <strong>BetterDocs, NotificationX, and SchedulePress</strong>, and built analytics dashboards with ApexCharts.",
            "Built rich content editors (Draft.js) and integrated WordPress REST APIs across React + Redux admin workflows.",
        ],
    },
    {
        "role": "Junior Frontend Developer, Easy.Jobs",
        "date": "Feb 2020 — Oct 2020",
        "location": "Dhaka, Bangladesh · Internship",
        "bullets": [
            "<strong>First frontend developer</strong> on an AI recruiting SaaS — scaffolded the Vue.js + Laravel frontend that the team still extends today.",
            "Built public career-site interfaces and interactive recruiter dashboards with ApexCharts.",
        ],
    },
]

# --------------------------------------------------------------------------
# FEATURED PROJECTS
# Each entry: name, stack, desc
# --------------------------------------------------------------------------

PROJECTS = [
    {
        "name": "react-render-kit",
        "url": "https://github.com/SapanMozammel/react-render-kit",
        "stack": "— TypeScript · React.js · npm",
        "desc": "Open-source React utility library for conditional and list rendering.",
    },
    {
        "name": "sapan-dev.vercel.app",
        "url": "https://sapan-dev.vercel.app",
        "stack": "— Next.js · Redux.js · Three.js",
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
        "name": "Easy.Jobs",
        "stack": "— Vue.js · Bootstrap · Laravel",
        "desc": "First frontend dev — shipped v1 of an AI recruiting SaaS.",
    },
    {
        "name": "+ 4 More",
        "stack": "— React · Redux · WordPress",
        "desc": "NotificationX, BetterLinks, SchedulePress, WPDeveloper Store.",
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
