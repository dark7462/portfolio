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

export const projectsData: Project[] = [
  {
    slug: "geoloanlens",
    title: "GeoLoanLens",
    imageTitle: "SIH 2025 Grand Finals",
    src: "/projects/geoloanlens-concept.jpg",
    video: "",
    description: "AI-driven loan verification platform with real-time geospatial tracking — SIH 2025 National Grand Finalist (Top 0.5%)",
    tech: ["react", "ts", "tailwind", "supabase", "postgresql"],
    github: "https://github.com/dark7462/geoloanlens",
    live: "https://geoloanlens.vercel.app/",
    backgroundImage: "/projects/geoloanlens-concept.jpg",
    hasPin: true,
  },
  {
    slug: "vibebench",
    title: "VibeBench",
    imageTitle: "AI Evaluation Platform",
    src: "/projects/vibebench-concept.jpg",
    video: "",
    description: "A premium AI Coding Model evaluation platform that automates generation, sandbox execution, and metric scoring.",
    tech: ["springboot", "mongodb", "redis", "docker", "java"],
    github: "https://github.com/dark7462/VibeBench",
    live: "https://vibe-bench-six.vercel.app/",
    backgroundImage: "/projects/vibebench-concept.jpg",
    hasPin: false,
  },
  {
    slug: "gridcam",
    title: "GridCam",
    imageTitle: "AI Camera App",
    src: "/projects/gridcam-concept.jpg",
    video: "",
    description: "AI-powered Android camera app that analyzes real-time scenes to suggest optimal photography composition grids.",
    tech: ["java", "tensorflow", "android"],
    github: "https://github.com/dark7462/GridCam",
    live: "https://gridcam.app/",
    backgroundImage: "/projects/gridcam-concept.jpg",
    hasPin: false,
  },
  {
    slug: "url-shortener",
    title: "URL Shortener API",
    imageTitle: "Scalable API",
    src: "/projects/url-shortener-concept.jpg",
    video: "",
    description: "A Spring Boot URL shortener API with MongoDB Atlas persistence and Redis caching.",
    tech: ["springboot", "redis", "mongodb", "docker", "java"],
    github: "https://github.com/dark7462/url-shortner",
    live: "",
    backgroundImage: "/projects/url-shortener-concept.jpg",
    hasPin: false,
  },
];
