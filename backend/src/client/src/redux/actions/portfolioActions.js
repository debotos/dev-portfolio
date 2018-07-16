import axios from 'axios';

import {
  GET_PORTFOLIO,
  PORTFOLIO_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CATEGORIES
} from './types';

// Get current Portfolio categories
export const getCurrentUserPortfolioCategories = () => dispatch => {
  dispatch(setPortfolioLoading());
  axios
    .get('/api/portfolio/category')
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIES,
        payload: {}
      })
    );
};

// Create Category
export const createCategory = (categoryData, history) => dispatch => {
  axios
    .post('/api/portfolio/category', categoryData)
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    )
    .catch(err => {
      // console.log(err);
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Category
export const deleteCategory = category_item => dispatch => {
  axios
    .delete(`/api/portfolio/category/${category_item}`)
    .then(res =>
      dispatch({
        type: GET_CATEGORIES,
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

/*-------------Portfolio Actions-------------------*/

// Get current portfolio
export const getCurrentPortfolio = () => dispatch => {
  dispatch(setPortfolioLoading());
  axios
    .get('/api/portfolio')
    .then(res =>
      dispatch({
        type: GET_PORTFOLIO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PORTFOLIO,
        payload: {}
      })
    );
};

// Create Portfolio
export const createPortfolio = (portfolioData, history) => dispatch => {
  axios
    .post('/api/portfolio', portfolioData)
    .then(res =>
      dispatch({
        type: GET_PORTFOLIO,
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

// Delete Portfolio
export const deletePortfolio = id => dispatch => {
  axios
    .delete(`/api/portfolio/${id}`)
    .then(res =>
      dispatch({
        type: GET_PORTFOLIO,
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

// Update portfolio
export const updatePortfolio = (id, portfolioUpdate, history) => dispatch => {
  axios
    .post(`/api/portfolio/${id}`, portfolioUpdate)
    .then(res =>
      dispatch({
        type: GET_PORTFOLIO,
        payload: res.data
      })
    )
    .catch(err => console.log('Portfolio Update Failed! log ->', err));
};

// Delete Portfolio Image(single)
export const deleteSinglePortfolioImage = (id, img_url) => dispatch => {
  axios
    .post(`/api/portfolio/img/del`, { id, img_url })
    .then(res =>
      dispatch({
        type: GET_PORTFOLIO,
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

// Portfolio loading
export const setPortfolioLoading = () => {
  return {
    type: PORTFOLIO_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
