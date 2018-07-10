import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Elevation } from '@blueprintjs/core';
import { deleteTestimonials } from '../../../../redux/actions/profileActions';

import TestimonialListItem from './TestimonialListItem';

class TestimonialList extends Component {
  render() {
    const { profile } = this.props.profile;
    const testimonials = profile.testimonials ? profile.testimonials : [];
    return (
      <div>
        {testimonials.length > 0 && (
          <Card interactive={true} elevation={Elevation.TWO}>
            {testimonials.map((singleItem, index) => (
              <TestimonialListItem
                deleteTestimonials={this.props.deleteTestimonials}
                id={singleItem._id}
                data={singleItem}
                key={index}
              />
            ))}
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { deleteTestimonials })(
  TestimonialList
);
