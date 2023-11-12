import { render, screen } from '@testing-library/react';
import ErrorGrid from './ErrorGrid';

test('renders Error Component', () => {
    render(<ErrorGrid message='Test Error' />);
    const errorElement = screen.getByLabelText('weather-error-errorMessage');
    expect(errorElement).toBeInTheDocument();
});
