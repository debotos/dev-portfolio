import React, { Component } from 'react';
import {
  FormGroup,
  Intent,
  Position,
  Toast,
  Toaster,
  TextArea,
  FileInput
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { addTestimonials } from '../../../../redux/actions/profileActions';

class TestimonialAdd extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
    }
  };
  /*
  // this implementation is for [Middleware] file-upload-middleware.js
  uploadImageThenAddDetailsToDB = () => {
    // create form data using img for stream upload in cloudinary
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append(
      'img_name',
      new Date().toISOString() + '-' + this.state.selectedFile.name
    );
    data.append('name', this.state.testimonial_name);
    data.append('job', this.state.testimonial_job);
    data.append('testimonial', this.state.testimonial_content);
    axios
      .post('api/profile/testimonials/img/upload', data)
      .then(response => {
        if (response.data.success) {
          // image file upload successful
          this.setState({ image_file_uploaded: true });
          const newTestimonialData = {
            name: this.state.testimonial_name,
            job: this.state.testimonial_job,
            testimonial: this.state.testimonial_content,
            img: response.data.fileUrl
          };
          this.props.addTestimonials(newTestimonialData, this.props.history);
          // turn off spinner
          this.setState({ submitButtonWorkingState: false });
          this.addToast({
            icon: 'tick',
            intent: Intent.SUCCESS,
            message: 'Successful! New Testimonial Added!'
          });
          this.setState({
            testimonial_name: '',
            testimonial_job: '',
            testimonial_content: '',
            selectedFile: null
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
        if (err.response.data) {
          console.log('*******************************');
          console.log('Error log: ', err.response);
          console.log('*******************************');
        }
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'error',
          intent: Intent.DANGER,
          message: 'Error! Check console!!!'
        });
        this.setState({ errors: err.response.data.errors });
      });
  };
  */
  constructor(props) {
    super(props);
    this.state = {
      testimonialsArray: this.props.profile.profile.testimonials
        ? this.props.profile.profile.testimonials
        : [],
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ],
      image_file_uploaded: false,
      testimonial_name: '',
      testimonial_job: '',
      testimonial_content: '',
      selectedFile: null
    };
  }
  uploadImageThenAddDetailsToDB = () => {
    // create form data using img for stream upload in cloudinary
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append(
      'img_name',
      new Date().toISOString() + '-' + this.state.selectedFile.name
    );
    data.append('name', this.state.testimonial_name);
    data.append('job', this.state.testimonial_job);
    data.append('testimonial', this.state.testimonial_content);
    axios
      .post('api/profile/testimonials/img/upload', data)
      .then(response => {
        console.log('GOT response:', response.data);
        if (response.data.success) {
          // image file upload successful
          this.setState({ image_file_uploaded: true });
          const newTestimonialData = {
            name: this.state.testimonial_name,
            job: this.state.testimonial_job,
            testimonial: this.state.testimonial_content,
            img: response.data.fileUrl
          };
          this.props.addTestimonials(newTestimonialData, this.props.history);
          // turn off spinner
          this.setState({ submitButtonWorkingState: false });
          this.addToast({
            icon: 'tick',
            intent: Intent.SUCCESS,
            message: 'Successful! New Testimonial Added!'
          });
          this.setState({
            testimonial_name: '',
            testimonial_job: '',
            testimonial_content: '',
            selectedFile: null
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
        if (err.response) {
          console.log('*******************************');
          console.log('Error log: ', err.response);
          console.log('*******************************');
        }
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'error',
          intent: Intent.DANGER,
          message: 'Error! Check console!!!'
        });
        this.setState({ errors: err.response.data.errors });
      });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({
      submitButtonWorkingState: true
    });
    if (this.state.selectedFile) {
      // Main work
      this.uploadImageThenAddDetailsToDB();
    } else {
      setTimeout(() => {
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'error',
          intent: Intent.DANGER,
          message: 'Error! No Image File Selected!'
        });
      }, 200);
    }
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form
          method="post"
          onSubmit={this.onSubmit}
          encType="multipart/form-data"
        >
          <div>
            <FormGroup
              helperText={errors.name ? errors.name : ''}
              label="Name"
              labelFor="testimonial_name"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                value={this.state.testimonial_name}
                style={{ width: '400px' }}
                className="pt-input .pt-round "
                id="testimonial_name"
                placeholder="Who give it to you"
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup
              helperText={errors.job ? errors.job : ''}
              label="Job"
              labelFor="testimonial_job"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                value={this.state.testimonial_job}
                style={{ width: '400px' }}
                className="pt-input .pt-round "
                id="testimonial_job"
                placeholder="his or her job/position"
              />
            </FormGroup>
          </div>
          <div>
            <FileInput
              name="testimonial_img"
              fill={true}
              text={
                this.state.selectedFile
                  ? this.state.selectedFile.name
                  : 'Select the image of his/her(200x200)'
              }
              onInputChange={this.fileChangedHandler}
            />
          </div>
          <div>
            <FormGroup
              className="pt-form-group"
              helperText={errors.testimonial ? errors.testimonial : ''}
              label="Testimonial"
              labelFor="testimonial_content"
              requiredLabel={true}
            >
              <TextArea
                value={this.state.testimonial_content}
                style={{ height: '105px' }}
                id="testimonial_content"
                className="pt-large pt-fill"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.onChange}
                placeholder="Testimonial Body"
              />
            </FormGroup>
          </div>
          <div>
            {this.state.submitButtonWorkingState ? (
              <div style={{ textAlign: 'center' }}>
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
              </div>
            ) : (
              <input
                type="submit"
                value="Submit"
                className="pt-button pt-large pt-intent-success"
              />
            )}
          </div>
        </form>
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

TestimonialAdd.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addTestimonials })(
  withRouter(TestimonialAdd)
);
