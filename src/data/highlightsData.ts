export type Highlight = {
  id: string;
  title: string;
  badge: string;
  image: string;
  link?: string;
};

export const highlightsData: Highlight[] = [
  {
    id: "sih-2025",
    title: "SIH 2025 National Grand Finalist (Top 0.5%)",
    badge: "SIH 2025",
    image: "/highlights/gsoc-selection.png",
  },
  {
    id: "unstop-ambassador",
    title: "India's Top 6 Campus Ambassador at Unstop",
    badge: "Unstop",
    image: "/highlights/vercel-oss.png",
    link: "https://drive.google.com/file/d/1rZzL144SeLnSt6nns6AyfQtWQRdVb7Sk/view?usp=sharing",
  },
  {
    id: "tata-challenge",
    title: "Tata Imagination Challenge — Certificate of Appreciation",
    badge: "Tata Group",
    image: "/highlights/lf-mentorship.png",
    link: "https://drive.google.com/file/d/1YsRgHU_9OHuJIulHFJ0JP6WOGW8Amgwv/view?usp=sharing",
  },
  {
    id: "cambridge-english",
    title: "Cambridge English Empower B2 Certification",
    badge: "Cambridge",
    image: "/highlights/podcast-harkirat.png",
  },
];
