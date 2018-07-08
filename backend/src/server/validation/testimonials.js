const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTestimonialsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.job = !isEmpty(data.job) ? data.job : '';
  data.testimonial = !isEmpty(data.testimonial) ? data.testimonial : '';

  if (!Validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = 'testimonial needs to between 3 and 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  if (!Validator.isLength(data.job, { min: 3, max: 50 })) {
    errors.job = 'testimonial needs to between 3 and 50 characters';
  }

  if (Validator.isEmpty(data.job)) {
    errors.job = 'job field is required';
  }

  if (!Validator.isLength(data.testimonial, { min: 10, max: 500 })) {
    errors.testimonial = 'testimonial needs to between 10 and 500 characters';
  }

  if (Validator.isEmpty(data.testimonial)) {
    errors.testimonial = 'testimonial field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
