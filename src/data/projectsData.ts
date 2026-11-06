import type { ComponentType } from "react";
import { Network, Search, Smartphone } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiPrisma,
  SiCloudflare,
  SiLangchain,
  SiNodedotjs,
  SiFramer,
  SiTailwindcss,
  SiBun,
  SiEslint,
  SiRadixui,
  SiChartdotjs,
  SiGithub,
  SiFastapi,
  SiRedis,
  SiCelery,
  SiTldraw,
  SiCss,
  SiPython,
  SiAnthropic,
  SiClaude,
  SiGooglegemini,
  SiMeta,
  SiSpringboot,
  SiMongodb,
  SiDocker,
  SiPostgresql,
  SiSupabase,
  SiTensorflow,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { siteConfig } from "@/data/siteConfig";

export type TechIcon = ComponentType<{ className?: string }>;
export type TechKey =
  | "next" | "ts" | "react" | "three" | "prisma" | "cloud" | "langchain" | "langgraph" | "rag"
  | "node" | "motion" | "tailwind" | "bun" | "eslint" | "radixui" | "charts" | "github" | "fastapi"
  | "redis" | "celery" | "tldraw" | "css3" | "python" | "anthropic" | "claude" | "gemini" | "llama"
  | "springboot" | "mongodb" | "docker" | "java" | "postgresql" | "supabase" | "tensorflow" | "android";

export type TechItem = TechKey | { label: string; tooltip?: string; };

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  video: string;
  description: string;
  tech: TechItem[];
  github: string;
  live: string;
  starsText?: string;
  backgroundImage?: string;
  hasPin: boolean;
  category: string;
  year: string;
  role: string;
  summary: string;
  tools: string[];
  outcomes: string[];
  featured: boolean;
}

export const iconMap: Record<TechKey, TechIcon> = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, three: SiThreedotjs, prisma: SiPrisma,
  cloud: SiCloudflare, langchain: SiLangchain, langgraph: Network, rag: Search, node: SiNodedotjs,
  motion: SiFramer, tailwind: SiTailwindcss, bun: SiBun, eslint: SiEslint, radixui: SiRadixui,
  charts: SiChartdotjs, github: SiGithub, fastapi: SiFastapi, redis: SiRedis, celery: SiCelery,
  tldraw: SiTldraw, css3: SiCss, python: SiPython, anthropic: SiAnthropic, claude: SiClaude,
  gemini: SiGooglegemini, llama: SiMeta,
  springboot: SiSpringboot, mongodb: SiMongodb, docker: SiDocker, java: FaJava,
  postgresql: SiPostgresql, supabase: SiSupabase, tensorflow: SiTensorflow, android: Smartphone,
};

export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", three: "Three.js", prisma: "Prisma",
  cloud: "Cloudflare", langchain: "LangChain", langgraph: "LangGraph", rag: "RAG",
  node: "Node.js", motion: "Framer Motion", tailwind: "Tailwind CSS", bun: "Bun", eslint: "ESLint",
  radixui: "Radix UI", charts: "Charts", github: "GitHub API", fastapi: "FastAPI", redis: "Redis",
  celery: "Celery", tldraw: "tldraw", css3: "CSS3", python: "Python", anthropic: "Anthropic",
  claude: "Claude", gemini: "Gemini", llama: "LLaMA",
  springboot: "Spring Boot", mongodb: "MongoDB", docker: "Docker", java: "Java",
  postgresql: "PostgreSQL", supabase: "Supabase", tensorflow: "TensorFlow", android: "Android",
};

const projectLabels: Record<string, string> = {
  "url-shortener": "BACKEND API",
  vibebench: "AI BENCHMARKING",
  sherlock: "GRAPH INVESTIGATION",
  gridcam: "CAMERA INTELLIGENCE",
  geoloanlens: "LOAN VERIFICATION",
};

const techKeyByLabel = Object.fromEntries(Object.entries(techNames).map(([key, label]) => [label.toLowerCase(), key])) as Record<string, TechKey>;

export const projectsData: Project[] = siteConfig.portfolio.projects.map((project) => ({
  slug: project.id,
  title: project.title,
  imageTitle: projectLabels[project.id] ?? project.category,
  src: project.coverImage,
  video: project.videoUrl,
  description: project.id === "geoloanlens"
    ? "A team-built loan-verification platform with AI features and geospatial tracking, created for the Smart India Hackathon 2025 national grand finals."
    : project.description,
  tech: project.tools.map((label): TechItem => techKeyByLabel[label.toLowerCase()] ?? { label }),
  github: project.sourceUrl,
  live: project.liveUrl,
  backgroundImage: project.coverImage || undefined,
  hasPin: project.featured,
  category: project.category,
  year: project.year,
  role: project.id === "geoloanlens" ? "Team contributor" : project.role,
  summary: project.summary,
  tools: project.tools,
  outcomes: "responsibilitiesAndOutcomes" in project ? project.responsibilitiesAndOutcomes ?? [] : ["Smart India Hackathon 2025 National Grand Finalist."],
  featured: siteConfig.portfolio.featuredProjectIds.includes(project.id),
}));
