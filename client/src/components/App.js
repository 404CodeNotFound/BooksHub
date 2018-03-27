import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import '../styles/bootstrap.css';
import '../styles/main.css';
import '../styles/font-awesome.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div className="container body-content">
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
