import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-dark-amber/theme.css";
import Login from './Login';
import Home from './Home';
import { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    setToken(localStorage.getItem('ACCESS_TOKEN'))
  }, [])
 
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
            <Route path="/" element={!!token ? <Home /> : <Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
