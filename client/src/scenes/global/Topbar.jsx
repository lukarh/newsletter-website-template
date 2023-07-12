import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'

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

  const gotoLoginPage = async () => {
    window.location.href = '/login'
    return
  }

  const gotoSubscriptionPage = async () => {
    window.location.href = '/choose-subscription'
    return
  }

  const isActiveAccountLink = () => {
    return location.pathname.includes('/account')
  }

  useEffect(() => {
    const handleResize = () => {
      // check the screen width and update the state accordingly
      if (window.innerWidth <= 768) {
        setShowTopRightItems(false);
      } else {
        setShowTopRightItems(true);
      }
    };

    // add event listener for window resize
    window.addEventListener('resize', handleResize);
    handleResize();

    // clean up the event listener on component unmount
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
          <h2 style={{ marginLeft: "10px", marginRight: "10px", color: "white" }}>{"Insert Name"}</h2>
          <NavLink to='/home' >
            Home
          </NavLink>
          <NavLink to='/shop' >
            Shop
          </NavLink>
          <NavLink to='/checkout'>
            Checkout
          </NavLink>
        </NavMenu>
          {
            ((!userAuth.isLoggedIn) && (showTopRightItems))
            ? <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button label='Login' severity="danger" style={{ marginLeft: "10px", marginRight: "10px" }}
                onClick={gotoLoginPage} />
              </div>
            : <></>
          }
          {
            ((userAuth.isLoggedIn) && (showTopRightItems))
            ? <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button label='Subscribe' severity="danger" style={{ marginLeft: "10px", marginRight: "10px" }}
                  onClick={gotoSubscriptionPage}
                  />
                </div>
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