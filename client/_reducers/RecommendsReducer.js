import {
  FETCH_RECOMMEND_CHUNK, FETCH_RECOMMEND_CHUNK_FAILURE, FETCH_RECOMMEND_CHUNK_SUCCESS,
} from '../_actions/RecommendsActions';
const INITIAL_STATE = {
  recommendsList: { recommendsChunks: [], posts: [], page: 1, paging: 5, error: false },
};
// Initial State

const RecommendsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECOMMEND_CHUNK:
      {
        // console.log(state);
        return {
          ...state,
          recommendsList:
          {
            ...state.recommendsList,
            // recommendsChunks: [
            //   ...state.recommendsList.recommendsChunks,
            //   {
            //     loading: true,
            //     recommends: [],
            //   },
            // ],
          },
        };
      }
    case FETCH_RECOMMEND_CHUNK_SUCCESS:
      {
        // const recommendsChunks = state.recommendsList.recommendsChunks;
        // const lastChunkIndex = recommendsChunks.length - 1;
        // recommendsChunks[lastChunkIndex].loading = false;
        // recommendsChunks[lastChunkIndex].recommends = action.payload;

        // const recommendsList = { ...state.recommendsList };
        // const recommendsChunks = recommendsList.recommendsChunks;
        // const lastChunkIndex = recommendsChunks.length - 1;
        // recommendsChunks[lastChunkIndex].loading = false;
        // recommendsChunks[lastChunkIndex].recommends = action.payload;

        const recommendsList = { ...state.recommendsList };
        recommendsList.posts = recommendsList.posts.concat(action.payload);
        recommendsList.fetching = false;
        recommendsList.page++;
        console.log(recommendsList);
        return {
          ...state,
          recommendsList,
        };
      }
    case FETCH_RECOMMEND_CHUNK_FAILURE:
      {
        // const recommendsChunks = state.recommendsList.recommendsChunks;
        // const lastChunkIndex = recommendsChunks.length - 1;
        // recommendsChunks[lastChunkIndex].loading = true;
        console.log(action.payload);
        return {
          ...state,
          // recommendsList:
          // {
          //   ...state.recommendsList,
          //   recommendsChunks,
          //   error: true,
          // },
        };
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all recommends
export const getRecommends = state => state.recommends.data;

// Get smallThumb by cuid
// export const getRecommend = (state, cuid) => state.recommends.data.filter(smallThumb => smallThumb._id === parseInt(cuid, 10))[0];

// Export Reducer
export default RecommendsReducer;
