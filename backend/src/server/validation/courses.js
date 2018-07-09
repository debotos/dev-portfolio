const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCoursesInput(data) {
  console.log('Got to validate => ', data);
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.who_give = !isEmpty(data.who_give) ? data.who_give : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }

  if (Validator.isEmpty(data.who_give)) {
    errors.who_give = 'who give field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Field of study field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
