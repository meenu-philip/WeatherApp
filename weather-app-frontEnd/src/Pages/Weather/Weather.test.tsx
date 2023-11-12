import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Weather from './Weather';


describe('Weather Page', () => {
    test('location search text field is present', () => {
        render(<Weather />);
        const locationElement = screen.getByTestId('location-search');
        expect(locationElement).toBeInTheDocument();
    });

    test('weather grid is not present on load', () => {
        render(<Weather />);
        expect(screen.queryByTestId("weather-grid")).not.toBeInTheDocument();
    });

    test('weather grid is present on search', async () => {
        render(<Weather />)
        const searchElement = screen.getByRole('button');
        expect(searchElement).toBeInTheDocument();
        const textElement = screen.getByRole('textbox');
        fireEvent.change(textElement, { target: { value: 'Good Day' } })
        fireEvent.click(searchElement);
        await waitFor(() => {
            expect(screen.getByTestId('weather-grid')).toBeInTheDocument();
        });
    });

})

