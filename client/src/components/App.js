import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import ProfilePage from './users/ProfilePage';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main role="main">
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/users/:username" component={ProfilePage} />
                        <Footer />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
