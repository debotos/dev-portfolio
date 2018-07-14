import {
  GET_PORTFOLIO,
  PORTFOLIO_LOADING,
  GET_CATEGORIES
} from '../actions/types';

const initialState = {
  portfolio: null,
  categories: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PORTFOLIO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload,
        loading: false
      };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: action.payload
      };
    default:
      return state;
  }
}
