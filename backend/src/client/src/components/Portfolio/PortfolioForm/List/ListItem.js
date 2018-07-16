import React, { Component } from 'react';
import {
  Card,
  Elevation,
  Tag,
  Position,
  Toast,
  Toaster,
  Button,
  FormGroup,
  TextArea,
  TagInput,
  Icon,
  Intent
} from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import 'react-select/dist/react-select.css';
import ImageUploader from 'react-images-upload';

import './list_item.css';
import {
  updatePortfolio,
  clearErrors
} from '../../../../redux/actions/portfolioActions';
import validatePortfolioInput from './validateUpdatePortfolioData';

const customStyles = {
  content: {}
};
Modal.setAppElement('#root');

class ListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        deleteButtonWorkingState: false
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
  handleItemDelete = () => {
    // @todo : add a confirm dialog
    this.setState({ deleteButtonWorkingState: true });
    this.props.deletePortfolio(this.props.data._id);
    setTimeout(() => {
      this.setState({ deleteButtonWorkingState: false });
    }, 2000);
  };
  getImageUrl = url => {
    let urlArray = url.split('upload');
    let finalUrl = urlArray[0] + 'upload/w_200,h_200' + urlArray[1];
    return finalUrl;
  };
  deleteSinglePortfolioImage = imageUrl => {
    console.log('Deleting Img => ', imageUrl);
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      submitButtonWorkingState: true,
      errors: {}
    });
    const { errors, isValid } = validatePortfolioInput(this.state);
    if (this.state.current_img.length > 0 && isValid) {
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
  finalWork = () => {};
  state = {
    modalIsOpen: false,
    toasts: [
      /* IToastProps[] */
    ],
    deleteButtonWorkingState: false,
    submitButtonWorkingState: false,
    name: this.props.data.name ? this.props.data.name : '',
    github: this.props.data.github ? this.props.data.github : '',
    url: this.props.data.url ? this.props.data.url : '',
    date: this.props.data.date
      ? this.props.data.date.split('T')[0]
      : moment().format('YYYY-MM-DD'),
    details: this.props.data.details ? this.props.data.details : '',
    category: this.props.data.category ? this.props.data.category : [],
    tag: this.props.data.tag ? this.props.data.tag : [],
    current_img: this.props.data.img ? this.props.data.img : [],
    current_public_id: this.props.data.public_id
      ? this.props.data.public_id
      : [],
    errors: {},
    pictures: null
  };

  render() {
    let portfolio = this.props.data;
    const { errors } = this.state;
    let categories = this.props.categories
      ? this.props.categories.portfolio_categories
      : [];
    // Here converting an array of string to array of obj coz requirement of react-select
    const categoriesObjArray = categories.map(singleItem => ({
      value: singleItem,
      label: singleItem
    }));
    return (
      <Card
        style={{ margin: '5px' }}
        interactive={true}
        elevation={Elevation.TWO}
      >
        <h2 style={{ textAlign: 'center' }}>{this.props.number}</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h4 style={{ textAlign: 'center' }}>{portfolio.name}</h4>
          <h5 style={{ textAlign: 'center' }}>{portfolio.img.length} Images</h5>
          {portfolio.github && (
            <div style={{ textAlign: 'center' }}>
              <a href={portfolio.github} target="_blank">
                Github
              </a>{' '}
              {portfolio.url && (
                <a href={portfolio.url} target="_blank">
                  | Visit
                </a>
              )}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {portfolio.tag.map(singleItem => (
              <Tag
                style={{ padding: '5px', margin: '4px' }}
                key={singleItem}
                minimal={true}
              >
                {singleItem}
              </Tag>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {portfolio.category.map(singleItem => (
              <Tag
                style={{ padding: '5px', margin: '4px' }}
                key={singleItem}
                minimal={true}
              >
                {singleItem}
              </Tag>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            {this.state.deleteButtonWorkingState ? (
              <div
                style={{
                  marginTop: '10px'
                }}
                className="pt-spinner pt-small"
              >
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
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-around'
                }}
              >
                <button
                  onClick={this.openModal}
                  style={{ padding: '8px', marginRight: '10px' }}
                  className="pt-button pt-intent-success"
                >
                  Update<span className="pt-icon-standard pt-icon-tick-circle pt-align-right" />
                </button>
                <button
                  onClick={this.handleItemDelete}
                  type="button"
                  className="pt-button pt-intent-danger"
                >
                  Delete<span className="pt-icon-standard pt-icon-trash pt-align-right" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
            {/* "Toasted!" will appear here after clicking button. */}
            {this.state.toasts.map(toast => <Toast {...toast} />)}
          </Toaster>
        </div>
        {/* Update Portfolio Code */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2
                style={{ textAlign: 'center' }}
                ref={heading => (this.heading = heading)}
              >
                Edit Portfolio
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {this.state.current_img.map((singleItem, index) => (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                      key={index}
                    >
                      <img
                        className="image"
                        style={{
                          marginBottom: '5px'
                        }}
                        src={this.getImageUrl(singleItem)}
                        alt="portfolio Image"
                      />
                      <Button
                        onClick={() =>
                          this.deleteSinglePortfolioImage(singleItem)
                        }
                        title="Delete Portfolio Image"
                        icon="trash"
                      />
                    </div>
                  ))}
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
          </div>
        </Modal>
      </Card>
    );
  }
}

ListItem.propTypes = {};

const mapStateToProps = state => ({
  categories: state.portfolio.categories
});

export default connect(mapStateToProps, { updatePortfolio, clearErrors })(
  withRouter(ListItem)
);
