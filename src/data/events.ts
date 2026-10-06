import buildHour1 from '../assets/images/build-hours/1.jpg';
import buildHour2 from '../assets/images/build-hours/2.jpg';
import buildHour3 from '../assets/images/build-hours/3.jpg';
import buildHour4 from '../assets/images/build-hours/4.jpg';
import buildHour5 from '../assets/images/build-hours/5.jpg';
import buildHour6 from '../assets/images/build-hours/6.jpg';
import buildHour7 from '../assets/images/build-hours/7.jpg';

import proxima1 from '../assets/images/proxima/1.jpg';
import proxima2 from '../assets/images/proxima/2.jpg';
import proxima3 from '../assets/images/proxima/3.jpg';
import proxima4 from '../assets/images/proxima/4.jpg';
import proxima5 from '../assets/images/proxima/5.jpg';
import proxima6 from '../assets/images/proxima/6.jpg';

import communityFeature from '../assets/images/community-feature.jpg';

export interface EventItem {
  id: string;
  title: string;
  tag: string;
  category: 'build' | 'showcase' | 'meetup';
  date: string;
  time?: string;
  location: string;
  attendees: string;
  summary: string;
  description: string;
  highlights: string[];
  coverImage: string;
  images: string[];
  status: 'past' | 'upcoming' | 'ongoing';
}

export const events: EventItem[] = [
  {
    id: 'build-hours',
    title: 'Aegion Build Hours',
    tag: 'Weekly Cohort',
    category: 'build',
    date: 'Every Sunday',
    time: '11:00 AM - 3:00 PM IST',
    location: 'Vizag Innovation Hub & Hybrid Discord',
    attendees: '40+ Builders / Session',
    summary: 'Focused, distraction-free co-working & shipping sessions for passionate student technologists.',
    description: 'Build Hours are our signature weekend sprint sessions. No slides, no ceremonial pitches — just pure, focused flow state. Builders bring their ideas, collaborate with peers, debug in real-time, and ship functional prototypes before the sunset demo circle.',
    highlights: [
      'Uninterrupted 4-hour build blocks with high-speed WiFi and coffee',
      'Instant peer debugging and architectural whiteboard reviews',
      'End-of-session 3-minute lightning demos and feedback',
      'Direct mentorship from senior engineers and open-source contributors'
    ],
    coverImage: buildHour1,
    images: [
      buildHour1,
      buildHour2,
      buildHour3,
      buildHour4,
      buildHour5,
      buildHour6,
      buildHour7
    ],
    status: 'ongoing'
  },
  {
    id: 'proxima',
    title: 'PROXIMA 2025: Tech Horizon',
    tag: 'Flagship Tech Fest',
    category: 'showcase',
    date: 'March 2025',
    time: '2-Day Flagship Experience',
    location: 'Vizag Convention Arena',
    attendees: '500+ Attendees, 24 Teams',
    summary: 'The premier student innovation showcase featuring 24-hour hackathon, keynote talks, and expo.',
    description: 'PROXIMA is Aegion’s flagship annual celebration of technology, design, and product thinking. It unites the brightest college talent across Vizag and Andhra Pradesh to compete in hardware/software hackathons, present moonshot projects, and connect with tier-1 tech leaders.',
    highlights: [
      '24-Hour intense hardware & software hackathon with $3,000+ prize pool',
      'Keynotes from top venture-backed founders and dev-rel leaders',
      'Interactive project expo visited by industry recruiters and angel investors',
      'Exclusive networking lounges, workshops, and swags'
    ],
    coverImage: proxima1,
    images: [
      proxima1,
      proxima2,
      proxima3,
      proxima4,
      proxima5,
      proxima6
    ],
    status: 'past'
  },
  {
    id: 'community-meetup',
    title: 'Aegion Open House & Demo Night',
    tag: 'Community Gathering',
    category: 'meetup',
    date: 'Monthly First Friday',
    time: '5:30 PM - 8:30 PM IST',
    location: 'Open Courtyard, Vizag',
    attendees: '100+ Creators & Thinkers',
    summary: 'Casual evenings of product critiques, storytelling, lightning talks, and authentic conversations.',
    description: 'An inclusive gateway for newcomers to immerse themselves in the Aegion culture. Hear honest retrospective talks on project failures, see early-stage design mocks, enjoy warm chai, and find your next co-founder or project teammate.',
    highlights: [
      '5-minute failure & learning retrospectives from community members',
      'Live product UI/UX critiques and feedback circles',
      'Open mic session for anyone seeking project contributors',
      'Informal networking, food, and music'
    ],
    coverImage: communityFeature,
    images: [
      communityFeature,
      buildHour2,
      proxima3,
      buildHour5
    ],
    status: 'upcoming'
  }
];

export function getEventById(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}
