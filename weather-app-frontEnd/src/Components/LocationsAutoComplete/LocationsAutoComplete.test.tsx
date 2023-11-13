
import { fireEvent, render, screen } from '@testing-library/react';
import LocationAutocomplete from './LocationsAutoComplete';

// Mock the API response for fetchLocations function
jest.mock('./fetchLocations', () => ({
    __esModule: true,
    default: jest.fn((query) => {
        return Promise.resolve([
            { name: 'London', state: 'England', country: 'UK' },
            { name: 'New York', state: 'New York', country: 'US' },
        ]);
    }),
}));

describe('LocationAutocomplete', () => {
    it('renders the autocomplete component', () => {
        render(
            <LocationAutocomplete onLocationSelect={jest.fn()} onLocationClear={jest.fn()} />
        );
        const inputElement = screen.getByLabelText('Search Locations');
        expect(inputElement).toBeInTheDocument();
    });

    it('fetches and populates dropdown based on input', async () => {
        render(
            <LocationAutocomplete onLocationSelect={jest.fn()} onLocationClear={jest.fn()} />
        );
        const inputElement = screen.getByLabelText('Search Locations');
        fireEvent.change(inputElement, { target: { value: 'London' } });
        await screen.findByText('London, England, UK');

        const optionElement1 = screen.getByText('London, England, UK');
        expect(optionElement1).toBeInTheDocument();
    });

    it('calls onLocationSelect when a value is selected', async () => {
        const onLocationSelect = jest.fn();
        render(
            <LocationAutocomplete onLocationSelect={onLocationSelect} onLocationClear={jest.fn()} />
        );

        const inputElement = screen.getByLabelText('Search Locations');
        fireEvent.change(inputElement, { target: { value: 'London' } });

        await screen.findByText('London, England, UK');

        const optionElement1 = screen.getByText('London, England, UK');
        fireEvent.click(optionElement1);

        expect(onLocationSelect).toHaveBeenCalledWith({
            city: 'London',
            country: 'UK',
        });
    });

    it('calls onLocationClear when the selection is cleared', async () => {
        const onLocationClear = jest.fn();

        render(
            <LocationAutocomplete
                onLocationSelect={jest.fn()}
                onLocationClear={onLocationClear}
                value={{ name: 'London', state: 'England', country: 'UK' }}
            />
        );

        const clearIcon = screen.getByTestId('clear-icon');
        fireEvent.click(clearIcon);

        expect(onLocationClear).toHaveBeenCalled();
    });
});
