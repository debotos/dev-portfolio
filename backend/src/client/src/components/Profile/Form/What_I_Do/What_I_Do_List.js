import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delete_what_i_do } from '../../../../redux/actions/profileActions';

import WhatIDoListItem from './What_I_Do_List_Item';

class What_I_Do_List extends Component {
  render() {
    const { profile } = this.props.profile;
    const what_i_do = profile.what_i_do ? profile.what_i_do : [];
    return (
      <div>
        {what_i_do.length > 0 && (
          <div>
            <h3>List of What I Do</h3>
            <hr style={{ marginRight: '10rem' }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {what_i_do.map((singleItem, index) => (
                <div
                  key={index}
                  style={{
                    margin: '0 10px 10px 0'
                  }}
                >
                  <WhatIDoListItem
                    delete_what_i_do={this.props.delete_what_i_do}
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

export default connect(mapStateToProps, { delete_what_i_do })(What_I_Do_List);
