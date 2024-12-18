import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
};

export default App;
