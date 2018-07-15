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

import { add_what_i_do } from '../../../../redux/actions/profileActions';
import validate_what_i_do_input from './validate_what_i_do_input';

class What_I_Do_Add extends Component {
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
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ],
      image_file_uploaded: false,
      title: '',
      info: '',
      selectedFile: null
    };
  }
  uploadImageThenAddDetailsToDB = () => {
    // create form data using img for stream upload in cloudinary
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios
      .post(`api/profile/what_i_do/img/upload`, data)
      .then(response => {
        // console.log('File Upload Response => ', response);
        if (response.data.success) {
          // image file upload successful
          this.setState({ image_file_uploaded: true });
          const newWhatIDo = {
            title: this.state.title,
            info: this.state.info,
            img: response.data.fileUrl,
            public_id: response.data.fileInfo.public_id
          };
          // console.log('New What I Do going to add => ', newWhatIDo);
          this.props.add_what_i_do(newWhatIDo, this.props.history);
          // turn off spinner
          this.setState({ submitButtonWorkingState: false });
          this.addToast({
            icon: 'tick',
            intent: Intent.SUCCESS,
            message: 'Successful! New Item Added!'
          });
          this.setState({
            title: '',
            info: '',
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
  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({
      submitButtonWorkingState: true
    });
    const { errors, isValid } = validate_what_i_do_input(this.state);
    if (this.state.selectedFile && isValid) {
      // Main work
      this.uploadImageThenAddDetailsToDB();
    } else {
      this.setState({ errors });
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
        <h4 style={{ textAlign: 'center' }}>Add What I Do</h4>
        <form
          method="post"
          onSubmit={this.onSubmit}
          encType="multipart/form-data"
        >
          <div>
            <FormGroup
              helperText={errors ? errors.title : ''}
              label="Title"
              labelFor="title"
              requiredLabel={true}
              className="pt-form-group"
            >
              <input
                onChange={this.onChange}
                value={this.state.title}
                style={{ width: '400px' }}
                className="pt-input pt-round "
                id="title"
                placeholder="Title eg. Web Development"
              />
            </FormGroup>
          </div>
          <div>
            <FileInput
              name="whatIDoimg"
              fill={true}
              text={
                this.state.selectedFile
                  ? this.state.selectedFile.name
                  : 'Select the image (Max: 150x150)'
              }
              onInputChange={this.fileChangedHandler}
            />
          </div>
          <div>
            <FormGroup
              className="pt-form-group"
              helperText={errors ? errors.info : ''}
              label="Info"
              labelFor="info"
              requiredLabel={true}
            >
              <TextArea
                value={this.state.info}
                style={{ height: '105px' }}
                id="info"
                className="pt-large pt-fill"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.onChange}
                placeholder="Details Information"
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

What_I_Do_Add.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { add_what_i_do })(
  withRouter(What_I_Do_Add)
);
