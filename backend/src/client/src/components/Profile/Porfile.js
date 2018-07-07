import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../redux/actions/profileActions';

import ProfileForm from './ProfileForm';
import VerticalTabs from './Tabs';

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    return profile === null || loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Spinner />
        {/* <ProfileForm profile={profile} /> */}
      </div>
    ) : (
      <div class="row">
        <div class="col-2">
          {/* This content will take up 2/12 of the container */}
          <VerticalTabs />
        </div>
        <div class="col-10">
          {/* This content will take up 10/12 of the container */}
          <div>
            <ProfileForm profile={profile} />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
