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
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props.user);
    // console.log(nextProps.user);
    if (nextProps.user && nextProps.user.username && nextProps.user !== this.props.user) {
      // alert(`${nextProps.user.displayName} login sucessfully`);
      console.log(123);
      this.setState({ username: nextProps.user.username.toString(), role: nextProps.user.role.toString() });
    }
  }
  logout() {
    this.setState({ username: '', role: 2 });
    alert('Đã đăng xuất!');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    location.reload();
  }
  render() {
    const { username } = this.state;
    return (
      <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
        <Navbar fluid className={styles.sidebar} inverse >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">{username && username !== '' ? username : 'Chưa login'}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Navbar.Text className={styles.userMenu}>
              <Link to="/"><Navbar.Link><Glyphicon glyph="home" /></Navbar.Link></Link>
              {!username || username === '' ?
                <Link to="/login"><Navbar.Link href="#"><Glyphicon glyph="log-in" /></Navbar.Link></Link>
               :
                <Navbar.Link onClick={this.logout}><Glyphicon glyph="log-out" /></Navbar.Link>
               }
              <Link to="/register"><Navbar.Link href="#"><Glyphicon glyph="registration-mark" /></Navbar.Link></Link>
            </Navbar.Text>
            <Nav>
              {(this.state.role === '0' || this.state.role === '1') &&
                <NavItem eventKey={1}><Link to="/posts">Bài đăng</Link></NavItem>
              }
              {/* <NavDropdown eventKey={1} title="Categories">
                <MenuItem eventKey={1.1}> <Link to="/posts">Post Manager</Link></MenuItem>
                <MenuItem eventKey={1.2} href="#"><Link to="/myths">Myth Manager</Link></MenuItem>
              </NavDropdown>*/}
              {this.state.role === '0' &&
                <NavItem eventKey={2}><Link to="/admins">Quản trị</Link></NavItem>
              }
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
