import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand">BooksHub</Link>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li><Link to="/search" id="registerLink">Search</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/register" id="registerLink">Register</Link></li>
                        <li><Link to="/login" id="loginLink">Log in</Link></li>
                    </ul>
                </div>
            </div>
        </div>
  );
};

export default Header;