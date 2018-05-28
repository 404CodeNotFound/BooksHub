import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import ProfilePage from './users/ProfilePage';
import BooksListPage from './books/BooksListPage';
import BookDetailsPage from './books/BookDetailsPage';
import AdminPanelPage from './administration/AdminPanelPage';
import NotFoundPage from './shared/not-found/NotFoundPage';
import swal from 'sweetalert2';
import { withSwalInstance } from 'sweetalert2-react';
import { toastr } from 'react-redux-toastr';
import * as errorActions from '../actions/error.actions';
import * as successActions from '../actions/success.actions';
import AuthorBiographyPage from './authors/AuthorBiographyPage';
import EventsListPage from './events/EventsListPage';
import EventDetailsPage from './events/EventDetailsPage';
import ReduxToastr from 'react-redux-toastr';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const SweetAlert = withSwalInstance(swal);

class App extends Component {
    state = {};
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main role="main">
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/users/:username" component={ProfilePage} />
                            <Route exact path="/books" component={BooksListPage} />
                            <Route path="/books/:id" component={BookDetailsPage} />
                            <Route path="/authors/:id" component={AuthorBiographyPage} />
                            <Route exact path="/events" component={EventsListPage} />
                            <Route path="/events/:id" component={EventDetailsPage} />
                            <Route path="/administration" component={AdminPanelPage} />
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                        <Footer />
                    </main>
                    <ReduxToastr
                        timeOut={4000}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        className="toasts" />
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

    componentWillUpdate(nextProps) {
        if (nextProps.isSuccessful) {
            toastr.success('Success', nextProps.successMessage);
            this.props.removeSuccessMessage();
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        errors: state.errors,
        isSuccessful: state.success.isSuccessful,
        successMessage: state.success.message
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        removeError: () => dispatch(errorActions.removeError()),
        removeSuccessMessage: () => dispatch(successActions.removeMessage())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

