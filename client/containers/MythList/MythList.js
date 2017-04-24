import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';

import { Link } from 'react-router';
import { loadGames } from '../../redux/modules/gameDetail';
// import SideBarMenu from '../../containers/SideBarMenu/SideBarMenu';
class MythList extends Component {
  componentDidMount() {
    this.props.loadGames();
    console.log(this.props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="container">
          <Link to="/create-game">
            <ButtonToolbar>
              <Button bsStyle="primary">
                    Add new
              </Button>
            </ButtonToolbar>
          </Link>
          <h2>Basic Table</h2>
          <p>The .table class adds basic styling (light padding and only horizontal dividers) to a table:</p>
          <table className="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
             ( )
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

MythList.propTypes = {
  games: PropTypes.array,
  loadGames: PropTypes.func,
};
function mapDispatchToProps(dispatch) {
  return {
    loadGames: () => dispatch(loadGames()),
  };
}
function mapStateToProps(store) {
  return {
    games: store.Games,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MythList);
