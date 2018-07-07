import React, { Component } from 'react';

class ProfileForm extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        Profile
        <h2>{JSON.stringify(profile)}</h2>
      </div>
    );
  }
}
export default ProfileForm;
