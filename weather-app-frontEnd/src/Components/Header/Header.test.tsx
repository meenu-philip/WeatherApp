import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header componenent', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Weather/i);
    expect(titleElement).toBeInTheDocument();
});
