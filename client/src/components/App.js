import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import ProfilePage from './users/ProfilePage';
import swal from 'sweetalert2';
import { withSwalInstance } from 'sweetalert2-react';
import * as errorActions from '../actions/error.actions';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const SweetAlert = withSwalInstance(swal);

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main role="main">
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/users/:username" component={ProfilePage} />

                        <Footer />
                    </main>
                    <SweetAlert
                        show={this.props.errors.error ? true : false}
                        title="Error"
                        type="error"
                        text={this.props.errors.error}
                        confirmButtonColor="#ec6c62"
                        onConfirm={this.props.removeError}
                    />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        errors: state.errors
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        removeError: () => dispatch(errorActions.removeError())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

