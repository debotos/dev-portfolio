import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Elevation } from '@blueprintjs/core';

import { deleteSkills } from '../../../../redux/actions/profileActions';
import SkillsListItem from './SkillsListItem';

class SkillsList extends Component {
  render() {
    const { profile } = this.props.profile;
    const skills = profile.skills ? profile.skills : [];
    return (
      <div>
        {skills.length > 0 && (
          <Card interactive={true} elevation={Elevation.TWO}>
            {skills.map((singleItem, index) => (
              <SkillsListItem
                deleteSkills={this.props.deleteSkills}
                id={singleItem._id}
                number={index + 1}
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

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { deleteSkills })(SkillsList);
