import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Status } from '../Status';

describe('Spotify Login', () => {

describe('Status Component', () => {
  it('renders inactive status by default', () => {
    render(<Status />);

    expect(screen.getByText('Inactive')).toBeInTheDocument();
    const circle = document.querySelector('.rounded-full');
    expect(circle).toHaveClass('bg-gray-400');
  });

  it('renders active status when isActive is true', () => {
    render(<Status isActive={true} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
    const circle = document.querySelector('.rounded-full');
    expect(circle).toHaveClass('bg-green-200');
  });
});