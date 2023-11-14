import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import Weather from './Weather';


jest.mock('./fetchWeather', () => ({
    fetchWeather: async (location: any) => {
        if (location === 'validLocation') {
            return {
                description: 'sunny'
            };
        } else if (location === 'errorLocation') {
            return {
                error: true
            };
        } else {
            return 'Unknown error';
        }
    },
    getStatusError: (status: string) => {
        if (status === '404') {
            return 'Not Found';
        } else {
            return 'Unknown Error';
        }
    }
}));

describe('Weather', () => {
    it('renders the Weather component with no weather data or error initially', () => {
        render(<QueryClientProvider client={new QueryClient()}>
            <Weather />
        </QueryClientProvider>);

        expect(screen.queryByTestId('weather-grid')).not.toBeInTheDocument();
        expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
    });

    it('renders with autocomplete component', async () => {
        render(<QueryClientProvider client={new QueryClient()}>
            <Weather />
        </QueryClientProvider>);

        const locationAutocomplete = screen.getByLabelText('Search Locations')
        expect(locationAutocomplete).toBeInTheDocument();
    });

    it('renders without weather data', async () => {
        render(<QueryClientProvider client={new QueryClient()}>
            <Weather />
        </QueryClientProvider>);

        const dataElement = screen.queryByTestId('weather-data');
        expect(dataElement).toBeNull();

    });
    it('should fetch weather data correctly when location is selected', async () => {
        // Mock the updateLoader function and the fetchWeather function
        const updateLoader = jest.fn();
        const fetchWeather = jest.fn().mockResolvedValue({
            description: 'Sunny',
        });

        // Render the component or set up any necessary dependencies
        render(<QueryClientProvider client={new QueryClient()}>
            <Weather />
        </QueryClientProvider>);
        // Select a location using the LocationsAutocomplete component
        const locationInput = screen.getByRole('combobox');
        // fireEvent.click(screen.getByRole('combobox'));

        userEvent.type(locationInput, 'New York');
        userEvent.click(screen.getByText('New York'));

        // Assert that the loading state is updated correctly
        expect(updateLoader).toHaveBeenCalledWith(true);
        expect(updateLoader).toHaveBeenCalledWith(false);

        // Assert that the fetchWeather function is called with the correct location
        expect(fetchWeather).toHaveBeenCalledWith('New York');

        // Assert that the weather data and error message are displayed correctly
        expect(screen.getByTestId('weather-data')).toBeInTheDocument();
        expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

});
