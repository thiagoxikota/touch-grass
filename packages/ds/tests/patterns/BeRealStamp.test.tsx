import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BeRealStamp } from '../../src/patterns/BeRealStamp';

describe('BeRealStamp', () => {
  it('renders verify badge, timestamp, and hours block', () => {
    render(<BeRealStamp timestamp="2026-04-13 19:42" hours="04:32:18" />);
    expect(screen.getByText('// VERIFIED OFFLINE')).toBeInTheDocument();
    expect(screen.getByText('2026-04-13 19:42')).toBeInTheDocument();
    expect(screen.getByText('04:32:18')).toBeInTheDocument();
    expect(screen.getByText('UNTETHERED')).toBeInTheDocument();
  });

  it('renders an img when src is provided', () => {
    render(<BeRealStamp src="/photo.jpg" alt="grass" timestamp="x" hours="00:00" />);
    const img = screen.getByAltText('grass') as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
    expect(img.src).toContain('/photo.jpg');
  });

  it('renders custom content when no src is provided', () => {
    render(
      <BeRealStamp timestamp="x" hours="00:00">
        <div data-testid="placeholder">PHOTO</div>
      </BeRealStamp>
    );
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });
});
