import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
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
            lastname: ''
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
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="password">Password</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="password" name="password" type="password" onChange={this.handlePasswordChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="email">Email</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="email" name="email" type="text" onChange={this.handleEmailChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="firstname">First Name</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="firstname" name="firstname" type="text" onChange={this.handleFirstnameChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-2 control-label"htmlFor="lastname">Last Name</label>
                                <div className="col-md-8">
                                    <input className="form-control" id="lastname" name="lastname" type="text" onChange={this.handleLastnameChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-offset-2 col-md-10">
                                    <input type="submit" value="Register" className="btn-register" id="register-submit"/>
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
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handleFirstnameChange = (event) => {
        this.setState({ firstname: event.target.value });
    };

    handleLastnameChange = (event) => {
        this.setState({ lastname: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;

        this.props.register(username, password, email, firstname, lastname);
        this.setState({
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: ''
        });

        this.props.history.push("/login");
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        register: (username, password, email, firstname, lastname) =>
            dispatch(usersActions.register(username, password, email, firstname, lastname))
    };
}

export default connect(null, mapDispatchToProps)(RegisterPage);