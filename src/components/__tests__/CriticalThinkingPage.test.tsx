import { render, screen, waitFor } from '@testing-library/react';
import CriticalThinkingPage from '../CriticalThinkingPage';

// Mock supabase client
jest.mock('../../utils/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn(() => Promise.reject({
        error: {
          code: 'PGRST100',
          message: '"failed to parse order (RANDOM().asc)" (line 1, column 7)',
        },
        data: null,
      })),
    })),
  },
}));

describe('CriticalThinkingPage', () => {
  it('shows error if supabase order by RANDOM() fails', async () => {
    render(<CriticalThinkingPage />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load question/i)).toBeInTheDocument();
    });
  });
});
