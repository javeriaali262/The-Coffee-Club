import { useState } from 'react';
import Home from './components/Home.jsx';
import AllForms from './components/AllForms.jsx';

function App() {
  const [page, setPage] = useState('home');

  if (page === 'forms') {
    return <AllForms onBack={() => setPage('home')} />;
  }

  return (
    <Home
      onLoginClick={() => setPage('forms')}
      onFormsClick={() => setPage('forms')}
    />
  );
}

export default App;