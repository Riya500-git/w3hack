import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginPage from './login';
import UserPage from './UserPage';
import Mint from './Mint';
import Last from './Last';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/last" element={<Last />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
