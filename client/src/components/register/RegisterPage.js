import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
import * as errorsActions from '../../actions/error.actions';
import '../../style/register.css';
import background from '../../style/banner-blurred.jpg';

const style = {
    backgroundImage: `url(${background})`
};

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: '',
        };
    }
    render() {
        return (
            <header className="section-top-padding background-image-main text-center" style={style}>
                <div className="container col-md-6 col-md-offset-2">
                    <div id="register">
                        <h2 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-40 text-line-height-1 margin-bottom-30 ">
                            Register.
                        </h2>
                        <h4 className="title">Create a new account.</h4>
                        <form className="form-horizontal col" id="register-form" onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="username">Username</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="username" name="username" type="text" onChange={this.handleUsernameChange} />
                                    {this.props.usernameError &&
                                        <div className="error">{this.props.usernameError.msg}</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="password">Password</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="password" name="password" type="password" onChange={this.handlePasswordChange} />
                                    {this.props.passwordError &&
                                        <div className="error">{this.props.passwordError.msg}</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="email">Email</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="email" name="email" type="text" onChange={this.handleEmailChange} />
                                    {this.props.emailError &&
                                        <div className="error">{this.props.emailError.msg}</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="firstname">First Name</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="firstname" name="firstname" type="text" onChange={this.handleFirstnameChange} />
                                    {this.props.firstNameError &&
                                        <div className="error">{this.props.firstNameError.msg}</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="lastname">Last Name</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="lastname" name="lastname" type="text" onChange={this.handleLastnameChange} />
                                    {this.props.lastNameError &&
                                        <div className="error">{this.props.lastNameError.msg}</div>
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-offset-2 col-md-10">
                                    <input type="submit" value="Register" className="btn-register" id="register-submit" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <img className="arrow-object" src="img/arrow-object-dark.svg" alt="" />
            </header>
        );
    }

    handleUsernameChange = (event) => {
        if (this.props.usernameError) {
            this.props.removeValidationError('username');
        }
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event) => {
        if (this.props.passwordError) {
            this.props.removeValidationError('password');
        }
        this.setState({ password: event.target.value });
    };

    handleEmailChange = (event) => {
        if (this.props.emailError) {
            this.props.removeValidationError('email');
        }
        this.setState({ email: event.target.value });
    };

    handleFirstnameChange = (event) => {
        if (this.props.firstNameError) {
            this.props.removeValidationError('first_name');
        }
        this.setState({ firstname: event.target.value });
    };

    handleLastnameChange = (event) => {
        if (this.props.lastNameError) {
            this.props.removeValidationError('last_name');
        }
        this.setState({ lastname: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;

        this.props.register(username, password, email, firstname, lastname)
            .then(() => this.props.history.push('/login'));
    };
}

function mapStateToProps(state, ownProps) {
    const usernameError = state.errors.validationErrors.find(error => error.param === 'username');
    const firstNameError = state.errors.validationErrors.find(error => error.param === 'first_name');
    const lastNameError = state.errors.validationErrors.find(error => error.param === 'last_name');
    const passwordError = state.errors.validationErrors.find(error => error.param === 'password');
    const emailError = state.errors.validationErrors.find(error => error.param === 'email');

    return {
        usernameError: usernameError,
        passwordError: passwordError,
        emailError: emailError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        isSuccessful: state.users.isRegisterSuccessful
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        register: (username, password, email, firstname, lastname) =>
            dispatch(usersActions.register(username, password, email, firstname, lastname)),
        removeValidationError: (param) => dispatch(errorsActions.removeValidationError(param))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);