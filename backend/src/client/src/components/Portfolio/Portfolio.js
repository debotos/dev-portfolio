import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../redux/actions/profileActions';

import PortfolioTab from './Tabs';
class Portfolio extends Component {
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
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          padding: '0 1rem 1rem 1rem'
        }}
      >
        <PortfolioTab profile={profile} />
      </div>
    );
  }
}

Portfolio.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Portfolio);
