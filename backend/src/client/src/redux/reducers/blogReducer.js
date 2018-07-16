import { GET_BLOG, BLOG_LOADING } from '../actions/types';

const initialState = {
  blog: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BLOG_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
