import { get, post, put, _delete } from './_requestCaller';
import fetch from 'isomorphic-fetch';

function getToken() {
  if (window.localStorage.getItem('token')) {
    return window.localStorage.getItem('token');
  } else return null;
}

export function getPosts(queryArgs) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
  };
  return get({
    queryArgs,
    url: 'api/posts',
    headers,
  });
}
export function getPostsRecommend(queryArgs) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
  };
  return get({
    queryArgs,
    url: 'api/postsRecommend',
    headers,
  });
}
export function addPost(body) {
  let token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return post({
    body: body.post,
    url: 'api/posts',
    headers,
  });
}

export function deletePost(id) {
  let token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return _delete({
    url: 'api/posts/' + id,
    headers,
  });
}

export function getPost(id) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
  };
  return get({
    url: `api/posts/${id}`,
    headers,
  });
}

export function vote(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return put({
    url: `api/posts/${id}/vote`,
    headers,
  });
}
