import member1 from '../assets/images/build-hours/3.jpg';
import member2 from '../assets/images/build-hours/4.jpg';
import member3 from '../assets/images/proxima/2.jpg';
import member4 from '../assets/images/proxima/5.jpg';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
  avatar: string;
  projectHighlight?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Aegion gave me what standard college curriculum never could: the visceral thrill of shipping real software with people who care deeply about craft.',
    author: 'Samarth Rao',
    role: 'Full-Stack Developer & Student Lead',
    organization: 'GITAM University Vizag',
    avatar: member1,
    projectHighlight: 'Shipped an open-source decentralized file sharing tool'
  },
  {
    id: 't2',
    quote: 'Before Aegion, I was learning in silos. During Build Hours, I had a senior mentor sit next to me, debug my Docker configuration, and critique my system design within minutes.',
    author: 'Ananya Prabhu',
    role: 'AI / ML Researcher & Builder',
    organization: 'AU College of Engineering',
    avatar: member2,
    projectHighlight: 'Built an offline speech-to-text model'
  },
  {
    id: 't3',
    quote: 'Winning PROXIMA was a catalyst. The exposure and direct feedback from judges helped us turn our hackathon project into an actual funded startup prototype.',
    author: 'Karthik Shenoy',
    role: 'Founder & Hardware Hacker',
    organization: 'GVP College of Engineering',
    avatar: member3,
    projectHighlight: 'Developed solar IoT crop monitoring hardware'
  },
  {
    id: 't4',
    quote: 'The energy in the room during Saturday Build Hours is electrifying. You see students designing Figma systems, writing Rust kernels, and training PyTorch models side-by-side.',
    author: 'Disha Nayak',
    role: 'Product Designer & Community Host',
    organization: 'Vignan Institute of Tech',
    avatar: member4,
    projectHighlight: 'Redesigned regional transit accessibility app'
  }
];

export interface CommunityMetric {
  label: string;
  value: string;
  detail: string;
}

export const communityMetrics: CommunityMetric[] = [
  {
    label: 'Active Student Builders',
    value: '350+',
    detail: 'Across 12+ regional engineering and tech institutions in Vizag'
  },
  {
    label: 'Open Source Projects',
    value: '45+',
    detail: 'Shipped to production across web, mobile, AI, and embedded hardware'
  },
  {
    label: 'Build Hours Hosted',
    value: '600+',
    detail: 'Dedicated weekend collaborative shipping and mentorship hours'
  },
  {
    label: 'Demo Days & Hackathons',
    value: '18',
    detail: 'High-energy showcases connecting students with real industry leaders'
  }
];
