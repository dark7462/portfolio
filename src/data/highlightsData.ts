import { siteConfig } from "@/data/siteConfig";

export type Highlight = {
  id: string;
  title: string;
  badge: string;
  image: string;
  link?: string;
};

export const highlightsData: Highlight[] = siteConfig.portfolio.awards.map((award, index) => ({
  id: "recognition-" + index,
  title: award.title,
  badge: award.result,
  image: siteConfig.identity.favicon,
  link: award.proofUrl || undefined,
}));
