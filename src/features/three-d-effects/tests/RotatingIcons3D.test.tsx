import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RotatingIcons3D } from '../RotatingIcons3D';

// Mock Canvas since it requires WebGL context in tests
vi.mock('@react-three/fiber', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@react-three/fiber')>();
  return {
    ...actual,
    Canvas: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-canvas">{children}</div>
    ),
    useFrame: vi.fn(),
    extend: vi.fn(),
  };
});

vi.mock('@react-three/drei', () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-text">{children}</div>
  ),
  OrbitControls: () => <div data-testid="mock-orbit-controls" />,
}));

describe('RotatingIcons3D', () => {
  it('should render the 3D canvas container', () => {
    render(<RotatingIcons3D />);
    
    expect(screen.getByTestId('rotating-icons-3d')).toBeInTheDocument();
    expect(screen.getByTestId('mock-canvas')).toBeInTheDocument();
  });

  it('should render with custom className and fixed dimensions', () => {
    render(
      <RotatingIcons3D 
        className="custom-class" 
      />
    );
    
    const container = screen.getByTestId('rotating-icons-3d');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveStyle({
      width: '352px',
      height: '352px'
    });
  });

  it('should render interaction instructions', () => {
    render(<RotatingIcons3D />);
    
    expect(screen.getByText('Tech Stack Sphere')).toBeInTheDocument();
    expect(screen.getByText('Mouse: influence rotation')).toBeInTheDocument();
    expect(screen.getByText('Scroll: zoom in/out')).toBeInTheDocument();
  });
});