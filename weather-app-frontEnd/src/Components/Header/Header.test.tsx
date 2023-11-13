import { render, screen } from '@testing-library/react';
import Header from './Header';

// Test case for rendering the header
test('renders header componenent', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Weather/i);
    expect(titleElement).toBeInTheDocument();
});
