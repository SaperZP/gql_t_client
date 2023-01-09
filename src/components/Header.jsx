import React from 'react';
import logo from '../assets/logo.png'

function Header(props) {
  return (
      <nav className="navbar bg-light mb-4 p-0">
        <div className="container">
          <a className="navbar-brand" href="/">
            <div className="d-flex">
              <img src={logo} alt="logo" className="mr-2"/>
              <div>GraphQl training</div>
            </div>
          </a>
        </div>
      </nav>
  );
}

export default Header;
