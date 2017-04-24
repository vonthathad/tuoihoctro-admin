import fetch from 'isomorphic-fetch';
// import Config from '../../server/configs/server.config';

// export const BASE_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
//   process.env.baseUrl || (`http://localhost:${process.env.PORT || Config.port}`) :
//   'http://localhost:4000';
export const BASE_URL = (process.env.NODE_ENV === 'development' || typeof(window) !== 'undefined' && window.location.href.indexOf('localhost') !== -1) ?
  'http://localhost:4000' : 'http://tuoihoctro.co';

function request(options) {
  // set partial url to full url
  // options.url = `${baseUrl}${options.url}`;
  options.url = `${BASE_URL}/${options.url}`;
  // stringify body from json to string
  // options.body = JSON.stringify(options.body);
  // add default header if there are no header
  if (options.path && options.path.length > 0) {
    const length = options.path.length;
    const path = options.path;
    for (let i = 0; i < length; i++) {
      options.url += `${path[i]}/`;
    }
  }
  // add params to query params
  if (options.query) {
    // pour object properties to array
    const queryArray = [];
    Object.keys(options.query).forEach((param) => {
      queryArray.push(`${param}=${options.query[param]}`);
    });
    // connect array componet with '&' then connect with full url
    options.url = `${options.url}?${queryArray.join('&')}`;
  }
  // send request and return observable
  // return this.http.request(req);
  return fetch(options.url, { ...options })
    .then(res => {
      // console.log(res);
      if (res.status !== 200) {
        return res.json().then(body => {
          throw body.error;
        });
      }
      return res.json();
    });
}

export function post(options) {
  // console.log(options);
  options.method = 'post';
  return request(options);
}

export function get(options) {
  options.method = 'get';
  return request(options);
}

export function put(options) {
  options.method = 'put';
  return request(options);
}

export function _delete(options) {
  options.method = 'delete';
  return request(options);
}
