// Per-page metadata (migrated from the static pages' <head>).
export interface PageMeta { title: string; description: string; canonical: string | null; noindex: boolean }

export const PAGES: Record<string, PageMeta> = {
  "home": {
    "title": "Medzak Healthcare | AI-Powered Diagnostic Innovations for Early Detection",
    "description": "Medzak Healthcare delivers medical-grade ocular and metabolomic diagnostics for hospitals, labs and outreach camps — built for early detection.",
    "canonical": "https://medzak.co/",
    "noindex": false
  },
  "about": {
    "title": "About Us | Medzak Healthcare",
    "description": "Founded in 2018, Medzak Healthcare builds portable, AI-based, non-invasive diagnostic technology for eye and metabolic health.",
    "canonical": "https://medzak.co/about-us/",
    "noindex": false
  },
  "products": {
    "title": "Our Products | Medzak Healthcare",
    "description": "Explore MeiboX (4-in-1 AI ocular diagnostics), VuOpt (close-range imaging optics) and Metabo-X (AI-powered metabolomics analysis) from Medzak Healthcare.",
    "canonical": "https://medzak.co/our-products/",
    "noindex": false
  },
  "achievements": {
    "title": "Achievements & Media | Medzak Healthcare",
    "description": "Awards, recognition and media coverage for Medzak Healthcare, including the BIRAC WInER Award, Falling Walls Lab India 2019 and the MedTech Challenge 2019.",
    "canonical": "https://medzak.co/achievements/",
    "noindex": false
  },
  "gallery": {
    "title": "Gallery | Medzak Healthcare",
    "description": "Photo gallery of Medzak Healthcare: events, team, outreach and technology.",
    "canonical": "https://medzak.co/gallery-media/",
    "noindex": false
  },
  "careers": {
    "title": "Careers | Medzak Healthcare",
    "description": "Join Medzak Healthcare. Send your resume to director@medzak.co.",
    "canonical": "https://medzak.co/careers/",
    "noindex": false
  },
  "contact": {
    "title": "Contact Us | Medzak Healthcare",
    "description": "Contact Medzak Healthcare: Plot-39C, Sector 6 Dwarka, New Delhi 110075. Email admin@medzak.co, or send your resume to director@medzak.co.",
    "canonical": "https://medzak.co/contact/",
    "noindex": false
  },
  "team": {
    "title": "Our Team | Medzak Healthcare",
    "description": "Meet the Medzak Healthcare team: researchers and engineers in medicine, electronics, embedded systems and AI building accessible eye-care diagnostics.",
    "canonical": "https://medzak.co/our-team/",
    "noindex": true
  },
  "privacy": {
    "title": "Privacy Policy | Medzak Healthcare",
    "description": "Privacy policy placeholder for Medzak Healthcare.",
    "canonical": "https://medzak.co/privacy/",
    "noindex": true
  },
  "terms": {
    "title": "Terms of Use | Medzak Healthcare",
    "description": "Terms of use placeholder for Medzak Healthcare.",
    "canonical": "https://medzak.co/terms/",
    "noindex": true
  },
  "notFound": {
    "title": "Page not found | Medzak Healthcare",
    "description": "The page you are looking for could not be found.",
    "canonical": null,
    "noindex": true
  }
};
