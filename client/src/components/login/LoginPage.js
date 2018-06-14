import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
import '../../style/login.css';
import background from '../../style/banner-blurred.jpg';

const style = {
    backgroundImage: `url(${background})`
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: ''};
    }

    render() {
        return (
            <header className="section-top-padding text-center" style={style}>
                <div className="container col-md-6 col-md-offset-2">
                    <div id="login">
                        <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 ">
                            Log in.
                            </h1>
                        <h4 className="title">Use a local account to log in.</h4>

                        <form className="form-horizontal" id="login-form" onSubmit={this.submit} >
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="username">Username</label>
                                <div className="col-md-8">
                                    <input className="form-control" name="UserName" type="text" id="username" onChange={this.handleUsernameChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-2 control-label" htmlFor="password">Password</label>
                                <div className="col-md-8">
                                    <input className="form-control" name="Password" type="password" onChange={this.handlePasswordChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <input type="submit" value="Log in" className="btn-login" id="login-submit" />
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

    submit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.props.login(username, password)
            .then(() => {
                this.setState({ username: '', password: '' });
                this.props.history.push("/");
            });        
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        login: (username, password) => dispatch(usersActions.login(username, password))
    };
}

export default connect(null, mapDispatchToProps)(LoginPage);