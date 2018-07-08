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
      testimonial_name: '',
      testimonial_job: '',
      testimonial_content: '',
      selectedFile: null
    };
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({
      submitButtonWorkingState: true
    });
    if (this.state.selectedFile) {
      // Upload Image and grab the image_url
      // this.uploadHandler();
      const newTestimonialData = {
        name: this.state.testimonial_name,
        job: this.state.testimonial_job,
        testimonial: this.state.testimonial_content
      };
      console.log(newTestimonialData);
      // Add testimonial to Database
      this.props.addTestimonials(newTestimonialData, this.props.history);
      setTimeout(() => {
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'tick',
          intent: Intent.SUCCESS,
          message: 'Successful! New Testimonial Added!'
        });
      }, 500);
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
    console.log(file);
    this.setState({ selectedFile: file });
  };
  uploadHandler = () => {
    console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios.post('my-domain.com/file-upload', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
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
                style={{ width: '400px' }}
                className="pt-input .pt-round "
                id="testimonial_job"
                placeholder="his or her job/position"
              />
            </FormGroup>
          </div>
          <div>
            <FileInput
              fill={true}
              text={
                this.state.selectedFile
                  ? this.state.selectedFile.name
                  : 'Select the image of his/her'
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
