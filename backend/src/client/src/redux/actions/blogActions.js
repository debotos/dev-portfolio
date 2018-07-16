import axios from 'axios';

import {
  GET_BLOG,
  BLOG_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from '../actions/types';

/*-------------Blog Actions-------------------*/

// Get current blog
export const getCurrentBlog = () => dispatch => {
  dispatch(setBlogLoading());
  axios
    .get('/api/blog')
    .then(res =>
      dispatch({
        type: GET_BLOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BLOG,
        payload: {}
      })
    );
};

// Create Blog
export const createBlog = (blogData, history) => dispatch => {
  axios
    .post('/api/blog', blogData)
    .then(res =>
      dispatch({
        type: GET_BLOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Blog
export const deleteBlog = id => dispatch => {
  axios
    .delete(`/api/blog/${id}`)
    .then(res =>
      dispatch({
        type: GET_BLOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update blog
export const updateBlog = (id, blogUpdate, history) => dispatch => {
  axios
    .post(`/api/blog/${id}`, blogUpdate)
    .then(res =>
      dispatch({
        type: GET_BLOG,
        payload: res.data
      })
    )
    .catch(err => console.log('Blog Update Failed! log ->', err));
};

// Blog loading
export const setBlogLoading = () => {
  return {
    type: BLOG_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
