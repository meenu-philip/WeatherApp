import { fireEvent, render, screen } from '@testing-library/react';
import LocationsAutoComplete from './LocationsAutoComplete';


describe('Locations Auto Complete Component', () => {
    const handleClick = jest.fn()

    test('text field is present', () => {
        render(<LocationsAutoComplete onSearchClick={handleClick()} />);
        const textElement = screen.getByRole('textbox');
        expect(textElement).toBeInTheDocument();
    });

    test('search icon is present and it invokes a function', () => {
        render(<LocationsAutoComplete onSearchClick={handleClick()} />);
        const searchElement = screen.getByRole('button');
        expect(searchElement).toBeInTheDocument();
        fireEvent.click(searchElement)
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
})

