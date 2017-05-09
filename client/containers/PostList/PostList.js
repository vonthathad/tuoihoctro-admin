import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
// import FormControl from 'react-bootstrap/lib/FormControl';
import FieldGroup from '../../components/FieldGroup/FieldGroup';

import { Link } from 'react-router';
import { loadPosts, _countPosts } from '../../redux/modules/postList';
import { removePost } from '../../redux/modules/postDetail';
import styles from './PostList.css';
class PostList extends Component {
  static contextTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      posts: [],
      paging: 10,
      searchText: '',
    };
    // this.baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:4000/posts_data/' : 'http://tuoihoctro.co/posts_data/';
    this.baseUrl = 'http://tuoihoctro.co/posts_data/';
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePagingChange = this.handlePagingChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.changeUrlQuery = this.changeUrlQuery.bind(this);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
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
  onSearchTextChange(e) {
    this.setState({ searchText: e.target.value });
  }
  changeUrlQuery() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const cate = params.get('category'); // bar
    const type = params.get('type'); // bar
    const sort = params.get('sort'); // bar
    const _search = params.get('search'); // bar
    const page = params.get('page'); // bar
    const paging = params.get('paging'); // bar
    const query = {};
    if (page) query.page = page;
    if (paging) query.paging = paging;
    if (cate && cate !== '') query.cate = cate;
    if (type && type !== '') query.type = type;
    if (_search && _search !== '') query.text = _search;
    if (sort) query.sort = sort;
    // const query = { page, paging, cate, type, sort };
    console.log(_search);
    this.props.loadPosts(query);
  }
  handlePagingChange(e) {
    e.preventDefault();
    this.setState({
      paging: e.target.value,
    });
    const { page } = this.state;
    this.context.history.push({
      ...this.props.location,
      query: {
        ...this.props.location.query,
        page,
        paging: e.target.value,
      },
    });
    this.changeUrlQuery();
  }
  handleCategoryChange(e) {
    e.preventDefault();
    this.context.history.push({
      ...this.props.location,
      query: {
        ...this.props.location.query,
        category: e.target.value,
      },
    });
    this.changeUrlQuery();
  }
  handleTypeChange(e) {
    e.preventDefault();
    this.context.history.push({
      ...this.props.location,
      query: {
        ...this.props.location.query,
        type: e.target.value,
      },
    });
    this.changeUrlQuery();
  }
  handleSortChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.context.history.push({
      ...this.props.location,
      query: {
        ...this.props.location.query,
        sort: e.target.value,
      },
    });
    this.changeUrlQuery();
  }
  handleSearchButtonClick(e) {
    e.preventDefault();
    this.context.history.push({
      ...this.props.location,
      query: {
        ...this.props.location.query,
        search: this.state.searchText,
      },
    });
    this.changeUrlQuery();
  }
  handleSelect(e) {
    this.setState({
      page: e,
    });
    const { paging } = this.state;
    this.context.history.push({
      ...this.props.location,
      query: {
        ...this.props.location.query,
        page: e,
        paging,
      },
    });
    this.changeUrlQuery();
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
                Thêm mới
              </Button>
            </ButtonToolbar>
          </Link>
          <h2>Bài đăng</h2>
          <div>
            <span>Tổng {this.props.postList.count}</span>
          </div>
          <FormGroup controlId="formControlsSelect" className={styles.paging}>
            <ControlLabel>Hiển thị</ControlLabel>
            <select placeholder="select" value={this.state.paging} onChange={this.handlePagingChange}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </FormGroup>
          <FormGroup controlId="formControlsSelect" className={styles.paging}>
            <ControlLabel>Danh mục</ControlLabel>
            <select placeholder="select" onChange={this.handleCategoryChange}>
              <option value="all">tất cả</option>
              <option value="0">Hài hước</option>
              <option value="1">Boys & girls</option>
            </select>
          </FormGroup>
          <FormGroup controlId="formControlsSelect" className={styles.paging}>
            <ControlLabel>Thể loại</ControlLabel>
            <select placeholder="select" onChange={this.handleTypeChange}>
              <option value="all">tất cả</option>
              <option value="0">photo</option>
              <option value="1">gif</option>
              <option value="2">list</option>
            </select>
          </FormGroup>
          <FormGroup controlId="formControlsSelect" className={styles.paging}>
            <ControlLabel>Sắp xếp</ControlLabel>
            <select placeholder="select" onChange={this.handleSortChange}>
              <option value="1">Mới nhất</option>
              <option value="-1">Cũ nhất</option>
            </select>
          </FormGroup>
          <FieldGroup
            id="Search Text"
            type="text"
            label="Tìm kiếm theo từ khóa"
            placeholder="Nhập từ khóa"
            value={this.state.searchText}
            onChange={this.onSearchTextChange}
          />
          <Button bsStyle="default" onClick={this.handleSearchButtonClick}>
              Tìm kiếm theo từ khóa
          </Button>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Media</th>
                <th>Thumb</th>
                <th>Recommend</th>
                {/* <th>Vote / Views / Shares / Reports Count</th>*/}
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
                          autoPlay
                          src={`${this.baseUrl}${post._id}/${post._id}_m.mp4`}
                          type="video/mp4"
                          className={styles.video}
                        >
                        </video>
                        {/* <img src={`${post.mediaContent}`} alt={post.mediaContent} className={styles.images} />*/}
                      </td>
                      :
                      <td><img style={{ backgroundImage: `url(${this.baseUrl}${post._id}/${post._id}_m.jpeg)` }} alt={post.mediaContent} className={`${styles.images} ${styles.media}`} /></td>
                  }
                  <td><img src={`${this.baseUrl}${post._id}/${post._id}_t.jpeg`} alt={post.thumb} className={styles.images} /></td>
                  <td><img src={`${this.baseUrl}${post._id}/${post._id}_r.jpeg`} alt={post.smallThumb} className={styles.images} /></td>
                  {/* <td>{`${post.votes && post.votes.length} / ${post.view} / ${post.shares && post.shares.length} / ${post.reports && post.reports.length}`}</td>*/}
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
  location: PropTypes.object,
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
