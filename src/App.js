import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css';
import EditCourse from './components/Admin/EditCourse';
import Course from './components/Courses/course';
import Admincourse from './components/Admin/Admincourse';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Addcourse from './components/Admin/Addcourse';
import Login from './components/Login/Login';



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
            <Route path='/admincourses' element={<Admincourse/>}/>
            <Route path='/editcourse/:id' element={<EditCourse />}></Route>
            <Route path='/addcourse' element={<Addcourse/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;