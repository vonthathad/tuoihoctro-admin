import React, { Component, PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router';
// import NavDropdown from 'react-bootstrap/lib/NavDropdown';
// import MenuItem from 'react-bootstrap/lib/MenuItem';
class Header extends Component {
  render() {
    return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link to="/">Dashboard</Link>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} >
                            <Link to="/login">Login</Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                            <Link to="/register">Register</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
  }
}

Header.propTypes = {

};

export default Header;
