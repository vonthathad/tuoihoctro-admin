import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { _register } from '../../redux/modules/auth';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);

    this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
    this.getEmailValidationState = this.getEmailValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
    this.getConfirmPasswordValidationState = this.getConfirmPasswordValidationState.bind(this);

    this.handleRegisterClicked = this.handleRegisterClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.props);
    if (nextProps.user.length > 0 && nextProps.user !== this.props.user) {
      alert(nextProps.user);
      browserHistory.push('/login');
      // localStorage.setItem('token', nextProps.user.token);
    } else if (nextProps.error && nextProps.error !== this.props.error) {
      alert(nextProps.error.error);
    }
  }
  getUsernameValidationState() {
    const length = this.state.user.username.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  getEmailValidationState() {
    const length = this.state.user.email.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  getPasswordValidationState() {
    const length = this.state.user.password.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  getConfirmPasswordValidationState() {
    const length = this.state.user.confirmPassword.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleRegisterClicked() {
    console.log(this.state.user);
    this.props.register(this.state.user);
  }
  handleUsernameChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        username: e.target.value,
      },
    });
  }
  handleEmailChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        email: e.target.value,
      },
    });
  }
  handlePasswordChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value,
      },
    });
  }
  handleConfirmPasswordChange(e) {
    this.setState({
      user: {
        ...this.state.user,
        confirmPassword: e.target.value,
      },
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <h1>Register</h1>
        <form>
          <FormGroup
            controlId="username"
            validationState={this.getUsernameValidationState()}
          >
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              value={user.username}
              placeholder="Enter username"
              onChange={this.handleUsernameChange}
            />
            <FormControl.Feedback />
            {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
          </FormGroup>
          <FormGroup
            controlId="email"
            validationState={this.getEmailValidationState()}
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={user.email}
              placeholder="Enter email"
              onChange={this.handleEmailChange}
            />
            <FormControl.Feedback />
            {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
          </FormGroup>

          <FormGroup
            controlId="password"
            validationState={this.getPasswordValidationState()}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={user.password}
              placeholder="Enter password"
              onChange={this.handlePasswordChange}
            />
            <FormControl.Feedback />
            {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
          </FormGroup>

          <FormGroup
            controlId="password"
            validationState={this.getConfirmPasswordValidationState()}
          >
            <ControlLabel>Confirm password</ControlLabel>
            <FormControl
              type="password"
              value={user.confirmPassword}
              placeholder="Confirm password"
              onChange={this.handleConfirmPasswordChange}
            />
            <FormControl.Feedback />
            {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.handleRegisterClicked}>Register</Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.string,
};
function mapDispatchToProps(dispatch) {
  return {
    register: (input) => dispatch(_register(input)),
  };
}
function mapStateToProps(store) {
  return {
    user: store.auth.user,
    error: store.auth.error,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
