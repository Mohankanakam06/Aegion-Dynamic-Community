import { describe, it, expect } from 'vitest';
import { events, getEventById } from './events';
import { testimonials } from './testimonials';

describe('Data Layer', () => {
  it('should export valid events list with required fields', () => {
    expect(events.length).toBeGreaterThan(0);
    const event = events[0];
    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('title');
    expect(event).toHaveProperty('category');
    expect(event).toHaveProperty('date');
    expect(event).toHaveProperty('description');
    expect(event).toHaveProperty('images');
    expect(Array.isArray(event.images)).toBe(true);
  });

  it('should find an event by id correctly', () => {
    const buildHours = getEventById('build-hours');
    expect(buildHours).toBeDefined();
    expect(buildHours?.title).toContain('Build Hours');
  });

  it('should export valid testimonials', () => {
    expect(testimonials.length).toBeGreaterThan(0);
    const item = testimonials[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('quote');
    expect(item).toHaveProperty('author');
    expect(item).toHaveProperty('role');
  });
});
