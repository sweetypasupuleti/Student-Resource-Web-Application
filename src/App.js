import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css'
import Course from './components/Courses/course';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <Router>
      <div className='app-main'>
        <div className='app-nav'>
          <Navbar/>
        </div>
        <div className='app-content'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/courses' element={<Course/>}/>
          </Routes>
        </div>

      </div>
    </Router>
    
  );
}

export default App;
