import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';
import { BrandTicker } from './BrandTicker';
import { Modal } from './Modal';
import { Lightbox } from './Lightbox';

describe('UI Primitives', () => {
  describe('Reveal Component', () => {
    it('renders children properly', () => {
      render(<Reveal><span>Reveal Content</span></Reveal>);
      expect(screen.getByText('Reveal Content')).toBeDefined();
    });
  });

  describe('TiltCard Component', () => {
    it('renders children inside card', () => {
      render(<TiltCard><div>Card Body</div></TiltCard>);
      expect(screen.getByText('Card Body')).toBeDefined();
    });
  });

  describe('BrandTicker Component', () => {
    it('renders ticker items and duplicates for seamless loop', () => {
      const items = ['Tech', 'Design', 'Code'];
      render(<BrandTicker items={items} />);
      expect(screen.getAllByText('Tech').length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Modal Component', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Modal
          isOpen={false}
          onClose={() => {}}
          tag="Test Tag"
          title="Test Title"
          description="Test Desc"
          images={[]}
        />
      );
      expect(screen.queryByText('Test Title')).toBeNull();
    });

    it('renders title and triggers onClose on close button click', () => {
      const handleClose = vi.fn();
      render(
        <Modal
          isOpen={true}
          onClose={handleClose}
          tag="Cohort"
          title="Modal Test Title"
          description="Detailed description"
          images={['img1.jpg']}
        />
      );
      expect(screen.getByText('Modal Test Title')).toBeDefined();
      const closeBtn = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Lightbox Component', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Lightbox
          isOpen={false}
          onClose={() => {}}
          images={['img1.jpg', 'img2.jpg']}
          currentIndex={0}
          onIndexChange={() => {}}
        />
      );
      expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('navigates next and previous correctly', () => {
      const handleIndexChange = vi.fn();
      render(
        <Lightbox
          isOpen={true}
          onClose={() => {}}
          images={['img1.jpg', 'img2.jpg', 'img3.jpg']}
          currentIndex={1}
          onIndexChange={handleIndexChange}
        />
      );
      const nextBtn = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextBtn);
      expect(handleIndexChange).toHaveBeenCalledWith(2);

      const prevBtn = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevBtn);
      expect(handleIndexChange).toHaveBeenCalledWith(0);
    });
  });
});
