import React, { Component } from 'react';
// import { Button } from '@blueprintjs/core';

import ProfileFormTextField from './ProfileFormTextField';

class ProfileForm extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <form>
          <ProfileFormTextField />
        </form>
        {/* <h2>{JSON.stringify(profile)}</h2> */}
      </div>
    );
  }
}
export default ProfileForm;
