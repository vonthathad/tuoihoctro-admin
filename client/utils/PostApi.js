import { get, post, put, _delete } from './_requestCaller';
function getToken() {
  if (window.localStorage.getItem('token')) {
    return window.localStorage.getItem('token');
  }
  return 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D';
}

export function getPosts(query) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    query,
    url: 'api/posts',
    headers,
  });
}
export function countPosts() {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    url: 'api/posts-count',
    headers,
  });
}
export function postGif2mp4(input) {
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
export function getPost(path) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    path,
    url: 'api/posts/',
    headers,
  });
}
export function postPost(input) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
  return post({
    body: JSON.stringify(input),
    url: 'api/posts/',
    headers,
  });
}
export function putPost(path, input) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
  return put({
    path,
    body: JSON.stringify(input),
    url: 'api/posts/',
    headers,
  });
}
export function deletePost(path) {
  console.log(path);
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  return _delete({
    path,
    url: 'api/posts/',
    headers,
  });
}
