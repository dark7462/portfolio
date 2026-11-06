import type { Metadata } from "next";
import { Anton, Caveat, Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { siteConfig } from '@/data/siteConfig';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const title = siteConfig.identity.fullName + " | Software Engineer";
const description = siteConfig.identity.fullName + " builds Java/Spring Boot services, AI products, and cloud automation. Explore projects, campus leadership, education, and contact details.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | " + siteConfig.identity.fullName },
  description,
  authors: [{ name: siteConfig.identity.fullName }],
  ...(siteConfig.websiteUrl ? { metadataBase: new URL(siteConfig.websiteUrl), alternates: { canonical: siteConfig.websiteUrl } } : {}),
  icons: {
    icon: [
      { url: siteConfig.identity.favicon, type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title,
    description,
    siteName: siteConfig.identity.fullName,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary", title, description },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.identity.fullName,
  description: siteConfig.identity.profession,
  email: "mailto:" + siteConfig.contact.email,
  sameAs: [siteConfig.contact.github, siteConfig.contact.linkedin],
  ...(siteConfig.websiteUrl ? { url: siteConfig.websiteUrl } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${caveat.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-black dark:text-zinc-50 transition-colors duration-300">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
