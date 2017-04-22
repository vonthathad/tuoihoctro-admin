import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
    this.getConfirmPasswordValidationState = this.getConfirmPasswordValidationState.bind(this);
  }
  getInitialState() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
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
  getConfirmPasswordValidationState() {
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
  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  render() {
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

                    <FormGroup
                      controlId="password"
                      validationState={this.getConfirmPasswordValidationState()}
                    >
                        <ControlLabel>Confirm password</ControlLabel>
                        <FormControl
                          type="text"
                          value={this.state.confirmPassword}
                          placeholder="Confirm password"
                          onChange={this.handleConfirmPasswordChange}
                        />
                        <FormControl.Feedback />
                        {/* <HelpBlock>Validation is based on string length.</HelpBlock>*/}
                    </FormGroup>
                     <ButtonToolbar>
                        <Button bsStyle="primary">Register</Button>
                    </ButtonToolbar>
                </form>
            </div>
        );
  }
}

Register.propTypes = {

};

export default Register;
