import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import "primereact/resources/themes/lara-dark-amber/theme.css";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
        

function Hello() {
  return (
    <Card style={{display: "flex"}} title="Login">
      <InputText type="text" className="p-inputtext-lg" placeholder="Email" />
      <InputText type="password" className="p-inputtext-lg" placeholder="password" />
      <Button label="Primary" rounded />
    </Card>
  );
}

export default function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
