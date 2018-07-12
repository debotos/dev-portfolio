import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExperiencesListItem from './ExperiencesListItem';

class ExperiencesList extends Component {
  render() {
    const { profile } = this.props.profile;
    const experience = profile.experience ? profile.experience : [];
    return (
      <div>
        {experience.length > 0 && (
          <div>
            <h4>Experiences List</h4>
            <hr style={{ marginRight: '10rem' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {experience.map((singleItem, index) => (
                <div
                  key={index}
                  style={{
                    margin: '0 10px 10px 0'
                  }}
                >
                  <ExperiencesListItem number={index + 1} data={singleItem} />
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

export default connect(mapStateToProps, null)(ExperiencesList);
