// Header menu and search index source (migrated from tools/nav-data.json).
export interface NavLink { label: string; href: string; modal?: string }
export interface NavItem { label: string; href: string; description: string; detail?: string; icon?: string; thumb?: string }
export interface NavTab {
  id: string; label: string; href: string; pages: string[]; title: string;
  viewAll: NavLink; items: NavItem[]; footer: { note: string; cta: NavLink };
}

export const NAV: NavTab[] = [
  {
    "id": "home",
    "label": "Home",
    "href": "/",
    "pages": [
      "/"
    ],
    "title": "Welcome to Medzak",
    "viewAll": {
      "label": "Go to Home",
      "href": "/"
    },
    "items": [
      {
        "label": "About Medzak",
        "href": "/#about",
        "description": "Mission, vision & solution",
        "detail": "Early, affordable AI diagnostics for clinics and outreach camps.",
        "icon": "layers"
      },
      {
        "label": "News & Updates",
        "href": "/#news",
        "description": "Straight from our LinkedIn",
        "detail": "Selections, awards and challenge wins — as they happen.",
        "icon": "newspaper"
      },
      {
        "label": "Supporters & Funders",
        "href": "/#supporters",
        "description": "Government & incubator partners",
        "detail": "Backed by BIRAC, NIDHI-PRAYAS, MeitY, DSIR and RICH.",
        "icon": "heart"
      }
    ],
    "footer": {
      "note": "Innovating for disease prevention",
      "cta": {
        "label": "Explore Products",
        "href": "/our-products/"
      }
    }
  },
  {
    "id": "about",
    "label": "About Us",
    "href": "/about-us/",
    "pages": [
      "/about-us/",
      "/our-team/"
    ],
    "title": "About Medzak",
    "viewAll": {
      "label": "Read our story",
      "href": "/about-us/"
    },
    "items": [
      {
        "label": "Our Mission",
        "href": "/about-us/#mission",
        "description": "Accessible, portable technology",
        "detail": "Innovative solutions that enhance well-being through AI & Deeptech.",
        "icon": "target"
      },
      {
        "label": "Our Vision",
        "href": "/about-us/#vision",
        "description": "Quality care for every community",
        "detail": "Remote and underdeveloped areas thriving with quality healthcare.",
        "icon": "eye"
      },
      {
        "label": "Our Solution",
        "href": "/about-us/#solution",
        "description": "Non-invasive, AI-based diagnostics",
        "detail": "Portable deep-tech that diagnoses using surface sensing.",
        "icon": "lightbulb"
      },
      {
        "label": "Our Team",
        "href": "/our-team/",
        "description": "The minds behind Medzak",
        "detail": "Meet the researchers and engineers building our diagnostics.",
        "icon": "users"
      }
    ],
    "footer": {
      "note": "Founded in 2018 • Medzak Healthcare Pvt. Ltd.",
      "cta": {
        "label": "Meet the Team",
        "href": "/our-team/"
      }
    }
  },
  {
    "id": "products",
    "label": "Our Products",
    "href": "/our-products/",
    "pages": [
      "/our-products/"
    ],
    "title": "Diagnostic Platforms & Optical Systems",
    "viewAll": {
      "label": "View all products",
      "href": "/our-products/"
    },
    "items": [
      {
        "label": "Meibo-X",
        "href": "/our-products/#meibox",
        "description": "AI ocular screening · 10 diseases",
        "detail": "4-in-1 handheld imaging, >92% accuracy, results in under 2 minutes.",
        "icon": "eye"
      },
      {
        "label": "Metabo-X",
        "href": "/our-products/#metabo-x",
        "description": "Personalized metabolomics analysis",
        "detail": "Detects metabolic disease risk years before symptoms appear.",
        "icon": "flask"
      },
      {
        "label": "VuOpt",
        "href": "/our-products/#vuopt",
        "description": "High-precision multi-element optics",
        "detail": "Up to 40% MTF with 5–10 cm detection and low power draw.",
        "icon": "aperture"
      }
    ],
    "footer": {
      "note": "Patented optical technology • Clinically validated AI",
      "cta": {
        "label": "Book a Demo",
        "href": "#bookDemo",
        "modal": "bookDemo"
      }
    }
  },
  {
    "id": "achievements",
    "label": "Achievements & Media",
    "href": "/achievements/",
    "pages": [
      "/achievements/"
    ],
    "title": "Recognition & Press",
    "viewAll": {
      "label": "See everything",
      "href": "/achievements/"
    },
    "items": [
      {
        "label": "Achievements",
        "href": "/achievements/#achievements",
        "description": "12 milestones & honours",
        "detail": "Startup Maha Rathi, TiE Women Global Pitch, BIRAC WInER and more.",
        "icon": "award"
      },
      {
        "label": "Media",
        "href": "/achievements/#media",
        "description": "13 features & posts",
        "detail": "How TiE Chandigarh, Invest Punjab and others covered our wins.",
        "icon": "newspaper"
      },
      {
        "label": "Supporters & Funders",
        "href": "/achievements/#supporters",
        "description": "Government grants & incubators",
        "detail": "The government bodies and programmes that fund our research.",
        "icon": "heart"
      }
    ],
    "footer": {
      "note": "12 achievements • 13 media features",
      "cta": {
        "label": "View Achievements",
        "href": "/achievements/"
      }
    }
  },
  {
    "id": "gallery",
    "label": "Gallery",
    "href": "/gallery-media/",
    "pages": [
      "/gallery-media/"
    ],
    "title": "Moments & Milestones",
    "viewAll": {
      "label": "Open the gallery",
      "href": "/gallery-media/"
    },
    "items": [
      {
        "label": "Medzak at Startup Mahakumbh",
        "href": "/gallery-media/",
        "description": "Startup MahaRathi Challenge",
        "detail": "Receiving the Startup Maha Rathi award in New Delhi.",
        "thumb": "assets/images/nav/nav-g1.jpg"
      },
      {
        "label": "TiE Women Global Pitch winners",
        "href": "/gallery-media/",
        "description": "Startup & Innovation Conclave",
        "detail": "Medzak named winner of the TiE Women Global Pitch Competition.",
        "thumb": "assets/images/nav/nav-g2.jpg"
      },
      {
        "label": "Group photo at an event",
        "href": "/gallery-media/",
        "description": "SHE 4.0 Pitch Fest",
        "detail": "Presenting Medzak from the podium.",
        "thumb": "assets/images/nav/nav-g3.jpg"
      },
      {
        "label": "Speaking at the SHE 4.0 Pitch Fest",
        "href": "/gallery-media/",
        "description": "Pitch session",
        "detail": "Walking a seated audience through Medzak’s work.",
        "thumb": "assets/images/nav/nav-g4.jpg"
      }
    ],
    "footer": {
      "note": "24 photos from Startup Mahakumbh, TiE Chandigarh, SHE 4.0 and more",
      "cta": {
        "label": "Browse Gallery",
        "href": "/gallery-media/"
      }
    }
  },
  {
    "id": "careers",
    "label": "Careers",
    "href": "/careers/",
    "pages": [
      "/careers/"
    ],
    "title": "Build the future of diagnostics",
    "viewAll": {
      "label": "Careers",
      "href": "/careers/"
    },
    "items": [
      {
        "label": "Join Us",
        "href": "mailto:director@medzak.co?subject=Career%20at%20Medzak",
        "description": "Send us your resume",
        "detail": "Write to director@medzak.co and tell us how you’d like to contribute.",
        "icon": "mail"
      },
      {
        "label": "Meet the Team",
        "href": "/our-team/",
        "description": "Who you’ll work with",
        "detail": "Get to know the people behind Medzak’s AI diagnostics.",
        "icon": "users"
      },
      {
        "label": "Our Mission",
        "href": "/about-us/#mission",
        "description": "Why we do this",
        "detail": "Accessible, portable healthcare technology powered by AI & Deeptech.",
        "icon": "target"
      }
    ],
    "footer": {
      "note": "Send your resume to director@medzak.co",
      "cta": {
        "label": "Apply by Email",
        "href": "mailto:director@medzak.co?subject=Career%20at%20Medzak"
      }
    }
  },
  {
    "id": "contact",
    "label": "Contact Us",
    "href": "/contact/",
    "pages": [
      "/contact/"
    ],
    "title": "We’d love to hear from you",
    "viewAll": {
      "label": "Contact page",
      "href": "/contact/"
    },
    "items": [
      {
        "label": "Send a Message",
        "href": "/contact/#contact-form",
        "description": "Use our contact form",
        "detail": "Questions about partnerships or demos? Drop us a note.",
        "icon": "message"
      },
      {
        "label": "Visit Our Office",
        "href": "/contact/#map",
        "description": "Dwarka, New Delhi",
        "detail": "Plot-39C, Sector 6 Dwarka, New Delhi, Delhi 110075.",
        "icon": "map-pin"
      },
      {
        "label": "Email Us",
        "href": "mailto:admin@medzak.co",
        "description": "admin@medzak.co",
        "detail": "For general enquiries our team replies by email.",
        "icon": "mail"
      }
    ],
    "footer": {
      "note": "Plot-39C, Sector 6 Dwarka, New Delhi 110075",
      "cta": {
        "label": "Book a Demo",
        "href": "#bookDemo",
        "modal": "bookDemo"
      }
    }
  }
];

export const MENU_DEMO: NavLink = {"label": "BOOK A DEMO", "href": "#bookDemo", "modal": "bookDemo"};
