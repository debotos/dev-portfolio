import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTestimonials } from '../../../../redux/actions/profileActions';

import TestimonialListItem from './TestimonialListItem';

class TestimonialList extends Component {
  render() {
    const { profile } = this.props.profile;
    const testimonials = profile.testimonials ? profile.testimonials : [];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {testimonials.length > 0 &&
          testimonials.map((singleItem, index) => (
            <div
              key={index}
              style={{
                margin: '0 10px 10px 0'
              }}
            >
              <TestimonialListItem
                deleteTestimonials={this.props.deleteTestimonials}
                id={singleItem._id}
                data={singleItem}
              />
            </div>
          ))}
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
