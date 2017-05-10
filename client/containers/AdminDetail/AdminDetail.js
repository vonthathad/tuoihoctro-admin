import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { loadAdmin, createAdmin, editAdmin, removeAdmin, turnOffError, turnOffMessage, _gif2mp4 } from '../../redux/modules/adminDetail';
import FieldGroup from '../../components/FieldGroup/FieldGroup';
import Button from 'react-bootstrap/lib/Button';
import styles from './AdminDetail.css';
import ImageCropper from '../../components/ImageCropper/ImageCropper';
import VideoScreenShotter from '../../components/VideoScreenShotter/VideoScreenShotter';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio';
import Table from 'react-bootstrap/lib/Table';

class AdminDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // đối tượng admin
      admin: {
        _id: '',
        username: '',
        password: '',
        confirmedPassword: '',
        email: '',
        avatar: '',
        role: 0,
        created: '',
        banned: 'true',
      },
      usernameWarning: '',
      passwordWarning: '',
      confirmedPasswordWarning: '',
      emailWarning: '',
    };
    // lắng nghe thay đổi
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPasswordChange = this.handleConfirmedPasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleBannedChange = this.handleBannedChange.bind(this);

    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);

    // load data từ server
    this.props.params.adminId && this.props.loadAdmin([this.props.params.adminId]);

    // nút đã click bằng rỗng
    this.clickedButton = '';
  }
  componentWillReceiveProps(nextProps) {
    const { data, error, message } = nextProps.adminDetail;
    // nếu có lỗi thì thông báo lỗi
    if (error !== '') {
      alert(error);
      this.props.turnOffError();
    }
    // nếu có thông báo thành công thì in ra thông báo thành công, sau đó chuyển route
    if (message !== '') {
      alert(message);
      this.props.turnOffMessage();
      switch (this.clickedButton) {
        case 'create': browserHistory.push(`/admins/${data._id}`); break;
        case 'delete': browserHistory.push('/admins'); break;
        case 'edit': location.reload(); break;
        default: break;
      }
    }
    // console.log(data);
    // kiểm tra xem dữ liệu mới của admin có hay không, nếu có sẽ update
    if (this.props.params.adminId && this.props.adminDetail.admin !== data) {
      this.setState({ admin: { ...data } });
    }
  }
  handleOptionChange(e) {
    const publish = e.target.value === 'true';
    this.setState({
      admin: {
        ...this.state.admin,
        publish,
      },
    });
  }
  handleDeleteButtonClick(e) {
    e.preventDefault();
    // gọi api xóa admin
    this.props.removeAdmin([this.props.params.adminId]);
    // đổi nút thành nút delete
    this.clickedButton = 'delete';
  }
  handleEditButtonClick(e) {
    e.preventDefault();
    // lấy thông tin admin và đổi kiểu của trường banned
    const admin = this.state.admin;
    admin.banned = admin.banned === 'true' || admin.banned === true;
    // gọi api cập nhật admin
    this.props.editAdmin([this.props.params.adminId], admin);
    // đổi nút thành nút edit
    this.clickedButton = 'edit';
  }
  handleCreateButtonClick(e) {
    e.preventDefault();
    // lấy thông tin admin và đổi kiểu của trường banned
    const admin = this.state.admin;
    admin.banned = admin.banned === 'true' || admin.banned;
    // gọi api cập nhật admin
    this.props.createAdmin(admin);
    // đổi nút thành nút tạo
    this.clickedButton = 'create';
  }

  handleUsernameChange(e) {
    e.preventDefault();
    const username = e.target.value;
    // kiểm tra tên
    if (username.length < 5) this.setState({ usernameWarning: 'Username phải lớn hơn 5 kí tự' });
    else this.setState({ usernameWarning: '' });
    this.setState({ admin: { ...this.state.admin, username } });
  }
  handlePasswordChange(e) {
    e.preventDefault();
    const password = e.target.value;
    // kiểm tra mật khẩu
    if (password.length < 5) this.setState({ passwordWarning: 'Password phải lớn hơn 5 kí tự' });
    else if (this.state.admin.confirmedPassword !== password) this.setState({ passwordWarning: 'Confirmed password khác password' });
    else this.setState({ passwordWarning: '' });
    if (this.state.admin.confirmedPassword === password && this.state.confirmedPasswordWarning !== 'Confirmed password phải lớn hơn 5 kí tự') this.setState({ confirmedPasswordWarning: '' });
    this.setState({ admin: { ...this.state.admin, password } });
  }
  handleConfirmedPasswordChange(e) {
    e.preventDefault();
    const confirmedPassword = e.target.value;
    // kiểm tra xác nhận mật khẩu
    if (confirmedPassword.length < 5) this.setState({ confirmedPasswordWarning: 'Confirmed password phải lớn hơn 5 kí tự' });
    else if (this.state.admin.password !== confirmedPassword) this.setState({ confirmedPasswordWarning: 'Confirmed password khác password' });
    else this.setState({ confirmedPasswordWarning: '' });
    if (this.state.admin.password === confirmedPassword && this.state.passwordWarning !== 'Password phải lớn hơn 5 kí tự') this.setState({ passwordWarning: '' });
    this.setState({ admin: { ...this.state.admin, confirmedPassword } });
  }
  handleEmailChange(e) {
    e.preventDefault();
    const email = e.target.value;
    // kiểm tra email
    if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) this.setState({ emailWarning: 'Email không đúng định dạng' });
    else this.setState({ emailWarning: '' });
    this.setState({ admin: { ...this.state.admin, email } });
  }
  handleRoleChange(e) {
    e.preventDefault();
    this.setState({ admin: { ...this.state.admin, role: e.target.value } });
  }
  handleBannedChange(e) {
    this.setState({ admin: { ...this.state.admin, banned: e.target.value === 'true' } });
  }


  render() {
    const { admin } = this.state;
    const { processing } = this.props.adminDetail;
    console.log(admin);
    return (
      <div className={`${styles.formWrapper}`}>
        <form>
          <FieldGroup
            id="Username"
            type="text"
            label="Username"
            placeholder="Enter username"
            value={admin.username}
            onChange={this.handleUsernameChange}
          />
          {this.state.usernameWarning.length > 0 &&
            <div className="alert alert-warning">
              {this.state.usernameWarning}
            </div>
          }
          <FieldGroup
            id="Password"
            type="text"
            label="Password"
            placeholder="Enter password"
            value={admin.password}
            onChange={this.handlePasswordChange}
          />
          {this.state.passwordWarning.length > 0 &&
            <div className="alert alert-warning">
              {this.state.passwordWarning}
            </div>
          }
          <FieldGroup
            id="Confirmed password"
            type="text"
            label="Confirmed password"
            placeholder="Confirm password"
            value={admin.confirmedPassword}
            onChange={this.handleConfirmedPasswordChange}
          />
          {this.state.confirmedPasswordWarning.length > 0 &&
            <div className="alert alert-warning">
              {this.state.confirmedPasswordWarning}
            </div>
          }
          <FieldGroup
            id="Email"
            type="text"
            label="Email"
            placeholder="Enter email"
            value={admin.email}
            onChange={this.handleEmailChange}
          />
          {this.state.emailWarning.length > 0 &&
            <div className="alert alert-warning">
              {this.state.emailWarning}
            </div>
          }
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Role</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.admin.role} onChange={this.handleRoleChange}>
              <option value="0">Admin</option>
              <option value="1">Editor</option>
              <option value="2">Chưa phân quyền</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Radio name="radioGroup" inline checked={this.state.admin.banned} onChange={this.handleBannedChange} value="true">
              Banned
            </Radio>
            {' '}
            <Radio name="radioGroup" inline checked={this.state.admin.banned === false} onChange={this.handleBannedChange} value="false">
              Unbanned
            </Radio>
          </FormGroup>
          <div className={styles['buttons-wrapper']}>
            {this.props.params.adminId ?
              <div>
                <Button bsStyle="warning" type="submit" onClick={this.handleEditButtonClick}>
                  Sửa
                </Button>
                <Button bsStyle="danger" type="submit" onClick={this.handleDeleteButtonClick}>
                  Xóa
                </Button>
              </div>
              :
              <Button bsStyle="default" type="submit" onClick={this.handleCreateButtonClick}>
                Tạo mới
              </Button>
            }
            <Link className="btn btn-default" to="/admins">
              Quay lại
            </Link>
          </div>
        </form>
        <div className={styles.processing} style={{ display: processing ? 'block' : 'none' }}>
          <div className={styles.loader}></div>
        </div>
      </div>
    );
  }
}

AdminDetail.propTypes = {
  adminDetail: PropTypes.object,
  loadAdmin: PropTypes.func,
  createAdmin: PropTypes.func,
  editAdmin: PropTypes.func,
  removeAdmin: PropTypes.func,
  turnOffError: PropTypes.func,
  turnOffMessage: PropTypes.func,
  params: PropTypes.object,
  processing: PropTypes.bool,
};
function mapDispatchToProps(dispatch) {
  return {
    loadAdmin: (query) => dispatch(loadAdmin(query)),
    createAdmin: (input) => dispatch(createAdmin(input)),
    editAdmin: (id, input) => dispatch(editAdmin(id, input)),
    removeAdmin: (id) => dispatch(removeAdmin(id)),
    turnOffError: () => dispatch(turnOffError()),
    turnOffMessage: () => dispatch(turnOffMessage()),
  };
}
function mapStateToProps(store) {
  return {
    adminDetail: store.adminDetail,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail);
