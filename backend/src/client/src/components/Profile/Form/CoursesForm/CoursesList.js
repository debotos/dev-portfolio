import React, { Component } from 'react';
import { connect } from 'react-redux';

import CoursesListItem from './CoursesListItem';

class CoursesList extends Component {
  render() {
    const { profile } = this.props.profile;
    const courses = profile.courses ? profile.courses : [];
    return (
      <div>
        {courses.length > 0 && (
          <div>
            <h4>Courses List</h4>
            <hr style={{ marginRight: '10rem' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {courses.map((singleItem, index) => (
                <div
                  key={index}
                  style={{
                    margin: '0 10px 10px 0'
                  }}
                >
                  <CoursesListItem number={index + 1} data={singleItem} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, null)(CoursesList);
