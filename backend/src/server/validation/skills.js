const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSkillsInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }

  if (!data.percentage) {
    errors.percentage = 'percentage field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
