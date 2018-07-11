import React, { Component } from 'react';
import { connect } from 'react-redux';

import EducationListItem from './EducationListItem';

class EducationList extends Component {
  render() {
    const { profile } = this.props.profile;
    const education = profile.education ? profile.education : [];
    return (
      <div>
        {education.length > 0 && (
          <div>
            <h4>Education/Experiences List</h4>
            <hr style={{ marginRight: '10rem' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {education.map((singleItem, index) => (
                <div
                  key={index}
                  style={{
                    margin: '0 10px 10px 0'
                  }}
                >
                  <EducationListItem number={index + 1} data={singleItem} />
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

export default connect(mapStateToProps, null)(EducationList);
