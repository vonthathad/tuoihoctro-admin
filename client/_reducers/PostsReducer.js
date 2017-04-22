import {
  FETCH_POSTS_CHUNK, FETCH_POSTS_CHUNK_FAILURE, FETCH_POSTS_CHUNK_SUCCESS, CREATE_POST_SUCCESS,
  FETCH_POST, FETCH_POST_FAILURE, FETCH_POST_SUCCESS,
  VOTE_POST_SUCCESS, VOTE_POST_FAILURE, TEMP_VOTE_POST_SUCCESS, TEMP_VOTE_POST_DETAIL_SUCCESS,
} from '../_actions/PostsActions';
const INITIAL_STATE = {
  // postsList: { postsChunks: [{ posts: [], error: null, loading: false }], page: 1, paging: 5 },
  // postsList: { postsChunks: [], page: 1, error: false, fetching: false, hasNext: true },
  postsList: { posts: [], page: 1, error: false, fetching: false, hasNext: true },
  newPost: { post: null, error: null, loading: false },
  activePost: { post: null, error: null, loading: false },
  deletedPost: { post: null, error: null, loading: false },
  postDetail: {},
};
// Initial State

const PostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      {
        const temp = { postsList: { ...state.postsList } };
        temp.postsList.postsChunks[0].posts.unshift(action.post.data);
        return {
          ...state,
          ...temp,
        };
      }

    case FETCH_POST_SUCCESS:
      {
        const temp1 = { postDetail: { ...state.postDetail } };
        temp1.postDetail = action.postDetail.data ? action.postDetail.data : action.postDetail;
        return {
          ...state,
          ...temp1,
        };
      }
    case FETCH_POSTS_CHUNK:
      {
        return {
          ...state,
          postsList:
          {
            ...state.postsList,
            fetching: true,
            // postsChunks: [
            //   ...state.postsList.postsChunks,
            //   {
            //     loading: true,
            //     posts: [],
            //   },
            // ],
          },
        };
      }
    case FETCH_POSTS_CHUNK_SUCCESS:
      {
        const postsList = { ...state.postsList };
        // const postsChunks = postsList.postsChunks;
        // const lastChunkIndex = postsChunks.length - 1;
        // postsChunks[lastChunkIndex].loading = false;
        // postsChunks[lastChunkIndex].posts = action.payload.postsChunk;
        postsList.posts = postsList.posts.concat(action.payload.postsChunk);
        // console.log(action.payload.postsChunk);
        // console.log(postsList);
        postsList.hasNext = action.payload.hasNext;
        postsList.fetching = false;
        postsList.page++;
        return {
          ...state,
          postsList,
        };
      }
    case FETCH_POSTS_CHUNK_FAILURE:
      {
        // const postsChunks = state.postsList.postsChunks;
        // const lastChunkIndex = postsChunks.length - 1;
        // postsChunks[lastChunkIndex].loading = true;
        return {
          ...state,
          postsList:
          {
            ...state.postsList,
            fetching: false,
            // postsChunks,
            error: true,
          },
        };
      }
    case VOTE_POST_SUCCESS:
      {
        // if ok return state

        // // console.log(state);
        // const chunks = [...state.postsList.postsChunks];
        // // const chunks = temp.postsList.postsChunks;
        // const chunksLength = chunks.length;
        // for (let i = 0; i < chunksLength; i++) {
        //   const posts = chunks[i].posts;
        //   const postsLength = posts.length;
        //   for (let j = 0; j < postsLength; j++) {
        //     if (posts[j]._id === action.payload.postId) {
        //       // console.log(posts[j]);
        //       const post = posts[j];
        //       const votes = post.votes;
        //       const index = votes.indexOf(action.payload.userId);
        //       // index > -1 ? votes.splice(index, 1) : votes.push(action.payload.userId);
        //       console.log(votes);
        //       // console.log(votes);
        //       break;
        //     }
        //   }
        // }

        // temp.postDetail.point += 1;
        // return {
        //   ...state,
        //   ...temp,
        // };
        return state;
      }
    case TEMP_VOTE_POST_DETAIL_SUCCESS:
      {
        const postDetail = { ...state.postDetail };
        if (postDetail._id === action.payload.postId) {
          // console.log(posts[j]);
          const votes = postDetail.votes;
          const index = votes.indexOf(action.payload.userId);
          if (index > -1) {
            votes.splice(index, 1);
            postDetail.point--;
          } else {
            votes.push(action.payload.userId);
            postDetail.point++;
          }
          // }
        }
        return {
          ...state,
          postDetail,
        };
      }
    case TEMP_VOTE_POST_SUCCESS:
      {
        console.log(5);
        const posts = [...state.postsList.posts];
        // const chunks = temp.postsList.postsChunks;
        const postsLength = posts.length;
        for (let i = 0; i < postsLength; i++) {
          // const posts = chunks[i].posts;
          // const postsLength = posts.length;
          // for (let j = 0; j < postsLength; j++) {
          if (posts[i]._id === action.payload.postId) {
            // console.log(posts[j]);
            const post = posts[i];
            const votes = post.votes;
            const index = votes.indexOf(action.payload.userId);
            if (index > -1) {
              votes.splice(index, 1);
              post.point--;
            } else {
              votes.push(action.payload.userId);
              post.point++;
            }
            break;
            // }
          }
        }
        return {
          ...state,
          postsList: {
            posts,
          },
        };
      }
    case VOTE_POST_FAILURE:
      {
        // console.log(faf);
        const chunks = [...state.postsList.postsChunks];
        // const chunks = temp.postsList.postsChunks;
        const chunksLength = chunks.length;
        for (let i = 0; i < chunksLength; i++) {
          const posts = chunks[i].posts;
          const postsLength = posts.length;
          for (let j = 0; j < postsLength; j++) {
            if (posts[j]._id === action.payload.postId) {
              // console.log(posts[j]);
              const post = posts[j];
              const votes = post.votes;
              const index = votes.indexOf(action.payload.userId);
              if (index > -1) {
                votes.splice(index, 1);
                post.point--;
              } else {
                votes.push(action.payload.userId);
                post.point++;
              }
              break;
            }
          }
        }
        return {
          ...state,
          postsList: {
            postsChunks: chunks,
          },
        };
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = (state) => {
  // console.log(state);
  return state.posts;
};

// Get post by cuid
export const getPost = (state, postId) => state.postsStore.postsList.postsChunks[0].posts.filter(post => post._id === parseInt(postId, 10))[0];

// Export Reducer
export default PostsReducer;
