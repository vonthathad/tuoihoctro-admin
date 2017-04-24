import { post, get } from './_requestCaller';

export function postLogin(input) {
  const headers = {
    'Content-type': 'application/json',
  };
  return post({
    url: 'auth/login-admin',
    body: JSON.stringify(input),
    headers,
  });
}

export function postRegister(input) {
  const headers = {
    'Content-type': 'application/json',
  };
  return post({
    url: 'auth/register-admin',
    body: JSON.stringify(input),
    headers,
  });
}

export function getToken(token) {
  const tokenNoQuestionMark = token.replace(/\?/, '');
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${tokenNoQuestionMark}`,
  };
  return get({
    url: 'api/token',
    headers,
  });
}
