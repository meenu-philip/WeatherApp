import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocationsAutocomplete, fetchLocations } from './LocationsAutoComplete';


const mockResponse = [
    { name: 'New York', state: 'State1', country: 'Country1' },
    { name: 'New York', state: 'State2', country: 'Country2' }
];


describe('Locations Auto Complete', () => {

    // Test case for rendering the LocationAutocomplete component
    test('renders LocationAutocomplete component', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <LocationsAutocomplete
                    onLocationSelect={jest.fn()}
                    onLocationClear={jest.fn()}
                    value={{
                        name: 'New York',
                        state: 'NY',
                        country: 'USA'
                    }}
                />
            </QueryClientProvider>
        );

        // Check that the LocationAutocomplete component is rendered
        expect(screen.getByLabelText('Search Locations')).toBeInTheDocument();
    });
    test('should fetch locations based on the query string', async () => {
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            });
        });
        const query = 'New York';
        const result = await fetchLocations(query);

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(query));

        expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResponse));
    });

    test('should throw an error for unsuccessful network response', async () => {
        // Mocking the fetch function to return an error response
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: false,
                statusText: 'Network Error'
            });
        });

        const query = 'Invalid Query';
        await expect(fetchLocations(query)).rejects.toThrow('Network response was not ok');
    });

    // Test case for selecting a location
    test('selects a location', async () => {
        const onLocationSelect = jest.fn();
        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            });
        });

        render(
            <QueryClientProvider client={new QueryClient()}>
                <LocationsAutocomplete
                    onLocationSelect={onLocationSelect}
                    onLocationClear={jest.fn()}
                />
            </QueryClientProvider>
        );


        const query = 'New York';
        const result = await fetchLocations(query);

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(query));
        // Wait for the autocomplete options to load
        const option = screen.getByText(/New York, State1, Country1/);
        expect(option).toBeInTheDocument();

        // Select the first option
        fireEvent.click(screen.getByText(/New York, State1, Country1/));

        // Check that the location is selected and the onLocationSelect callback is called
        expect(onLocationSelect).toHaveBeenCalledWith({
            city: 'New York',
            country: 'USA',
        });
    });

    // Test case for clearing the selection
    test('clears the selection', async () => {
        const onLocationClear = jest.fn();

        render(
            <QueryClientProvider client={new QueryClient()}>

                <LocationsAutocomplete
                    onLocationSelect={jest.fn()}
                    onLocationClear={onLocationClear}
                />
            </QueryClientProvider>
        );

        fireEvent.click(screen.getByLabelText('Search Locations'));

        // Clear the input field value
        const location = screen.getByRole('combobox')
        fireEvent.click(location);
        userEvent.type(location, 'N');
        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: '' },
        });
        // Check that the onLocationClear callback is called
        expect(onLocationClear).toHaveBeenCalled();
    });

})
