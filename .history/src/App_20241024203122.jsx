import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registerform from './basicform.jsx';
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Loginform from './loginform.jsx';
import Userdetails from './Userdetails.jsx';
import Dashboard from './Dashboard.jsx'; 


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <h1>Form</h1>
       
        <Routes>
          <Route path="/register" element={<Registerform />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Loginform />} />
          <Route path="/userdetails" element={<Userdetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
