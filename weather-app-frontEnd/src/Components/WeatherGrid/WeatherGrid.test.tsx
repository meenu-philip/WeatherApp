import { render, screen } from '@testing-library/react';
import WeatherGrid from './WeatherGrid';

const mockData = {
    description: 'overcast clouds',
    error: false
}

describe('Weather Grid', () => {

    test('weather grids are present', () => {
        render(<WeatherGrid data={mockData} />);
        const summaryElement = screen.getByText(/Forecasted/i);
        expect(summaryElement).toBeInTheDocument();
        const detailsElement = screen.getByText(/Overcast clouds/);
        expect(detailsElement).toBeInTheDocument();
    });
})

