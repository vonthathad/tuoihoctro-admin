import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

import { Link } from 'react-router';
import { loadPosts, _countPosts } from '../../redux/modules/postList';
import { removePost } from '../../redux/modules/postDetail';
import styles from './PostList.css';
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      posts: [],
      paging: 10,
    };
    this.baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:4000/posts_data/' : 'http://tuoihoctro.co/posts_data/';
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePagingChange = this.handlePagingChange.bind(this);
    // this.props.loadPosts();
  }
  componentDidMount() {
    const { page, paging } = this.state;
    const query = { page, paging };
    this.props.loadPosts(query);
    this.props._countPosts();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: [
        ...nextProps.postList.posts,
      ],
    });
  }
  handlePagingChange(e) {
    e.preventDefault();
    this.setState({
      paging: e.target.value,
    });
    const { page } = this.state;
    const query = { page, paging: e.target.value };
    this.props.loadPosts(query);
  }
  handleSelect(e) {
    this.setState({
      page: e,
    });
    const { paging } = this.state;
    const query = { page: e, paging };
    this.props.loadPosts(query);
  }
  handlePostDelete(e, index, id) {
    e.preventDefault();
    const posts = this.state.posts;
    this.props.removePost([id]);
    posts.splice(index, 1);
    this.setState({
      posts,
    });
  }
  render() {
    const posts = this.state.posts;
    // console.log(posts);
    return (
      <div>
        <div>
          <Link to="/create-post">
            <ButtonToolbar>
              <Button bsStyle="primary">
                Add new
              </Button>
            </ButtonToolbar>
          </Link>
          <h2>Bài đăng</h2>
          <span>Tổng {this.props.postList.count}</span>
          <FormGroup controlId="formControlsSelect" className={styles.paging}>
            <ControlLabel>Hiển thị</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.paging} onChange={this.handlePagingChange}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </FormControl>
          </FormGroup>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Media</th>
                <th>Thumb</th>
                <th>Recommend</th>
                <th>Vote / Views / Shares / Reports Count</th>
                <th>Publish</th>
                <th>Created</th>
                <th>Commands</th>
              </tr>
            </thead>
            <tbody>
              {posts && posts.map((post, index) =>
                <tr>
                  <td>{post._id}</td>
                  <td>{post.title}</td>
                  <td>{post.type === 1 ? 'gif' : (post.type === 0 ? 'photo' : 'list')}</td>
                  {
                    post.type === 'gif' || post.type === 1
                    ?
                      <td>
                        <video
                          loop
                          controls
                          src={`${post.mediaContent ? post.mediaContent : `${this.baseUrl}${post._id}/${post._id}_m.mp4`}`}
                          type="video/mp4"
                        >
                        </video>
                        {/* <img src={`${post.mediaContent}`} alt={post.mediaContent} className={styles.images} />*/}
                      </td>
                    :
                      <td><img src={`${post.mediaContent ? post.mediaContent : `${this.baseUrl}${post._id}/${post._id}_m.jpeg`}`} alt={post.mediaContent} className={styles.images} /></td>
                  }
                  <td><img src={post.thumb ? post.thumb : `${this.baseUrl}${post._id}/${post._id}_t.jpeg`} alt={post.thumb} className={styles.images} /></td>
                  <td><img src={post.smallThumb ? post.smallThumb : `${this.baseUrl}${post._id}/${post._id}_r.jpeg`} alt={post.smallThumb} className={styles.images} /></td>
                  <td>{`${post.votes && post.votes.length} / ${post.view} / ${post.shares && post.shares.length} / ${post.reports && post.reports.length}`}</td>
                  <td>{post.publish ? 'true' : 'false'}</td>
                  <td>{new Date(post.created).toLocaleString()}</td>
                  <td>
                    <Link to={`/posts/${post._id}`}>
                      <ButtonToolbar>
                        <Button bsStyle="warning">
                          Edit
                        </Button>
                      </ButtonToolbar>
                    </Link>
                    <Link to="">
                      <ButtonToolbar>
                        <Button bsStyle="danger" onClick={(e) => this.handlePostDelete(e, index, post._id)}>
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
              items={Math.floor(this.props.postList.count / this.state.paging)}
              maxButtons={10}
              activePage={this.state.page}
              onSelect={this.handleSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

PostList.propTypes = {
  postList: PropTypes.array,
  loadPosts: PropTypes.func,
  removePost: PropTypes.func,
  _countPosts: PropTypes.func,
};
function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (query) => dispatch(loadPosts(query)),
    removePost: (id) => dispatch(removePost(id)),
    _countPosts: () => dispatch(_countPosts()),
  };
}
function mapStateToProps(store) {
  return {
    postList: store.postList,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);
