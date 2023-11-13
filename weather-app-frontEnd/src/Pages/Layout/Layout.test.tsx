import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
    test('renders header and children', () => {
        render(
            <Layout>
                <div data-testid="child-element">Child Element</div>
            </Layout>
        );

        const titleElement = screen.getByText(/Weather/i);
        expect(titleElement).toBeInTheDocument();

        expect(screen.getByTestId('child-element')).toBeInTheDocument();

        // Ensure that the loader is not rendered initially
        expect(screen.queryAllByLabelText('loader')).toBeNull();
    });
});
