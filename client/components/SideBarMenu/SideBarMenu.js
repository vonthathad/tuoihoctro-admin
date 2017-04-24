import React, { Component } from 'react';
import styles from './SideBarMenu.css';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
export default class SideBarMenu extends Component {
  render() {
    return (
      <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
        <Navbar fluid className={styles.sidebar} inverse >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">User Name</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Navbar.Text className={styles.userMenu}>
              <Link to="/"><Navbar.Link><Glyphicon glyph="home" /></Navbar.Link></Link>
              <Link to="/login"><Navbar.Link href="#"><Glyphicon glyph="log-in" /></Navbar.Link></Link>
              <Link to="/register"><Navbar.Link href="#"><Glyphicon glyph="registration-mark" /></Navbar.Link></Link>
            </Navbar.Text>
            <Nav>
              <NavDropdown eventKey={1} title="Categories">
                <MenuItem eventKey={1.1}> <Link to="/games">Game Manager</Link></MenuItem>
                <MenuItem eventKey={1.2} href="#"><Link to="/myths">Myth Manager</Link></MenuItem>
              </NavDropdown>
              <NavItem eventKey={3}>Authorization</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
