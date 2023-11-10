import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('renders loader element', () => {
    render(<Loader />);
    const loaderElement = screen.getByLabelText('loader');
    expect(loaderElement).toBeInTheDocument();
});