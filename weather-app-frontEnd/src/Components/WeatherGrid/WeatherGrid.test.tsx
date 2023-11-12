import { render, screen } from '@testing-library/react';
import WeatherGrid from './WeatherGrid';

const mockData = {
    description: 'overcast clouds',
    error: false
}

describe('Weather Grid', () => {

    test('weather grids are present', () => {
        render(<WeatherGrid data={mockData} />);
        const summaryElement = screen.getByLabelText('weather-grid-summary');
        expect(summaryElement).toBeInTheDocument();
        const detailsElement = screen.getByLabelText('weather-grid-details');
        expect(detailsElement).toBeInTheDocument();
    });
})

