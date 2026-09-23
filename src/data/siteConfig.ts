import {
  EXAFUSE_BASE_URL,
  EXAFUSE_EN_URLS,
  EXAFUSE_URLS,
  GITHUB_PROFILE_URL,
  GITHUB_REPO_URL,
  LINKEDIN_URL,
  MANISH_SITE_URL
} from "./externalUrls";
import { PROFESSIONAL_PROFILE } from "./professionalProfile";

export const SITE_CONFIG = {
  site: {
    baseUrl: MANISH_SITE_URL,
    name: "Manish Sharma Lab",
    preferredSiteName: "Manish Sharma",
    alternateSiteName: "Manish Sharma Lab",
    owner: "Manish Sharma",
    category: "Industrial AI & Decision Systems",
    title: "Industrial AI and Decision Systems",
    description:
      "Manish Sharma builds evidence-aware AI systems for industrial decisions, with his strongest public work in LMD/DED, process monitoring, robotics, and engineering decision support at Exafuse.",
    defaultOgImage: "/og-image.png",
    repository: GITHUB_REPO_URL
  },
  person: {
    name: "Manish Sharma",
    positioning: "Industrial AI and decision systems, grounded in current LMD/DED work",
    promise: "AI for industrial decisions that need evidence, not just predictions.",
    method: "Sense -> Model -> Decide -> Verify",
    shortBio: PROFESSIONAL_PROFILE.shortBio,
    longBio:
      `${PROFESSIONAL_PROFILE.shortBio} His work connects LMD/DED process development, machine vision, robotics and engineering decision support. ${PROFESSIONAL_PROFILE.research} Manish Sharma Lab publishes technical resources and the LMD Decision Brief to make engineering assumptions and evidence needs inspectable.`,
    location: "Germany",
    currentPublicRole: PROFESSIONAL_PROFILE.role,
    domains: [
      "Industrial AI",
      "Decision systems",
      "Laser Metal Deposition / DED",
      "Additive manufacturing repair",
      "Monitoring interpretation",
      "Evidence ladders",
      "Repairability scoring",
      "AI readiness for manufacturing"
    ],
    links: {
      linkedin: LINKEDIN_URL,
      github: GITHUB_PROFILE_URL,
      exafuseProfile: null,
      orcid: null,
      zenodo: null,
      huggingFace: null,
      googleScholar: null,
      researchGate: null
    }
  },
  exafuse: {
    baseUrl: EXAFUSE_BASE_URL,
    canonicalLinks: EXAFUSE_URLS
  },
  exafuseEn: {
    canonicalLinks: EXAFUSE_EN_URLS
  }
} as const;

export const PERSON_ID = `${SITE_CONFIG.site.baseUrl}/identity#manish-sharma`;
export const WEBSITE_ID = `${SITE_CONFIG.site.baseUrl}/#website`;
export const EXAFUSE_LINKS = SITE_CONFIG.exafuse.canonicalLinks;
export const EXAFUSE_EN_LINKS = SITE_CONFIG.exafuseEn.canonicalLinks;
