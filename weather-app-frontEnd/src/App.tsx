import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './Pages/Layout/layout';
import Weather from './Pages/Weather/Weather';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <header className="App-header" data-testid="app-element">
          <Layout>
            <Weather />
          </Layout>

        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
