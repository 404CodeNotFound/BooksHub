import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as usersActions from '../../actions/users.actions';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <div id="login">
                <h2 className="title">Log in.</h2>
                <h5 className="title">Use a local account to log in.</h5>

                <div className="form-horizontal" id="login-form">
                    <div className="form-group">
                        <label className="col-md-2 control-label" htmlFor="UserName">Username</label>
                        <div className="col-md-10">
                            <input className="form-control" name="UserName" type="text" ref="username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label" htmlFor="Password">Password</label>
                        <div className="col-md-10">
                            <input className="form-control" name="Password" type="password" ref="password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <input type="submit" value="Log in" className="btn btn-default" onClick={this.submit} />
                        </div>
                    </div>
                </div>
                {this.props.token &&
                    <Redirect to="/" />
                }
                    <SweetAlert
                        show={this.props.error.message ? true : false}
                        title="Error"
                        type="error"
                        text={this.props.error.message}
                        confirmButtonColor="#ec6c62"
                        onConfirm={this.props.removeError}
                    />
            </div>
        );
    }

    submit() {
        const username = this.refs["username"].value;
        const password = this.refs["password"].value;

        this.props.login(username, password);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        error: state.users.error,
        token: state.users.token
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        login: (username, password) => dispatch(usersActions.login(username, password)),
        removeError: () => dispatch(usersActions.removeError())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);