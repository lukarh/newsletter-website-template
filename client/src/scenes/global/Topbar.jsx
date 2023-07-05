import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'

import axios from 'axios';

import { Button } from 'primereact/button'
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements'

import { AuthContext } from '../../contexts/AuthContext'

const Topbar = () => {
  const location = useLocation()
  const userAuth = useContext(AuthContext)
  const [showTopRightItems, setShowTopRightItems] = useState(true);

  const handleLogout = async () => {
    await userAuth.handleLogout()
  }

  const showSession = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token');

    const response = await axios.put(`http://localhost:4000/api/verify/account`, { verifyToken: token }, { withCredentials: true })
    if (response.status === 400) {
        return
    }
    return
  }

  const gotoLoginPage = async () => {
    window.location.href = '/login'
    return
  }

  const isActiveAccountLink = () => {
    return location.pathname.includes('/account')
  }

  useEffect(() => {
    const handleResize = () => {
      // Check the screen width and update the state accordingly
      if (window.innerWidth <= 768) {
        setShowTopRightItems(false);
      } else {
        setShowTopRightItems(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <>
      <Nav>
          {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}
        <Bars />
        <NavMenu >
          <h2 style={{ marginLeft: "10px", marginRight: "10px", color: "white" }}>{"<Insert Name>"}</h2>
          <NavLink to='/home' >
            Home
          </NavLink>
          {/* <NavLink to='/visuals' >
            Visuals
          </NavLink> */}
          <NavLink to='/shop' >
            Shop
          </NavLink>
          {/* <NavLink to='/about' >
            About Us
          </NavLink> */}
          <NavLink to='/checkout'>
            Checkout
          </NavLink>
          <NavLink to='/choose-subscription'>
            Subscribe
          </NavLink>
        </NavMenu>
          {/* <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Button label='Show Session' severity="danger" style={{ marginRight: "15px" }} onClick={showSession} />
          </div> */}
          {
            ((!userAuth.isLoggedIn) && (showTopRightItems))
            // ? <NavLink to='/login' >
            //   Login
            //   </NavLink>
            ? <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button label='Login' severity="danger" style={{ marginLeft: "10px", marginRight: "10px" }}
                onClick={gotoLoginPage} />
              </div>
            : <></>
          }
          {
            ((userAuth.isLoggedIn) && (showTopRightItems))
            ? <>
                <NavLink to='/account' className={isActiveAccountLink() ? 'active' : ''}>
                  Account<i className="pi pi-user" style={{ fontSize: '1rem', marginLeft: "10px" }}></i>
                </NavLink>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button label='Logout' severity="danger" style={{ marginLeft: "10px", marginRight: "10px" }}
                  onClick={handleLogout}
                  />
                </div>
              </>
            : <></>
          }
      </Nav>
    </>
  );
};

export default Topbar;