// import request from '../../services/api.services';
import { getPostsRecommend } from '../utils/PostsUtils';
// Recommend list
export const FETCH_RECOMMEND_CHUNK = 'FETCH_RECOMMEND_CHUNK';
export const FETCH_RECOMMEND_CHUNK_SUCCESS = 'FETCH_RECOMMEND_CHUNK_SUCCESS';
export const FETCH_RECOMMEND_CHUNK_FAILURE = 'FETCH_RECOMMEND_CHUNK_FAILURE';

// export function createRecommend(smallThumb) {
//   const headers = {
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
//     'content-type': 'application/json',
//   };
//   const request = callRequest('smallThumbs', headers, 'smallThumb', { smallThumb });
//   return {
//     type: CREATE_SMALLTHUMB,
//     payload: request,
//   };
// }

function fetchRecommendsChunk() {
  return {
    type: FETCH_RECOMMEND_CHUNK,
  };
}

function fetchRecommendsChunkSuccess(recommends) {
  return {
    type: FETCH_RECOMMEND_CHUNK_SUCCESS,
    payload: recommends,
  };
}
function fetchRecommendsChunkFailure(error) {
  return {
    type: FETCH_RECOMMEND_CHUNK_FAILURE,
    payload: error,
  };
}

export function _fetchRecommendsChunk(paging = 30) {
  return (dispatch) => {
    dispatch(fetchRecommendsChunk());
    const queryArgs = { paging };
    return getPostsRecommend(queryArgs)
      .then((recommends) => {
        // console.log(recommends);
        return dispatch(fetchRecommendsChunkSuccess(recommends));
      }
      )
      .catch(error => {
        console.log(error);
        dispatch(fetchRecommendsChunkFailure(error));
      });
  };
}

