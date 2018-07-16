const Validator = require('validator');

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default function validatePortfolioInput(data) {
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
  // Below, all is array
  if (isEmpty(data.tag)) {
    errors.tag = 'Tag field is required';
  }

  // console.log(data.pictures.length === 0);
  // console.log(data.current_img.length === 0);
  // console.log(data.pictures.length === 0 && data.current_img.length === 0);

  if (data.pictures.length === 0 && data.current_img.length === 0) {
    errors.img = 'Image field is required';
  }

  if (isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
