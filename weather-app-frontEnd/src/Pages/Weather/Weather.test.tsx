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

        // const locationInput = screen.getByPlaceholderText(/Enter location/i) as HTMLInputElement;
        // const searchButton = screen.getByRole('button', { name: /Search/i });

        // // Enter a valid location and click the search button
        // locationInput.value = 'validLocation';
        // searchButton.click();

        // // Wait for the loading state to be removed
        // await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

        // // Verify that the weather grid with the correct data is rendered
        // const weatherGrid = screen.getByTestId('weather-grid');
        // expect(weatherGrid).toBeInTheDocument();
        // expect(weatherGrid).toHaveTextContent(/Forecasted Weather : sunny/i);
        // expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
        const locationAutocomplete = screen.getByLabelText('Search Locations')
        expect(locationAutocomplete).toBeInTheDocument();
    });

    it('renders without weather data', async () => {
        render(<QueryClientProvider client={new QueryClient()}>
            <Weather />
        </QueryClientProvider>);

        // const locationInput = screen.getByPlaceholderText(/Enter location/i) as HTMLInputElement;
        // const searchButton = screen.getByRole('button', { name: /Search/i });

        // // Enter an invalid location and click the search button
        // locationInput.value = 'errorLocation';
        // searchButton.click();

        // // Wait for the loading state to be removed
        // await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

        // // Verify that the error message is displayed
        // expect(screen.queryByTestId('weather-grid')).not.toBeInTheDocument();
        // expect(screen.getByText(/Not Available/i)).toBeInTheDocument();
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
