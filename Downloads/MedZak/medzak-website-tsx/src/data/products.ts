export type ProductId = 'meibox' | 'metabo-x' | 'vuopt';

export interface Product {
  id: ProductId;
  name: string;
  /** One line under the tab name. */
  tagline: string;
  /** Short bold line above the copy (absent for VuOpt, as on the previous site). */
  lead?: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  /** Spec-sheet rows: every value is copy that already exists on the site. */
  specs: { label: string; value: string }[];
  features: string[];
  chips: string[];
  navDescription: string;
  /** Call to action on the Our Products page. */
  cta: { label: string; href?: string; modal?: 'bookDemo' };
}

export const PRODUCTS: Product[] = [
  {
    id: 'meibox',
    name: 'MeiboX',
    tagline: 'Advanced 4-in-1 AI-Powered Ocular Diagnostic Device',
    lead: 'Advanced 4-in-1 AI-Powered Ocular Diagnostic Device',
    paragraphs: [
      'Simplify eye screening with a portable, handheld device that combines IR, visible, ultrasonic, and fluorescence imaging in one system. AI-guided diagnosis detects 10 major surface eye diseases in under 2 minutes, with >92% imaging accuracy — no specialist equipment or long OPD queues required.',
    ],
    image: { src: 'assets/images/offering-meibox.jpg', alt: 'MeiboX portable eye-care diagnostic device' },
    specs: [
      { label: 'Imaging', value: 'IR, visible, ultrasonic and fluorescence in one system' },
      { label: 'Detects', value: '10 major surface eye diseases' },
      { label: 'Imaging accuracy', value: '>92%' },
      { label: 'Time to result', value: 'Under 2 minutes' },
      { label: 'Format', value: 'Portable, handheld' },
    ],
    features: [
      'IR, visible, ultrasonic and fluorescence imaging in one system',
      'AI-guided diagnosis of 10 major surface eye diseases',
      'Results in under 2 minutes, with >92% imaging accuracy',
      'No specialist equipment or long OPD queues required',
    ],
    chips: ['>92% accuracy', 'Portable', '10 diseases'],
    navDescription: 'AI ocular screening · 10 diseases',
    cta: { label: 'Request a Demo', modal: 'bookDemo' },
  },
  {
    id: 'metabo-x',
    name: 'Metabo-X',
    tagline: 'AI-powered personalized metabolomics analysis',
    lead: 'AI-powered personalized metabolomics analysis',
    paragraphs: [
      'Detect disease risk years before symptoms appear. Metabo-X analyzes disease-linked metabolites from a simple blood sample, using AI to generate a personalized risk score, nutrition guidance, and physician-reviewed therapy recommendations — built as a clinical decision aid, not a replacement for diagnosis.',
    ],
    image: { src: 'assets/images/metabo-x-product.jpg', alt: 'Metabo-X logo: a green medical cross with a molecular structure' },
    specs: [
      { label: 'Sample', value: 'A simple blood sample' },
      { label: 'Analysis', value: 'Disease-linked metabolites, read with AI' },
      { label: 'Output', value: 'Personalized risk score, nutrition guidance, physician-reviewed therapy recommendations' },
      { label: 'Role', value: 'Clinical decision aid, not a replacement for diagnosis' },
    ],
    features: [
      'Analyzes disease-linked metabolites from a simple blood sample',
      'AI-generated personalized risk score',
      'Nutrition guidance',
      'Physician-reviewed therapy recommendations',
    ],
    chips: ['Blood sample', 'Risk score', 'Clinical decision aid'],
    navDescription: 'Personalized metabolomics analysis',
    cta: { label: 'Talk to Our Team', href: '/contact/' },
  },
  {
    id: 'vuopt',
    name: 'VuOpt',
    tagline: 'High-precision multi-element optics',
    paragraphs: [
      'Engineered for sharp, low-power imaging at close range, the VuOpt optics lens system delivers up to 40% MTF and a 5–10 cm detection range.',
      'An optical imaging lens system for providing high-efficiency light delivery to biological organisms, tissues, or agents, and more particularly relates to embedding collinear illumination optics within a high-light-collection, low-numerical-aperture lens with low power consumption. Our solution is compact, and close-range lenses are designed to provide high image quality with low distortion, especially for medical imaging.',
    ],
    image: { src: 'assets/images/offering-lens.jpg', alt: 'Cross-section render of the VuOpt multi-element lens system' },
    specs: [
      { label: 'Modulation transfer', value: 'Up to 40% MTF' },
      { label: 'Detection range', value: '5–10 cm' },
      { label: 'Power', value: 'Low power consumption' },
      { label: 'Optics', value: 'Compact close-range lenses with low distortion' },
    ],
    features: ['Up to 40% MTF', '5–10 cm detection range', 'Low power consumption', 'Compact close-range lenses with low distortion'],
    chips: ['40% MTF', '5–10 cm range', 'Low power'],
    navDescription: 'High-precision multi-element optics',
    cta: { label: 'Learn More', href: '/contact/' },
  },
];

/** The four imaging types of MeiboX, exactly as the product copy names them. */
export const MODALITIES = [
  { id: 'ir', label: 'IR' },
  { id: 'visible', label: 'Visible' },
  { id: 'ultrasonic', label: 'Ultrasonic' },
  { id: 'fluorescence', label: 'Fluorescence' },
] as const;
