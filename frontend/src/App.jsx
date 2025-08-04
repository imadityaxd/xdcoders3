import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Docs from './pages/Docs';
import Hackathon from './pages/Hackathon';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/docs' element={<Docs />} />
        <Route path='/hackathon' element={<Hackathon />} />
      </Routes>
    </Router>
  );
};

export default App;