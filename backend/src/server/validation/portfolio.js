const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports.validatePortfolioInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.details = !isEmpty(data.details) ? data.details : '';
  data.date = !isEmpty(data.date) ? data.date : '';

  if (!Validator.isLength(data.name, { min: 2, max: 255 })) {
    errors.name = 'Name needs to between 2 and 255 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Portfolio name field is required';
  }

  if (!Validator.isLength(data.details, { min: 5, max: 800 })) {
    errors.details = 'Details needs to between 5 and 800 characters';
  }

  if (Validator.isEmpty(data.details)) {
    errors.details = 'Details field is required';
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Completed Date field is required';
  }

  if (!isEmpty(data.github)) {
    if (!Validator.isURL(data.github)) {
      errors.github =
        'Not a valid Github URL! eg. https://www.github.com/debotos';
    }
    if (!data['github'].includes('https://')) {
      errors.github = 'Please put https://';
    }
  }

  if (!isEmpty(data.url)) {
    if (!Validator.isURL(data.url)) {
      errors.url = 'Not a valid URL! eg. https://www.yourdomain.com/';
    }
    if (!data['url'].includes('https://')) {
      errors.url = 'Please put https://';
    }
  }

  // Below, all is array
  if (isEmpty(data.tag)) {
    errors.tag = 'Tag field is required';
  }

  if (isEmpty(data.img)) {
    errors.img = 'Image field is required';
  }

  if (isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports.validatePortfolioCategoryInput = data => {
  let errors = {};

  data.portfolio_categories = !isEmpty(data.portfolio_categories)
    ? data.portfolio_categories
    : '';

  if (!Validator.isLength(data.portfolio_categories, { min: 2, max: 255 })) {
    errors.portfolio_categories =
      'portfolio category needs to between 2 and 255 characters';
  }

  if (Validator.isEmpty(data.portfolio_categories)) {
    errors.portfolio_categories = 'portfolio category field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
