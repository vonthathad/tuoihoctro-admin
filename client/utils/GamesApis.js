import { get, post, put, _delete } from './_requestCaller';
function getToken() {
  if (window.localStorage.getItem('token')) {
    return window.localStorage.getItem('token');
  }
  return null;
}

export function getGames(query) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    query,
    url: 'api/games',
    headers,
  });
}
export function getGame(path) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  return get({
    path,
    url: 'api/games/',
    headers,
  });
}
export function postGame(input) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  return post({
    body: input,
    url: 'api/games/',
    headers,
  });
}
export function putGame(path, input) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  return put({
    path,
    body: input,
    url: 'api/games/',
    headers,
  });
}
export function deleteGame(path) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  return _delete({
    path,
    url: 'api/games/',
    headers,
  });
}
