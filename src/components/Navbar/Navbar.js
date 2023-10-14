import React from 'react'
import './Navbar.css'
import {  NavLink } from 'react-router-dom'

function Navbar() {

  const navigationData =[
    {
      navName:'Home',
      navRoute:'/'
    },
    {
      navName:'Courses',
      navRoute:'/courses'
    },
    {
      navName:'Academic Resources',
      navRoute:'/resources'
    },
    {
      navName:'Communication Tools',
      navRoute:'/tools'
    },
    {
      navName:'Calender',
      navRoute:'/calender'
    },
    {
      navName:'Progress Tracker',
      navRoute:'/tracker'
    },
    {
      navName:'Report',
      navRoute:'/report'
    }
  ]

  
  return (
    <div className='nav-main'>
      <div className='nav-wrapper'>
        <div className='nav-profile'>
            <div className='profile-img'>
              <img className='image' src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="profilepic"/>
            </div> 
            <div className='user-name'>Student</div>
        </div>
        {
          navigationData.map((data,index) => (
            <NavLink className='nav-names' key={index} to={data.navRoute}>
                {
                  data.navName
                }
            </NavLink>
          ))
        }
      </div>
      <div className='nav-logout'>
        Login as Admin
      </div>
    </div>
  )
}

export default Navbar