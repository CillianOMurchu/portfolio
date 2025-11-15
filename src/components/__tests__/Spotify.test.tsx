import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SpotifyLoginButton } from '../Spotify';

describe('Spotify Login', () => {
  it('renders the Spotify login button', () => {
    render(<SpotifyLoginButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});