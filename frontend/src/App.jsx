// Importing the core React library to use JSX and build components
import React from 'react';

// Importing routing components from react-router-dom
// - BrowserRouter: wraps the app to enable routing
// - Routes: container for Route components
// - Route: defines the mapping between a path and the component to render
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing the Navbar component which will be displayed on all pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importing page components
import Home from './pages/Home';           // Home page
import Blog from './pages/Blog';           // Blog page
import Docs from './pages/Docs';           // Docs/documentation page
import Hackathon from './pages/Hackathon'; // Hackathon events page

// Importing global styles from App.css
import './App.css';

// Creating the main App component using an arrow function
const App = () => {
  return (
    // Wrapping the app inside Router to enable route navigation
    <Router>

      {/* This Navbar will appear on every page */}
      <Navbar />
      
      {/* Define routing logic here */}
      <Routes>

        {/* Route for Home page ('/') that renders <Home /> */}
        <Route path='/' element={<Home />} />

        {/* Route for Blog page ('/blog') that renders <Blog /> */}
        <Route path='/blog' element={<Blog />} />

        {/* Route for Docs page ('/docs') that renders <Docs /> */}
        <Route path='/docs' element={<Docs />} />

        {/* Route for Hackathon page ('/hackathon') that renders <Hackathon /> */}
        <Route path='/hackathon' element={<Hackathon />} />
      </Routes>
      <Footer/>

    </Router>
  );
};

// Exporting the App component so it can be used in index.js to render the application
export default App;
