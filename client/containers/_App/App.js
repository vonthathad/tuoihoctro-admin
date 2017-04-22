import React, { Component, PropTypes } from 'react';
import Login from '../Login/Login';
import GameList from '../GameList/GameList';
import Header from '../Header/Header';
import DevTools from '../../components/DevTools/DevTools';
import SideBarMenu from '../../components/SideBarMenu/SideBarMenu';
import st from './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        {/* <Header />*/}
        <SideBarMenu />
        <div className={st.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
