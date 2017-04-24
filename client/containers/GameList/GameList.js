import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';

import { Link } from 'react-router';
import { loadGames } from '../../redux/modules/gameList';
import { removeGame } from '../../redux/modules/gameDetail';
import styles from './GameList.css';
class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      games: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleGameDelete = this.handleGameDelete.bind(this);
    this.props.loadGames();
  }
  componentDidMount() {
    this.props.loadGames();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      games: [
        ...nextProps.gameList.games,
      ],
    });
  }
  handleSelect(e) {
    this.setState({
      activePage: e,
    });
  }
  handleGameDelete(e, index, id) {
    e.preventDefault();
    const games = this.state.games;
    this.props.removeGame([id]);
    games.splice(index, 1);
    this.setState({
      games,
    });
  }
  render() {
    const games = this.state.games;
    return (
      <div>
        <div>
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
                <th>ID</th>
                <th>Title</th>
                <th>ThumbImage</th>
                <th>Plays/ Shares/ Views Count</th>
                <th>Des</th>
                <th>Published</th>
                <th>Created</th>
                <th>Commands</th>
              </tr>
            </thead>
            <tbody>
              {games && games.map((game, index) =>
                <tr>
                  <td>{game._id}</td>
                  <td>{game.title}</td>
                  <td><img src={`http://www.hotgame.co/${game.thumbImage}`} alt={game.thumbImage} className={styles.images} /></td>
                  <td>{`${game.playsCount} / ${game.sharesCount} / ${game.viewsCount}`}</td>
                  <td>{game.des}</td>
                  <td>{game.publish ? 'true' : 'false'}</td>
                  <td>{new Date(game.created).toLocaleString()}</td>
                  <td>
                    <Link to={`/games/${game._id}`}>
                      <ButtonToolbar>
                        <Button bsStyle="warning">
                          Edit
                        </Button>
                      </ButtonToolbar>
                    </Link>
                    <Link to="">
                      <ButtonToolbar>
                        <Button bsStyle="danger" onClick={(e) => this.handleGameDelete(e, index, game._id)}>
                          Delete
                        </Button>
                      </ButtonToolbar>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles['pagination-wrapper']}>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={20}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

GameList.propTypes = {
  gameList: PropTypes.array,
  loadGames: PropTypes.func,
  removeGame: PropTypes.func,
};
function mapDispatchToProps(dispatch) {
  return {
    loadGames: () => dispatch(loadGames()),
    removeGame: (id) => dispatch(removeGame(id)),
  };
}
function mapStateToProps(store) {
  return {
    gameList: store.gameList,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameList);
