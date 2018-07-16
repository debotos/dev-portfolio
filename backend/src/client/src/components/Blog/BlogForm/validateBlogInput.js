const Validator = require('validator');

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default function validateBlogInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.body = !isEmpty(data.body) ? data.body : '';
  data.date = !isEmpty(data.date) ? data.date : '';

  if (!Validator.isLength(data.title, { min: 2, max: 255 })) {
    errors.title = 'Title needs to between 2 and 255 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Blog title field is required';
  }

  if (!Validator.isLength(data.author, { min: 2, max: 255 })) {
    errors.author = 'Author needs to between 2 and 255 characters';
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = 'Blog author field is required';
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body field is required';
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required';
  }
  // Below, all is array
  if (isEmpty(data.tag)) {
    errors.tag = 'Tag field is required';
  }

  if (isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
