import { useState } from 'react';
import Home from './pages/Home.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  // Ye state hi decide karti hai abhi kaunsa "page" dikhana hai.
  // URL kabhi nahi badalta — hamesha wahi ek URL rahega.
  const [view, setView] = useState('home'); // 'home' | 'adminLogin' | 'adminDashboard'

  if (view === 'adminLogin') {
    return (
      <AdminLogin
        onLoginSuccess={() => setView('adminDashboard')}
        onBackToHome={() => setView('home')}
      />
    );
  }

  if (view === 'adminDashboard') {
    return (
      <AdminDashboard
        onLogout={() => setView('adminLogin')}
      />
    );
  }

  // Default: Home page
  return <Home onLoginClick={() => setView('adminLogin')} />;
}

export default App;