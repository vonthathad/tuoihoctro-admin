import React, { Component, PropTypes } from 'react';
import styles from './SideBarMenu.css';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      username: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props.user);
    // console.log(nextProps.user);
    if (nextProps.user && nextProps.user.displayName && nextProps.user !== this.props.user) {
      // alert(`${nextProps.user.displayName} login sucessfully`);
      this.setState({ username: nextProps.user.displayName });
    }
  }
  logout() {
    this.setState({ username: '' });
    alert('Đã đăng xuất!');
    localStorage.removeItem('token');
  }
  render() {
    const { username } = this.state;
    // console.log(1235);
    // console.log(username);
    return (
      <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
        <Navbar fluid className={styles.sidebar} inverse >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">{username !== '' ? username : 'Not login'}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Navbar.Text className={styles.userMenu}>
              <Link to="/"><Navbar.Link><Glyphicon glyph="home" /></Navbar.Link></Link>
              {username.length === 0 ?
                <Link to="/login"><Navbar.Link href="#"><Glyphicon glyph="log-in" /></Navbar.Link></Link>
               :
                <Navbar.Link onClick={this.logout}><Glyphicon glyph="log-out" /></Navbar.Link>
               }
              <Link to="/register"><Navbar.Link href="#"><Glyphicon glyph="registration-mark" /></Navbar.Link></Link>
            </Navbar.Text>
            <Nav>
              <NavItem eventKey={1}><Link to="/posts">Posts</Link></NavItem>
              {/* <NavDropdown eventKey={1} title="Categories">
                <MenuItem eventKey={1.1}> <Link to="/posts">Post Manager</Link></MenuItem>
                <MenuItem eventKey={1.2} href="#"><Link to="/myths">Myth Manager</Link></MenuItem>
              </NavDropdown>*/}
              <NavItem eventKey={2}><Link to="/admins">Admins</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
SideBarMenu.propsType = {
  user: PropTypes.string,
};
function mapStateToProps(store) {
  return {
    user: store.auth.user,
  };
}

export default connect(mapStateToProps)(SideBarMenu);
