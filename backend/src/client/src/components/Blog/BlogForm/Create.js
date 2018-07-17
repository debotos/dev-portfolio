import React, { Component } from 'react';
import {
  FormGroup,
  Intent,
  Position,
  Toast,
  Toaster,
  Card,
  Elevation,
  Button,
  TagInput,
  FileInput
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';

import validateBlogInput from './validateBlogInput';
import MyStatefulEditor from './MyStatefulEditor';

import { createBlog, clearErrors } from '../../../redux/actions/blogActions';

class Create extends Component {
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

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
      this.props.clearErrors();
    }
  };
  handleTagInput = values => {
    this.setState({ tag: values });
  };

  handleCategoryInput = category => {
    this.setState({ category });
  };

  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });
    const { errors, isValid } = validateBlogInput(this.state);
    if (this.state.selectedFile && isValid) {
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
  onBodyChange = body => {
    this.setState({ body });
  };
  finalWork = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios
      .post(`/api/blog/img/upload`, data)
      .then(response => {
        // console.log('File Upload Response => ', response);
        if (response.data.success) {
          // image file upload successful
          const newBlogData = {
            title: this.state.title,
            author: this.state.author,
            date: this.state.date,
            body: this.state.body,
            category: this.state.category,
            tag: this.state.tag,
            img: response.data.filesInfo.secure_url,
            public_id: response.data.filesInfo.public_id
          };
          // console.log('New Blog going to add => ', newBlogData);
          this.props.createBlog(newBlogData, this.props.history);
          // turn off spinner
          this.setState({ submitButtonWorkingState: false });
          this.addToast({
            icon: 'tick',
            intent: Intent.SUCCESS,
            message: 'Successful! New Blog Added!'
          });
          this.setState({
            title: '',
            author: '',
            date: moment().format('YYYY-MM-DD'),
            body: '',
            category: [],
            tag: [],
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

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ],
      title: '',
      author: '',
      date: moment().format('YYYY-MM-DD'),
      body: '',
      category: [],
      tag: []
    };
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Card
          style={{ width: '98vw' }}
          interactive={true}
          elevation={Elevation.TWO}
        >
          <h3 style={{ textAlign: 'center' }}>Create Blog Post</h3>
          <form
            method="post"
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
          >
            <div>
              <div>
                <FormGroup
                  helperText={errors ? errors.title : ''}
                  label="Heading or Title"
                  labelFor="title"
                  requiredLabel={true}
                  className="pt-form-group"
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.title}
                    className="pt-input pt-round pt-fill"
                    id="title"
                    placeholder="Blog Title"
                  />
                </FormGroup>
              </div>
              <br />
              <div>
                <FormGroup
                  helperText={errors ? errors.author : ''}
                  label="Blog Author/Writer"
                  labelFor="author"
                  requiredLabel={true}
                  className="pt-form-group"
                >
                  <input
                    onChange={this.onChange}
                    value={this.state.author}
                    className="pt-input pt-round pt-fill"
                    id="author"
                    placeholder="eg. Debotos Das"
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
                  className="pt-form-group"
                  helperText={errors ? errors.category : ''}
                  label="Category eg. Web Development"
                  labelFor="category"
                  requiredLabel={true}
                >
                  <TagInput
                    id="category"
                    addOnPaste={true}
                    leftIcon="bookmark"
                    className="pt-input pt-round pt-fill"
                    placeholder="(press Enter after each category or seperate by ',' then press Enter)"
                    onChange={this.handleCategoryInput}
                    values={this.state.category}
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  label="Writing Date"
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
                  label="Choose Images Related With Blog"
                  labelFor="img"
                  requiredLabel={true}
                >
                  <FileInput
                    name="img"
                    fill={true}
                    text={
                      this.state.selectedFile
                        ? this.state.selectedFile.name
                        : 'Select an image(800x375)'
                    }
                    onInputChange={this.fileChangedHandler}
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  className="pt-form-group"
                  helperText={errors ? errors.body : ''}
                  label="Body of the Blog"
                  labelFor="body"
                  requiredLabel={true}
                >
                  <MyStatefulEditor onBodyChange={this.onBodyChange} />
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
                  className="pt-button pt-large pt-intent-success"
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

Create.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createBlog, clearErrors })(
  withRouter(Create)
);
