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
    category: "Laser-based manufacturing, photonics and industrial systems",
    title: "Laser-based Manufacturing and Industrial Systems",
    description:
      "Manish Sharma works across laser-based manufacturing and industrial systems: DED/LMD process development, photonics, sensing, control and R&D leadership at Exafuse.",
    defaultOgImage: "/og-image.png",
    repository: GITHUB_REPO_URL
  },
  person: {
    name: "Manish Sharma",
    positioning: "Laser-based manufacturing, photonics and industrial systems",
    promise: "Engineering from shop-floor constraints to repeatable processes and practical systems.",
    method: "Sense -> Model -> Decide -> Verify",
    shortBio: PROFESSIONAL_PROFILE.shortBio,
    longBio:
      `${PROFESSIONAL_PROFILE.shortBio} He connects deposition strategy, optical sensing, robotics, machine integration and manufacturing data. Applied AI, numerical modelling and automation are engineering tools within this work. ${PROFESSIONAL_PROFILE.research} Manish Sharma Lab publishes technical resources and the LMD Decision Brief to make engineering assumptions and evidence needs inspectable.`,
    location: "Germany",
    currentPublicRole: PROFESSIONAL_PROFILE.role,
    domains: [
      "Lasers and photonics",
      "Technical project and R&D leadership",
      "Optical sensing and calibration",
      "Industrial systems",
      "Applied AI and process control",
      "Laser Metal Deposition / DED",
      "Additive manufacturing repair",
      "Machine integration and robotics",
      "Manufacturing data and traceability",
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
