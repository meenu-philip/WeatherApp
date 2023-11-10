import { render, screen } from '@testing-library/react';
import WeatherGrid from './weatherGrid';

const mockData = {
    weather_data: {
        main: 'Clouds',
        description: 'overcast clouds',
    },
    details: {
        temp: 279,
        feels_like: 277.45,
        temp_min: 277.2,
        temp_max: 280.44,
        pressure: 1001,
        humidity: 91
    },
    name: 'London'
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

