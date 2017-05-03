import { get, post, put, _delete } from './_requestCaller';
function getToken() {
  if (window.localStorage.getItem('token')) {
    return window.localStorage.getItem('token');
  }
  return 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D';
}

export function getAdmins(query) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    query,
    url: 'api/admins',
    headers,
  });
}
export function postLogin(input) {
  const headers = {
    'Content-type': 'application/json',
  };
  return post({
    body: JSON.stringify(input),
    url: 'auth/login-admin',
    headers,
  });
}
export function postRegister(input) {
  const headers = {
    'Content-type': 'application/json',
  };
  return post({
    body: JSON.stringify(input),
    url: 'auth/register-admin',
    headers,
  });
}
export function countAdmins() {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    url: 'api/admins-count',
    headers,
  });
}
export function adminGif2mp4(input) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return post({
    body: JSON.stringify(input),
    url: 'api/gif2mp4',
    headers,
  });
}
export function getAdmin(path) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    path,
    url: 'api/admins/',
    headers,
  });
}
export function postAdmin(input) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZvbnRoYXRoYWRAZ21haWwuY29tIiwiaWF0IjoxNDkzMDQyNjA4fQ.TowsT1N6KYJoswqeULcJe4SKWdoTEORKdYPNUnayzZI',
    'Content-Type': 'application/json',
  };
  return post({
    body: JSON.stringify(input),
    url: 'api/admins/',
    headers,
  });
}
export function putAdmin(path, input) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
  return put({
    path,
    body: JSON.stringify(input),
    url: 'api/admins/',
    headers,
  });
}
export function deleteAdmin(path) {
  console.log(path);
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  return _delete({
    path,
    url: 'api/admins/',
    headers,
  });
}
