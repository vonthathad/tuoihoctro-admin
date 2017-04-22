import { get, post, put, _delete } from './_requestCaller';
export function getGames(query) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAeWFob28uY29tLnZuIiwiaWF0IjoxNDg4Mjc2OTM3fQ.JZmGONiFIwH5Q8eZ7bsWiATm7Pxsfy8Lsh96aKSY_HQ',
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
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAeWFob28uY29tLnZuIiwiaWF0IjoxNDg4Mjc2OTM3fQ.JZmGONiFIwH5Q8eZ7bsWiATm7Pxsfy8Lsh96aKSY_HQ',
  };
  return get({
    path,
    url: 'api/games/',
    headers,
  });
}
export function postGame(input) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAeWFob28uY29tLnZuIiwiaWF0IjoxNDg4Mjc2OTM3fQ.JZmGONiFIwH5Q8eZ7bsWiATm7Pxsfy8Lsh96aKSY_HQ',
  };
  return post({
    body: input,
    url: 'api/games/',
    headers,
  });
}
export function putGame(path, input) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAeWFob28uY29tLnZuIiwiaWF0IjoxNDg4Mjc2OTM3fQ.JZmGONiFIwH5Q8eZ7bsWiATm7Pxsfy8Lsh96aKSY_HQ',
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
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAeWFob28uY29tLnZuIiwiaWF0IjoxNDg4Mjc2OTM3fQ.JZmGONiFIwH5Q8eZ7bsWiATm7Pxsfy8Lsh96aKSY_HQ',
  };
  return _delete({
    path,
    url: 'api/games/',
    headers,
  });
}
