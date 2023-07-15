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
          <LoginPage />
          <NavBar />
          <UserPage />
          <Mint/>
          <Last/>

           <Routes>
            {/* <Route path="/" element={''} />
            <Route path="/Last" element={<Last />} />  */}
          {/* </Routes> */}
        {/* </div> */}
      {/* </Router> */}

      {/* <Router> */}
      <Route path="/Mint" component={Mint} />
      <Route path="/UserPage" component={UserPage} />
      <Route path="/Mint" component={Mint} />
      </Routes>
      </div>
    </Router>
    </ChakraProvider>
  );
}

export default App;
