import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
  }
  getInitialState() {
    return {
      username: '',
      password: '',
    };
  }
  getUsernameValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
  }
  getPasswordValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
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
                          value={this.state.username}
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
                          type="text"
                          value={this.state.password}
                          placeholder="Enter password"
                          onChange={this.handlePasswordChange}
                        />
                        <FormControl.Feedback />
                        {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
                    </FormGroup>
                    <ButtonToolbar>
                        <Button bsStyle="primary">Login</Button>
                    </ButtonToolbar>
                </form>
            </div>
        );
  }
}

Login.propTypes = {

};

export default Login;
