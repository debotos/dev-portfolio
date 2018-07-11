import React, { Component } from 'react';
import {
  Card,
  Elevation,
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

import { deleteTestimonials } from '../../../../redux/actions/profileActions';
import validateTestimonialsInput from './validatorTestimonial';

class TestimonialListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      } else {
        this.setState({ errors: {} });
      }
    }
    if (nextProps.data) {
      this.setState({
        testimonial_name: nextProps.data.name,
        testimonial_job: nextProps.data.job,
        testimonial_content: nextProps.data.testimonial,
        deleteButtonWorkingState: false
      });
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
  handleItemDelete = () => {
    this.setState({ deleteButtonWorkingState: true });
    this.props.deleteTestimonials(this.props.id);
    setTimeout(() => {
      this.setState({ deleteButtonWorkingState: false });
    }, 2000);
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };
  constructor(props) {
    super(props);
    this.state = {
      deleteButtonWorkingState: false,
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ],
      image_file_uploaded: false,
      testimonial_name: this.props.data.name ? this.props.data.name : '',
      testimonial_job: this.props.data.job ? this.props.data.job : '',
      testimonial_content: this.props.data.testimonial
        ? this.props.data.testimonial
        : '',
      selectedFile: null
    };
  }

  render() {
    const { data } = this.props;
    const { errors } = this.state;
    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          <div style={{ padding: '5px' }}>
            {this.state.deleteButtonWorkingState ? (
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
              <button
                onClick={this.handleItemDelete}
                type="button"
                className="pt-button pt-intent-danger"
              >
                Delete<span className="pt-icon-standard pt-icon-trash pt-align-right" />
              </button>
            )}
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { deleteTestimonials })(
  withRouter(TestimonialListItem)
);
