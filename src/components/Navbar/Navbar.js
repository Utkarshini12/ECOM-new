import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { signOut } from '../../api/auth';

import './Navbar.css';

const Navbar = () => {

  const [user, setUser] = useState('');

  useEffect(() => {

    const userName = localStorage.getItem('username');
    userName && setUser(userName);

  }, [user]);

  const logoutHandler = () => {

    signOut();
    setUser(null);
  }

  const renderComponent = () => {

    return (

      <div className='header fixed-top'>
        <div className='container'>
          <div className='row'>
            <div className='header-wrapper'>
              <div className="logo">
                <Link to='/' className='text-decoration-none'> ECommerce</Link>
              </div>
              <div className="user-actions">
                <Link to="/cart" >Cart</Link>
                <div className="user-intro">{user ? user : 'Guest'}</div>
                {user ? <div className="logout-btn" onClick={logoutHandler}>Logout</div> :
                  <div className="login-btn">

                    <Link to="/login">Login</Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>)

  }


  return (

    renderComponent()

  )


}

export default Navbar