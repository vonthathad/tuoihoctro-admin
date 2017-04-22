import { login, getToken } from '../utils/UsersUtils';
import callApiUser from '../utils/_requestCaller';
// Export Constants
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';

import { toggleLogin } from './WidgetActions';

// Export Actions
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}
export function registerUser(user) {
  return {
    type: REGISTER_USER,
    payload: user,
  };
}


export function loginRequest(data) {
  console.log(data);
  return (dispatch) => {
    return login({
      user: {
        username: data.email,
        password: data.password,
      },
    }).then((res) => {
      console.log(res);
      if (res.message) {
        alert(res.message);
      } else if (res.data) {
        // localStorage.setItem('id', res.data._id);
        localStorage.setItem('token', res.data.token);
        // localStorage.setItem('username', res.data.username);

        dispatch(loginUser(res.data));
      }
    });
  };
}
// export function getUserInfoFromToken(token) {
//   console.log(token);
//   return (dispatch) => {
//     return getToken(token).then((res) => {
//       console.log(res);
//       if (res.message) {
//         alert(res.message);
//       } else if (res.data) {
//         console.log(res.data);
//         dispatch(loginUser(res.data.user));
//       }
//     });
//   };
// }
//

export function registerRequest(data) {
  return (dispatch) => {
    return callApiUser('register', 'post', {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }).then((res) => {
      if (res.token) {
        alert('Đăng ký thành công');
      } else {
        alert('Đăng ký lỗi');
      }
      dispatch(registerUser(res.data));
    });
  };
}

export function checkLoginInit() {
  return (dispatch) => {
    let token = location.search.split('token=')[1];
    if (!token) {
      token = localStorage.getItem('token');
    }
    return token
      ? getToken(token).then((res) => {
        if (res.message) {
          alert(res.message);
        } else if (res.user) {
          !localStorage.getItem('token') &&
            localStorage.setItem('token', res.user.token);
          dispatch(loginUser(res.user));
        }
      })
      : null;
  };
}
export function checkLoginAction() {
  return (dispatch) => {
    if (!localStorage.getItem('token')) {
      dispatch(toggleLogin());
      return false;
    }
    return true;
  };
}
export function logout() {
  return (dispatch) => {
    const data = {};
    // localStorage.removeItem('id');
    localStorage.removeItem('token');
    // localStorage.removeItem('username');
    dispatch(loginUser(data));
  };
}

