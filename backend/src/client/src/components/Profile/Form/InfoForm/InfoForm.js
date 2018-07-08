import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextArea,
  Intent,
  Position,
  Toast,
  Toaster,
  FormGroup
} from '@blueprintjs/core';
import { createProfile } from '../../../../redux/actions/profileActions';

import ProfileFormTextField from './ProfileFormTextField';
import {
  GenerateSectionOneInputFields,
  GenerateSectionTwoInputFields,
  GenerateSectionThreeInputFields
} from './GenerateInputFields';

class ProfileForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      profile_name: this.props.profile.profile.profile_name
        ? this.props.profile.profile.profile_name
        : '',
      full_name: this.props.profile.profile.full_name
        ? this.props.profile.profile.full_name
        : '',
      bio: this.props.profile.profile.bio ? this.props.profile.profile.bio : '',
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
      youtube: this.props.profile.profile.social.youtube
        ? this.props.profile.profile.social.youtube
        : '',
      twitter: this.props.profile.profile.social.twitter
        ? this.props.profile.profile.social.twitter
        : '',
      facebook: this.props.profile.profile.social.facebook
        ? this.props.profile.profile.social.facebook
        : '',
      linkedin: this.props.profile.profile.social.linkedin
        ? this.props.profile.profile.social.linkedin
        : '',
      instagram: this.props.profile.profile.social.instagram
        ? this.props.profile.profile.social.instagram
        : '',
      github: this.props.profile.profile.social.github
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

  addToast = () => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show({
        icon: 'tick',
        intent: Intent.SUCCESS,
        message: 'Successful! Profile Updated!'
      });
    }
  };
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleBioChange = e => {
    console.log(e.target.value);
    this.setState({ bio: e.target.value });
  };
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({
      submitButtonWorkingState: true
    });
    const profileData = {
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
      this.addToast();
    }, 500);
  }
  render() {
    const { errors } = this.state;
    const InputFieldsSectionOne = GenerateSectionOneInputFields(
      this.state,
      errors
    );
    const InputFieldsSectionTwo = GenerateSectionTwoInputFields(
      this.state,
      errors
    );
    const InputFieldsSectionThree = GenerateSectionThreeInputFields(
      this.state,
      errors
    );
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ padding: '20px' }}>
              {InputFieldsSectionOne.map(singleItemData => (
                <ProfileFormTextField
                  key={singleItemData.serial}
                  data={singleItemData}
                  onChange={this.onChange}
                />
              ))}
            </div>
            <div style={{ padding: '20px' }}>
              {InputFieldsSectionTwo.map(singleItemData => (
                <ProfileFormTextField
                  key={singleItemData.serial}
                  data={singleItemData}
                  onChange={this.onChange}
                />
              ))}
            </div>
            <div style={{ padding: '20px' }}>
              {InputFieldsSectionThree.map(singleItemData => (
                <ProfileFormTextField
                  key={singleItemData.serial}
                  data={singleItemData}
                  onChange={this.onChange}
                />
              ))}
              <FormGroup
                className="pt-form-group"
                helperText={errors.bio ? errors.bio : ''}
                label="Bio"
                labelFor="bio"
                requiredLabel={true}
              >
                <TextArea
                  style={{ height: '105px' }}
                  id="bio"
                  className="pt-large pt-fill"
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
