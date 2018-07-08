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

  if (data.percentage) {
    if (data.percentage <= 10) {
      console.log('percentage have to be bigger than 10');

      errors.percentage = 'percentage have to be bigger than 10';
    } else if (data.percentage > 100) {
      errors.percentage = 'percentage have to be lower than 100';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
