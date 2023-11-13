import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './Pages/Layout/Layout';
import Weather from './Pages/Weather/Weather';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <header className="App-header" data-testid="app-element">
          <Layout data-testid="app-element-layout">
            <Weather data-testid="app-element-weather" />
          </Layout>

        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
