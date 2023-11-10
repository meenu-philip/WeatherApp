import Layout from './Pages/Layout/layout';
import Weather from './Pages/Weather/weather';

function App() {
  return (
    <div className="App">
      <header className="App-header" data-testid="app-element">
        <Layout>
          <Weather />
        </Layout>

      </header>
    </div>
  );
}

export default App;
