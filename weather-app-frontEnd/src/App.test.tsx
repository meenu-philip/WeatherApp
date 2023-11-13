import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

// Test case for rendering the App component
test('renders App component', () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  );

  expect(screen.getByTestId('app-element')).toBeInTheDocument();
});

