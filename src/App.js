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
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Calender from './components/Calendar/Calendar';
import Problemform from './components/Communicationtools/Problemform';
import Araiseproblem from './components/Communicationtools/Araiseproblem';
import Raiseproblem from './components/Communicationtools/Raiseproblem';
import SolutionForm from './components/Communicationtools/Solutionform';
import Enrollform from './components/Enroll/enroll';
import QuizHome from './components/Quiz/Quiz';
import Quizjava from './components/Quiz/Quizjava';
import Quizpython from './components/Quiz/Quizpython';
import Quizjavascript from './components/Quiz/Quizjavascript';
import Quizc from './components/Quiz/Quizc';
import Progress from './components/Progresstracker/Progress';
import Report from './components/Report/Report';
import Academic from './components/Resources/Academic';
import Addresource from './components/Resources/Addresource';
function App() {
  
  return (
    <Router>
      <div className='app-main'>
        <div className='app-nav'>
          <Navbar/>
        </div>
        <div className='app-content'>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/courses' element={<Course/>}/>
            <Route path='/courses/:id' element={<Course/>}/>
            <Route path='/getcourse/:id' element={<Course/>}/>
            <Route path='/admincourses' element={<Admincourse/>}/>
            <Route path='/editcourse/:id' element={<EditCourse />}></Route>
            <Route path='/addcourse' element={<Addcourse/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/calendar' element={<Calender/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/queryform' element={<Problemform />}/>
            <Route path='/tools' element={<Raiseproblem />}/>
            <Route path='/admintools' element={<Araiseproblem />}/>
            <Route path='/solutionform/:id' element={<SolutionForm />}/>
            <Route path='/enrollcourse/:id' element={<Enrollform />}/>
            <Route path='/quizjavascript' element={<Quizjavascript />}/>
            <Route path="/quizjava" element={<Quizjava />} />
            <Route path="/quizpython" element={<Quizpython />} />
            <Route path="/quizc" element={<Quizc />} />
            <Route path='/quiz' element={<QuizHome/>}/>
            <Route path='/progress/:name' element={<Progress/>}/>
            <Route path='/report' element={<Report />}/> 
            <Route path='/resources' element={<Academic />}/>
            <Route path='/addresource' element={<Addresource />}/>                                              
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
