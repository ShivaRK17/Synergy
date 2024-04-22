import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
  const { isuserlogin, setIsuserlogin,setUserdetails,setForecastData } = useContext(AppContext);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const logoutAccount = (e) => {
    if (isuserlogin) {
      e.preventDefault();
      // localStorage.removeItem('authToken')
      localStorage.clear()
      setIsuserlogin(false)
      setUserdetails({
        name: '',
        phoneNumber: '',
        age: '',
        landSize: '',
        location: '',
        gender: '',
        cropsCultivated:
          []
      });
      setForecastData({
        "city": "",
        "country": "",
        "coordinates": {},
        "daily": [
            {
                "condition": {
                    "description": "",
                    "icon_url": "",
                    "icon": ""
                },
                "temperature": {
                    "day": "",
                    "minimum": "",
                    "maximum": "",
                    "humidity": ""
                },
                "wind": {
                    "speed": ""
                },
                "time": ""
            }
        ]
    })
      navigate('/')
    }
  }
  useEffect(() => {
    setIsuserlogin(localStorage.getItem('authToken'))
    const handleScroll = () => {
      if (window.scroll > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <header className={isSticky ? 'sticky' : ''}>
        <h1 className='navbar-logo'>SYNERGY</h1>
        <nav>
          {/* // :<></>} */}
          <ul className={`navbar-links`}>
            <li><NavLink to='/'>Home</NavLink></li>
            {isuserlogin ? <>
              <li><NavLink to='/predict'>Prediction</NavLink></li>
              <li><NavLink to='/dashboard'>My Profile</NavLink></li>
              <li><NavLink style={{ color: 'red' }} onClick={logoutAccount}>Logout</NavLink></li>
            </> : <>
              <li><NavLink to='/signup'>Signup</NavLink></li>
              {/* <li><NavLink to='/contact'>Contact</NavLink></li> */}
              <li><NavLink to='/login'>Login</NavLink></li>
            </>}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar