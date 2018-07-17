import React, { Component } from 'react';
import {
  FormGroup,
  Position,
  Toast,
  Toaster,
  Button,
  TagInput,
  Intent
} from '@blueprintjs/core';
import moment from 'moment';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import validateBlogInput from './validateBlogInput';
import MyStatefulEditor from './MyStatefulEditor';
import { updateBlog, clearErrors } from '../../../redux/actions/blogActions';
import './table.css';
Modal.setAppElement('#root');

// onClick={this.props.updateBlog(_id, blogUpdate, history)}
class ListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log('NextProps => ', nextProps);
      this.setState({
        submitButtonWorkingState: false,
        title: nextProps.data.title,
        author: nextProps.data.author,
        date: nextProps.data.date.split('T')[0],
        body: nextProps.data.body,
        category: nextProps.data.category,
        tag: nextProps.data.tag,
        img: nextProps.data.img,
        public_id: nextProps.data.public_id
      });
    }
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.heading.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
    }
  };
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleTagInput = values => {
    this.setState({ tag: values });
  };

  handleCategoryInput = category => {
    this.setState({ category });
  };
  getImageUrl = url => {
    let urlArray = url.split('upload');
    let finalUrl = urlArray[0] + 'upload/w_300,h_200' + urlArray[1];
    return finalUrl;
  };
  onBodyChange = body => {
    this.setState({ body });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });
    const { errors, isValid } = validateBlogInput(this.state);
    if (isValid) {
      this.finalWork();
    } else {
      this.setState({ errors });
      setTimeout(() => {
        this.setState({ submitButtonWorkingState: false });
      }, 200);
    }
  };
  finalWork = () => {
    const updatedBlogData = {
      title: this.state.title,
      author: this.state.author,
      date: this.state.date,
      body: this.state.body,
      category: this.state.category,
      tag: this.state.tag,
      img: this.state.img,
      public_id: this.state.public_id
    };
    console.log('Blog going to Update => ', updatedBlogData);
    this.props.updateBlog(
      this.props.data._id,
      updatedBlogData,
      this.props.history
    );
    // turn off spinner
    setTimeout(() => {
      this.setState({ submitButtonWorkingState: false });
      this.addToast({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful! Blog Updated!'
      });
      this.closeModal();
    }, 1000);
  };
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ],
      title: this.props.data.title,
      author: this.props.data.author,
      date: this.props.data.date.split('T')[0],
      body: this.props.data.body,
      category: this.props.data.category,
      tag: this.props.data.tag,
      img: this.props.data.img,
      public_id: this.props.data.public_id
    };
  }
  render() {
    let { _id, title, date, category, img } = this.props.data;
    let { errors } = this.state;
    return (
      <div className="Rtable-row">
        <div className="Rtable-cell date-cell">
          <div className="Rtable-cell--heading">Date</div>
          <div className="Rtable-cell--content date-content">
            <span className="webinar-date">{moment(date).format('LL')}</span>
          </div>
        </div>
        <div className="Rtable-cell topic-cell">
          <div className="Rtable-cell--content title-content">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="Rtable-cell cagtegory-cell">
          <div className="Rtable-cell--heading">Category</div>
          <div className="Rtable-cell--content cagtegory-content">
            <strong>{category}</strong>
          </div>
        </div>
        <div className="Rtable-cell edit-cell">
          <div className="Rtable-cell--heading">Edit</div>
          <div className="Rtable-cell--content edit-content">
            <Button onClick={this.openModal} icon="edit" />
          </div>
        </div>
        <div className="Rtable-cell Rtable-cell--foot delete-cell">
          <div className="Rtable-cell--heading">Delete</div>
          <div className="Rtable-cell--content pdf-content">
            <Button onClick={() => this.props.deleteBlog(_id)} icon="trash" />
          </div>
        </div>
        <div>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
            {/* "Toasted!" will appear here after clicking button. */}
            {this.state.toasts.map(toast => <Toast {...toast} />)}
          </Toaster>
        </div>
        {/* Update Blog Code */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Blog Modal"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2
                style={{ textAlign: 'center' }}
                ref={heading => (this.heading = heading)}
              >
                Edit Blog Item
              </h2>
              <Button onClick={this.closeModal} icon="cross" />
            </div>
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div>
                    <img
                      className="image-blog"
                      src={this.getImageUrl(img)}
                      alt="Who Give The Testimonial"
                    />
                  </div>
                </div>
                <div>
                  <FormGroup
                    className="pt-form-group"
                    helperText={errors ? errors.body : ''}
                    label="Body of the Blog"
                    labelFor="body"
                    requiredLabel={true}
                  >
                    <MyStatefulEditor
                      initialValue={this.state.body}
                      onBodyChange={this.onBodyChange}
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
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { updateBlog, clearErrors })(withRouter(ListItem));
