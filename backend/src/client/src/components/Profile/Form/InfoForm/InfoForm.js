import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Card, Elevation } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {
  TextArea,
  Intent,
  Position,
  Toast,
  Toaster,
  FormGroup,
  FileInput
} from '@blueprintjs/core';
import axios from 'axios';
import { createProfile } from '../../../../redux/actions/profileActions';
import './info-form.css';

import ProfileFormTextField from './ProfileFormTextField';
import { GenerateInputFields } from './GenerateInputFields';

class ProfileForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      } else {
        this.setState({ errors: {} });
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      profile_name: this.props.profile.profile.profile_name
        ? this.props.profile.profile.profile_name
        : '',
      full_name: this.props.profile.profile.full_name
        ? this.props.profile.profile.full_name
        : '',
      bio: this.props.profile.profile.bio ? this.props.profile.profile.bio : '',
      img: this.props.profile.profile.img ? this.props.profile.profile.img : '',
      public_id: this.props.profile.profile.public_id
        ? this.props.profile.profile.public_id
        : '',
      email: this.props.profile.profile.email
        ? this.props.profile.profile.email
        : '',
      address: this.props.profile.profile.address
        ? this.props.profile.profile.address
        : '',
      map_address: this.props.profile.profile.map_address
        ? this.props.profile.profile.map_address
        : '',
      resume_link: this.props.profile.profile.resume_link
        ? this.props.profile.profile.resume_link
        : '',
      age: this.props.profile.profile.age ? this.props.profile.profile.age : '',
      residence: this.props.profile.profile.residence
        ? this.props.profile.profile.residence
        : '',
      skillsAt: this.props.profile.profile.skillsAt
        ? this.props.profile.profile.skillsAt.join()
        : '',
      phone: this.props.profile.profile.phone
        ? this.props.profile.profile.phone.join()
        : '',
      youtube: this.props.profile.profile.social
        ? this.props.profile.profile.social.youtube
        : '',
      twitter: this.props.profile.profile.social
        ? this.props.profile.profile.social.twitter
        : '',
      facebook: this.props.profile.profile.social
        ? this.props.profile.profile.social.facebook
        : '',
      linkedin: this.props.profile.profile.social
        ? this.props.profile.profile.social.linkedin
        : '',
      instagram: this.props.profile.profile.social
        ? this.props.profile.profile.social.instagram
        : '',
      github: this.props.profile.profile.social
        ? this.props.profile.profile.social.github
        : '',
      errors: {},
      submitButtonWorkingState: false,
      toasts: [
        /* IToastProps[] */
      ]
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };
  fileChangedHandler = event => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  };
  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
    }
  };
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleBioChange = e => {
    // console.log(e.target.value);
    this.setState({ bio: e.target.value });
  };
  getImageUrl = url => {
    let urlArray = url.split('upload');
    let finalUrl = urlArray[0] + 'upload/w_165,h_165' + urlArray[1];
    return finalUrl;
  };
  finalWork = () => {
    const profileData = {
      deleteImageFromServer: false,
      img: this.state.img,
      public_id: this.state.public_id,
      profile_name: this.state.profile_name,
      full_name: this.state.full_name,
      bio: this.state.bio,
      email: this.state.email,
      address: this.state.address,
      map_address: this.state.map_address,
      resume_link: this.state.resume_link,
      age: this.state.age,
      residence: this.state.residence,
      skillsAt: this.state.skillsAt,
      phone: this.state.phone,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      github: this.state.github
    };
    this.props.createProfile(profileData, this.props.history);
    setTimeout(() => {
      this.setState({ submitButtonWorkingState: false });
      this.addToast({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful!'
      });
    }, 500);
  };
  finalWorkWithImageUpload = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios.post(`api/profile/img/upload`, data).then(response => {
      // console.log('File Upload Response => ', response);
      if (response.data.success) {
        const profileData = {
          deleteImageFromServer: true,
          img: response.data.fileUrl,
          public_id: response.data.fileInfo.public_id,
          profile_name: this.state.profile_name,
          full_name: this.state.full_name,
          bio: this.state.bio,
          email: this.state.email,
          address: this.state.address,
          map_address: this.state.map_address,
          resume_link: this.state.resume_link,
          age: this.state.age,
          residence: this.state.residence,
          skillsAt: this.state.skillsAt,
          phone: this.state.phone,
          youtube: this.state.youtube,
          twitter: this.state.twitter,
          facebook: this.state.facebook,
          linkedin: this.state.linkedin,
          instagram: this.state.instagram,
          github: this.state.github
        };
        this.props.createProfile(profileData, this.props.history);
        setTimeout(() => {
          this.setState({ submitButtonWorkingState: false });
          this.addToast({
            icon: 'tick',
            intent: Intent.SUCCESS,
            message: 'Successful!'
          });
        }, 500);
      } else {
        console.log('Error happen in file upload: ', response);
        this.setState({ submitButtonWorkingState: false });
        this.addToast({
          icon: 'error',
          intent: Intent.DANGER,
          message: 'Error! Check console!!!'
        });
      }
    });
  };
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({ submitButtonWorkingState: true });
    if (this.state.selectedFile) {
      this.finalWorkWithImageUpload();
    } else {
      this.finalWork();
    }
  }
  render() {
    const { errors } = this.state;
    const InputFields = GenerateInputFields(this.state, errors);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div style={{}}>
            <div
              style={{
                padding: '15px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {InputFields.map(singleItemData => (
                <ProfileFormTextField
                  key={singleItemData.serial}
                  data={singleItemData}
                  onChange={this.onChange}
                />
              ))}
              {this.state.img ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      className="profile-image"
                      src={this.getImageUrl(this.state.img)}
                      alt="It's you"
                    />
                  </div>
                  <div>
                    <FormGroup
                      className="pt-form-group"
                      helperText={errors.img ? errors.img : ''}
                      label="Profile Picture"
                      labelFor="img"
                      requiredLabel={true}
                    >
                      <FileInput
                        className="pt-input pt-round pt-fill"
                        style={{ width: '380px', marginRight: '5px' }}
                        name="img"
                        id="img"
                        fill={true}
                        text={
                          this.state.selectedFile
                            ? this.state.selectedFile.name
                            : 'Change your profile image(550x550)'
                        }
                        onInputChange={this.fileChangedHandler}
                      />
                    </FormGroup>
                  </div>
                </div>
              ) : (
                <FormGroup
                  className="pt-form-group"
                  helperText={errors.img ? errors.img : ''}
                  label="Profile Picture"
                  labelFor="img"
                  requiredLabel={true}
                >
                  <FileInput
                    className="pt-input pt-round pt-fill"
                    style={{ width: '380px', marginRight: '5px' }}
                    name="img"
                    id="img"
                    fill={true}
                    text={
                      this.state.selectedFile
                        ? this.state.selectedFile.name
                        : 'Select your profile image(550x550)'
                    }
                    onInputChange={this.fileChangedHandler}
                  />
                </FormGroup>
              )}
              <FormGroup
                className="pt-form-group"
                helperText={errors.bio ? errors.bio : ''}
                label="Bio"
                labelFor="bio"
                requiredLabel={true}
              >
                <TextArea
                  style={{ height: '195px', width: '380px' }}
                  id="bio"
                  large={true}
                  fill={true}
                  large={true}
                  intent={Intent.PRIMARY}
                  onChange={this.handleBioChange}
                  value={this.state.bio}
                  placeholder="Your Introduction"
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

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(ProfileForm)
);
