import { render, screen } from '@testing-library/react';
import ErrorGrid from './ErrorGrid';

test('renders Error Component', () => {
    render(<ErrorGrid />);
    const errorElement = screen.getByLabelText('weather-error-errorMessage');
    expect(errorElement).toBeInTheDocument();
});
