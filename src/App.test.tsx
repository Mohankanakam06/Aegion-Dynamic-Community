import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Application Route Integration', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders Home page by default with Aegion branding and hero', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: /Connect/i })).toBeDefined();
    expect(screen.getAllByText(/Open ecosystem for curious minds/i).length).toBeGreaterThan(0);
  });

  it('renders About page on /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Why Aegion Exists/i })).toBeDefined();
  });

  it('renders Events page on /events route', () => {
    render(
      <MemoryRouter initialEntries={['/events']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Gatherings & Sprints/i })).toBeDefined();
  });

  it('renders Stories page on /stories route', () => {
    render(
      <MemoryRouter initialEntries={['/stories']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Voices of the Movement/i })).toBeDefined();
  });

  it('renders Contact page on /contact route', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Get in Touch/i })).toBeDefined();
  });
});
