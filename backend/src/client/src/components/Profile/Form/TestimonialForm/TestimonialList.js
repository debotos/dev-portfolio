import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTestimonials } from '../../../../redux/actions/profileActions';

import TestimonialListItem from './TestimonialListItem';

class TestimonialList extends Component {
  render() {
    const { profile } = this.props.profile;
    const testimonials = profile.testimonials ? profile.testimonials : [];
    return (
      <div>
        {testimonials.length > 0 && (
          <div>
            <h3>Testimonials List</h3>
            <hr style={{ marginRight: '10rem' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {testimonials.map((singleItem, index) => (
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
                    number={index + 1}
                  />
                </div>
              ))}
            </div>
          </div>
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
