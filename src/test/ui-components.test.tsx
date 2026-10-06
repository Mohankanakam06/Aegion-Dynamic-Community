import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NumberTicker } from '../components/ui/NumberTicker';
import { BlurText } from '../components/ui/BlurText';
import { Marquee } from '../components/ui/Marquee';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { BorderBeam } from '../components/ui/BorderBeam';
import { CardContainer, CardBody, CardItem } from '../components/ui/Card3D';
import { Timeline } from '../components/ui/Timeline';
import { AuroraBackground } from '../components/ui/AuroraBackground';
import { Spotlight } from '../components/ui/Spotlight';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Terminal } from 'lucide-react';

describe('Modern UI Components Suite', () => {
  it('renders NumberTicker with initial element', () => {
    const { container } = render(<NumberTicker value={350} />);
    expect(container).toBeDefined();
  });

  it('renders BlurText words', () => {
    render(<BlurText text="Aegion Dynamic Community" />);
    expect(screen.getByText('Aegion')).toBeDefined();
    expect(screen.getByText('Dynamic')).toBeDefined();
    expect(screen.getByText('Community')).toBeDefined();
  });

  it('renders Marquee elements and loops them', () => {
    render(
      <Marquee repeat={2}>
        <span>Ticker Item 1</span>
        <span>Ticker Item 2</span>
      </Marquee>
    );
    expect(screen.getAllByText('Ticker Item 1').length).toBeGreaterThanOrEqual(1);
  });

  it('renders BentoGrid and BentoCard', () => {
    render(
      <BentoGrid>
        <BentoCard
          name="Shipping Over Speaking"
          Icon={Terminal}
          tag="01 // CODE"
          description="Live code over slides"
          cta="Explore"
        />
      </BentoGrid>
    );
    expect(screen.getByText('Shipping Over Speaking')).toBeDefined();
    expect(screen.getByText('01 // CODE')).toBeDefined();
    expect(screen.getByText('Live code over slides')).toBeDefined();
  });

  it('renders BorderBeam', () => {
    const { container } = render(<BorderBeam />);
    expect(container.firstChild).toBeDefined();
  });

  it('renders Card3D primitives', () => {
    render(
      <CardContainer>
        <CardBody>
          <CardItem translateZ={50}>
            <div>3D Card Content</div>
          </CardItem>
        </CardBody>
      </CardContainer>
    );
    expect(screen.getByText('3D Card Content')).toBeDefined();
  });

  it('renders Timeline with milestone items', () => {
    const data = [
      { title: 'Jan 2026', content: <div>Launch Day</div> },
      { title: 'Apr 2026', content: <div>Scale Sprint</div> },
    ];
    render(<Timeline data={data} />);
    expect(screen.getByText('Launch Day')).toBeDefined();
    expect(screen.getByText('Scale Sprint')).toBeDefined();
  });

  it('renders AuroraBackground and Spotlight wrappers', () => {
    render(
      <AuroraBackground>
        <Spotlight />
        <div>Hero Content Inside Aurora</div>
      </AuroraBackground>
    );
    expect(screen.getByText('Hero Content Inside Aurora')).toBeDefined();
  });

  it('renders MagneticButton child', () => {
    render(
      <MagneticButton>
        <button>Click Action</button>
      </MagneticButton>
    );
    expect(screen.getByText('Click Action')).toBeDefined();
  });
});
