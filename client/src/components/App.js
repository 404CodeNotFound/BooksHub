import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main role="main">
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Footer />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;