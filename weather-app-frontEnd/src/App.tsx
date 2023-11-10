import React from 'react';
import Weather from './Pages/Weather/weather';
import Layout from './Pages/Layout/layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Weather/>
        </Layout>

      </header>
    </div>
  );
}

export default App;
