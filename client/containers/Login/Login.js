import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { _login } from '../../redux/modules/auth';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
      },
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
    this.handleLoginClicked = this.handleLoginClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.username && nextProps.user !== this.props.user) {
      alert(`${nextProps.user.username} login sucessfully`);
      // set dữ liệu vào localstorage
      localStorage.setItem('token', nextProps.user.token);
      localStorage.setItem('username', nextProps.user.username);
      localStorage.setItem('role', nextProps.user.role);
      // qua
      browserHistory.push('/');
    } else if (nextProps.error && nextProps.error !== this.props.error) {
      alert(nextProps.error);
    }
  }

  getUsernameValidationState() {
    // kiểm tra tên
    const length = this.state.user.username.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  getPasswordValidationState() {
    // kiểm tra password
    const length = this.state.user.password.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  handleLoginClicked() {
    // gọi api login user
    this.props.login(this.state.user);
  }
  handleUsernameChange(e) {
    // update username
    this.setState({
      user: {
        ...this.state.user,
        username: e.target.value,
      },
    });
  }
  handlePasswordChange(e) {
    // update password
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value,
      },
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="container">
        <h1>Login</h1>
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
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.handleLoginClicked}>Login</Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.string,
};
function mapDispatchToProps(dispatch) {
  return {
    login: (input) => dispatch(_login(input)),
  };
}
function mapStateToProps(store) {
  return {
    user: store.auth.user,
    error: store.auth.error,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
