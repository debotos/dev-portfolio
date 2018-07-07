const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTestimonialsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.job = !isEmpty(data.job) ? data.job : '';
  data.testimonial = !isEmpty(data.testimonial) ? data.testimonial : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  if (Validator.isEmpty(data.job)) {
    errors.job = 'job field is required';
  }

  if (Validator.isEmpty(data.testimonial)) {
    errors.testimonial = 'testimonial field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
