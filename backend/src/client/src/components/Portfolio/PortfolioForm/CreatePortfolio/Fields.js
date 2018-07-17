import React, { Component } from 'react';
import {
  FormGroup,
  Intent,
  Position,
  Toast,
  Toaster,
  Card,
  Elevation,
  TextArea,
  Button,
  TagInput
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import 'react-select/dist/react-select.css';
import ImageUploader from 'react-images-upload';

import validatePortfolioInput from './validatePortfolioData';

import {
  createPortfolio,
  clearErrors
} from '../../../../redux/actions/portfolioActions';

class PortfolioFields extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      } else {
        this.setState({ errors: {} });
      }
    }
  }
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
      this.props.clearErrors();
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });
    const { errors, isValid } = validatePortfolioInput(this.state);
    if (this.state.pictures && isValid) {
      this.finalWork();
    } else {
      this.setState({ errors });
      setTimeout(() => {
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'error',
          intent: Intent.DANGER,
          message: 'Error! No Image Selected!'
        });
      }, 200);
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSelectChange = selectedOption => {
    // selectedOption can be null when the `x` (close) button is clicked
    this.setState({ category: selectedOption });
  };
  handleTagInput = values => {
    this.setState({ tag: values });
  };
  onDrop = (pictureFiles, pictureDataURLs) => {
    // console.log(pictureFiles);
    this.setState({ pictures: pictureFiles });
  };

  finalWork = () => {
    const data = new FormData();
    for (let index = 0; index < this.state.pictures.length; index++) {
      data.append('images', this.state.pictures[index]);
    }
    axios
      .post(`/api/portfolio/img/upload`, data)
      .then(response => {
        if (response.data.success) {
          let category = this.state.category.map(
            singleItem => singleItem.value
          );
          let img = response.data.filesInfo.map(
            singleItem => singleItem.secure_url
          );
          let public_id = response.data.filesInfo.map(
            singleItem => singleItem.public_id
          );
          let portfolioData = {
            category,
            img,
            public_id,
            name: this.state.name,
            github: this.state.github,
            url: this.state.url,
            date: this.state.date,
            details: this.state.details,
            tag: this.state.tag
          }; // @todo create obj
          // console.log('New portfolio Data for DB => ', portfolioData);
          this.props.createPortfolio(portfolioData, this.props.history);
          setTimeout(() => {
            this.setState({ submitButtonWorkingState: false });
            this.addToast({
              icon: 'tick',
              intent: Intent.SUCCESS,
              message: 'Successful! New Portfolio Item Added!'
            });
          }, 500);
          this.setState({
            pictures: null,
            name: '',
            github: '',
            url: '',
            date: moment().format('YYYY-MM-DD'),
            details: '',
            category: [],
            tag: []
          });
        } else {
          console.log('Error happen in file upload: ', response);
          this.setState({ submitButtonWorkingState: false });
          this.addToast({
            icon: 'error',
            intent: Intent.DANGER,
            message: 'Error! Check console!!!'
          });
        }
      })
      .catch(err => {
        console.log('*******************************');
        console.log('Error log: ', err);
        console.log('*******************************');
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'error',
          intent: Intent.DANGER,
          message: 'Session Expired! Login again!!!'
        });
        if (err.response) {
          this.setState({ errors: err.response.data.errors });
        }
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      pictures: null,
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ],
      name: '',
      github: '',
      url: '',
      date: moment().format('YYYY-MM-DD'),
      details: '',
      category: [],
      tag: []
    };
  }
  render() {
    const { errors } = this.state;
    let categories;
    if (Object.keys(this.props.categories).length === 0) {
      categories = [];
    } else {
      categories =
        this.props.categories.portfolio_categories.length > 0
          ? this.props.categories.portfolio_categories
          : [];
    }
    // Here converting an array of string to array of obj coz requirement of react-select
    const categoriesObjArray = categories.map(singleItem => ({
      value: singleItem,
      label: singleItem
    }));

    return (
      <div>
        <Card
          style={{ width: '96vw' }}
          interactive={true}
          elevation={Elevation.TWO}
        >
          <h3 style={{ textAlign: 'center' }}>Add Portfolio Item</h3>
          <form
            method="post"
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
          >
            <div>
              <div>
                <FormGroup
                  helperText={errors ? errors.category : ''}
                  label="Select Category"
                  labelFor="category"
                  requiredLabel={true}
                  className="pt-form-group"
                >
                  <Select
                    name="form-field-category"
                    value={this.state.category}
                    multi={true}
                    noResultsText="Not Found? First add category via Categories panel"
                    onChange={this.handleSelectChange}
                    options={categoriesObjArray}
                  />
                </FormGroup>
              </div>
              <br />
              <div>
                <FormGroup
                  helperText={errors ? errors.name : ''}
                  label="Name or Title"
                  labelFor="name"
                  requiredLabel={true}
                  className="pt-form-group"
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    className="pt-input pt-round pt-fill"
                    id="name"
                    placeholder="Identifier of the project"
                  />
                </FormGroup>
              </div>
              <br />
              <div>
                <FormGroup
                  helperText={errors ? errors.github : ''}
                  label="Github Link"
                  labelFor="github"
                  requiredLabel={true}
                  className="pt-form-group"
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.github}
                    className="pt-input pt-round pt-fill"
                    id="github"
                    placeholder="eg. https://www.github.com/debotos [note that with 'https://']"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  helperText={errors ? errors.url : ''}
                  label="Live/Hosted Link/URL"
                  labelFor="url"
                  requiredLabel={true}
                  className="pt-form-group"
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.url}
                    className="pt-input pt-round pt-fill"
                    id="url"
                    placeholder="eg. https://www.yourdomain.com [note that with 'https://']"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  className="pt-form-group"
                  helperText={errors ? errors.tag : ''}
                  label="Tags eg. HTML,CSS"
                  labelFor="tag"
                  requiredLabel={true}
                >
                  <TagInput
                    id="tag"
                    addOnPaste={true}
                    leftIcon="tag"
                    className="pt-input pt-round pt-fill"
                    placeholder="(press Enter after each tag or seperate by ',' then press Enter)"
                    onChange={this.handleTagInput}
                    values={this.state.tag}
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  label="Completed Date"
                  labelFor="date"
                  className="pt-form-group"
                  helperText={errors ? errors.date : ''}
                >
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="pt-input pt-round pt-fill"
                    value={this.state.date}
                    onChange={this.onChange}
                    min="2000-01-01"
                  />
                </FormGroup>
              </div>

              <div>
                <FormGroup
                  className="pt-form-group"
                  helperText={errors ? errors.img : ''}
                  label="Choose Images Max: 8"
                  labelFor="img"
                  requiredLabel={true}
                >
                  <ImageUploader
                    id="img"
                    withIcon={true}
                    buttonText="Choose images"
                    withPreview={true}
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.jpeg', '.svg']}
                    maxFileSize={5242880}
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  className="pt-form-group"
                  helperText={errors ? errors.details : ''}
                  label="Description"
                  labelFor="details"
                  requiredLabel={true}
                >
                  <TextArea
                    value={this.state.details}
                    style={{ height: '145px' }}
                    id="details"
                    className="pt-large pt-fill"
                    large={true}
                    intent={Intent.PRIMARY}
                    onChange={this.onChange}
                    placeholder="Details/Description"
                  />
                </FormGroup>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              {this.state.submitButtonWorkingState ? (
                <div className="pt-spinner pt-small">
                  <div className="pt-spinner-svg-container">
                    <svg viewBox="0 0 100 100">
                      <path
                        className="pt-spinner-track"
                        d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
                      />
                      <path
                        className="pt-spinner-head"
                        d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={this.onSubmit}
                  className="pt-button pt-intent-success"
                >
                  Submit<span className="pt-icon-standard pt-icon-tick-circle pt-align-right" />
                </Button>
              )}
            </div>
          </form>
        </Card>
        <div>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
            {/* "Toasted!" will appear here after clicking button. */}
            {this.state.toasts.map(toast => <Toast {...toast} />)}
          </Toaster>
        </div>
      </div>
    );
  }
}

PortfolioFields.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  categories: state.portfolio.categories
});

export default connect(mapStateToProps, { createPortfolio, clearErrors })(
  withRouter(PortfolioFields)
);
