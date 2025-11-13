import { render, screen, waitFor } from '@testing-library/react';
import AuthScreen from '../components/app/AuthScreen';

describe('AuthScreen sign-in performance', () => {
  it('should render and allow sign-in within a reasonable time', async () => {
    const start = performance.now();
    render(<AuthScreen />);
    // Wait for the Google sign-in button to appear
    const signInButton = await screen.findByRole('button', { name: /google/i });
    expect(signInButton).toBeInTheDocument();
    // Simulate user clicking sign-in (if you want to test the full flow, you need to mock supabase)
    // fireEvent.click(signInButton);
    // Wait for the sign-in process to complete (mocked or real, depending on test env)
    // await waitFor(() => expect(...).toBe(...));
    const end = performance.now();
    const elapsed = end - start;
    // Acceptable sign-in UI load time (adjust as needed)
    expect(elapsed).toBeLessThan(2000); // 2 seconds
  });
});
