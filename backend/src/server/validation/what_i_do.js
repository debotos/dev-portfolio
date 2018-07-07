const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWhatIdoInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.info = !isEmpty(data.info) ? data.info : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }

  if (Validator.isEmpty(data.info)) {
    errors.info = 'info field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
