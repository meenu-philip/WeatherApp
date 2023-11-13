import { render, screen } from '@testing-library/react';
import ErrorGrid from './ErrorGrid';


// Test case for rendering the error message
test('renders error message', () => {
    const errorMessage = 'Something went wrong!';
    render(<ErrorGrid message={errorMessage} />);
    expect(screen.getByText(/Error: Something went wrong!/)).toBeInTheDocument();
});

