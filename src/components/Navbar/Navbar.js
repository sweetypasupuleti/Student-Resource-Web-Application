import React from 'react'
import './Navbar.css'
import {  NavLink } from 'react-router-dom'

function Navbar() {

  const loginStatus = {
    isLogIn : false,
    type : 'User',
    name : 'Avani Puttaparthi',
    imgSrc : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'

  }

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
      navName:'Calendar',
      navRoute:'/calendar'
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
              {
                loginStatus.isLogIn ? <img className='image' src={loginStatus.imgSrc} alt="profilepic"/>
                :
                                // eslint-disable-next-line
                <img className='image' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
              }
              
            </div>
            {
              loginStatus.isLogIn ? 
              <div className='user-name'>{loginStatus.name} ({loginStatus.type})</div>
              :
<a href="/login" className='user-name-button'>Login</a>
            
            } 
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
      {
        loginStatus.isLogIn && <div className='nav-logout'> Logout </div>
      }
      
    </div>
  )
}

export default Navbar