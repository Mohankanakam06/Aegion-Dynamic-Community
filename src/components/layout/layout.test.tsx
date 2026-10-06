import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

describe('Layout Components', () => {
  describe('Header Component', () => {
    it('renders logo and navigation links', () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      expect(screen.getByAltText(/Aegion/i)).toBeDefined();
      expect(screen.getByText('Home')).toBeDefined();
      expect(screen.getByText('About')).toBeDefined();
      expect(screen.getByText('Gatherings')).toBeDefined();
      expect(screen.getByText('Stories')).toBeDefined();
      expect(screen.getByText('Connect')).toBeDefined();
    });

    it('toggles mobile menu when menu button is clicked', () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const menuBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(menuBtn);
      expect(screen.getByRole('dialog')).toBeDefined();
    });
  });

  describe('Footer Component', () => {
    it('renders brand identity and copyright', () => {
      render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
      expect(screen.getByText(/Aegion Dynamic Community/i)).toBeDefined();
      expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`, 'i'))).toBeDefined();
    });
  });
});
