import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TransactionPage from './components/TransactionPage';
import BankerAccount from './components/BankerAccount';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/transaction" element={<TransactionPage/>} />
          <Route path="/bankeraccount" element={<BankerAccount/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;




