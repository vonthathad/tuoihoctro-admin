import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Pagination from 'react-bootstrap/lib/Pagination';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

import { Link } from 'react-router';
import { loadAdmins, _countAdmins, _removeError } from '../../redux/modules/adminList';
import { removeAdmin } from '../../redux/modules/adminDetail';
import styles from './AdminList.css';

class AdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      admins: [],
      paging: 10,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdminDelete = this.handleAdminDelete.bind(this);
    this.handlePagingChange = this.handlePagingChange.bind(this);
    // this.props.loadAdmins();
  }
  componentDidMount() {
    const { page, paging } = this.state;
    const query = { page, paging };
    this.props.loadAdmins(query);
    this.props._countAdmins();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      admins: [
        ...nextProps.adminList.admins,
      ],
    });
    if (nextProps.adminList.error &&
      nextProps.adminList.error !== this.props.adminList.error) {
      this.props._removeError();
    }
  }
  handlePagingChange(e) {
    e.preventDefault();
    this.setState({
      paging: e.target.value,
    });
    const { page } = this.state;
    const query = { page, paging: e.target.value };
    this.props.loadAdmins(query);
  }
  handleSelect(e) {
    this.setState({
      page: e,
    });
    const { paging } = this.state;
    const query = { page: e, paging };
    this.props.loadAdmins(query);
  }
  handleAdminDelete(e, index, id) {
    e.preventDefault();
    const admins = this.state.admins;
    this.props.removeAdmin([id]);
    admins.splice(index, 1);
    this.setState({
      admins,
    });
  }
  render() {
    const admins = this.state.admins;
    return (
      <div>
        <div>
          <Link to="/create-admin">
            <ButtonToolbar>
              <Button bsStyle="primary">
                Thêm mới
              </Button>
            </ButtonToolbar>
          </Link>
          <h2>Quản trị</h2>
          <span>Tổng {this.props.adminList.count}</span>
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
                <th>Username</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Role</th>
                <th>Created</th>
                <th>Banned</th>
              </tr>
            </thead>
            <tbody>
              {admins && admins.map((admin, index) =>
                <tr>
                  <td>{admin._id}</td>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td><img src={admin.avatar} alt="" /></td>
                  <td>{admin.role}</td>
                  <td>{new Date(admin.created).toLocaleString()}</td>
                  <td>{admin.banned ? 'true' : 'false'}</td>
                  <td>
                    <Link to={`/admins/${admin._id}`}>
                      <ButtonToolbar>
                        <Button bsStyle="warning">
                          Sửa
                        </Button>
                      </ButtonToolbar>
                    </Link>
                    <Link to="">
                      <ButtonToolbar>
                        <Button bsStyle="danger" onClick={(e) => this.handleAdminDelete(e, index, admin._id)}>
                          Xóa
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
              items={Math.floor(this.props.adminList.count / this.state.paging)}
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

AdminList.propTypes = {
  adminList: PropTypes.array,
  loadAdmins: PropTypes.func,
  removeAdmin: PropTypes.func,
  _countAdmins: PropTypes.func,
  _removeError: PropTypes.func,
};
function mapDispatchToProps(dispatch) {
  return {
    loadAdmins: (query) => dispatch(loadAdmins(query)),
    removeAdmin: (id) => dispatch(removeAdmin(id)),
    _countAdmins: () => dispatch(_countAdmins()),
    _removeError: () => dispatch(_removeError()),
  };
}
function mapStateToProps(store) {
  return {
    adminList: store.adminList,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
