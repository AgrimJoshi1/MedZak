export const SITE = {
  name: 'Medzak Healthcare',
  legalName: 'Medzak Healthcare Pvt. Ltd.',
  url: 'https://medzak.co',
  founded: 2018,
  email: 'admin@medzak.co',
  careersEmail: 'director@medzak.co',
  /** Every form posts here (same endpoint as the previous site). */
  formAction: 'https://medzak.co/esend.php',
  address: {
    street: 'Plot-39C, Sector 6 Dwarka',
    lines: ['Plot-39C,', 'Sector 6 Dwarka, New Delhi, Delhi 110075'],
    short: 'Plot-39C, Sector 6 Dwarka, New Delhi',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110075',
  },
  ogImage: 'https://medzak.co/images/Medzak-banner.jpg',
  tagline: 'Innovating for disease prevention',
} as const;

export const SUPPORTERS = [
  { key: 'birac', alt: 'BIRAC — Biotechnology Ignition Grant (BIG) Scheme' },
  { key: 'winer', alt: 'BIRAC WInER Award — Women in Entrepreneurial Research' },
  { key: 'nidhi-prayas', alt: 'NIDHI-PRAYAS — Department of Science & Technology, Government of India' },
  { key: 'meity', alt: 'MeitY Startup Hub — Ministry of Electronics & Information Technology' },
  { key: 'dsir', alt: 'DSIR — Department of Scientific and Industrial Research' },
  { key: 'rich', alt: 'RICH — Research and Innovation Circle of Hyderabad' },
] as const;

/** The six LinkedIn-style ticker items (placeholders until real post URLs exist; they link to Achievements). */
export const TICKER = [
  'Selected for the RICH-AID Program Start-up Cohort',
  'Selected as one of the Top 14 finalists Falling Walls Lab India 2019',
  'Shortlisted in Digital Health Start-ups Cohort 2',
  'Medzak receives Women Entrepreneur Research Award (WInER Awards Season 3) from BIRAC India-TiE',
  'Women in Technology Ignite, India MATLAB Expo 2020',
  'Medzak, one of the Top 3 innovators, at the MedTech Challenge’2019 for the innovation.',
] as const;
