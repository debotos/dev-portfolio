import React, { Component } from 'react';
import { connect } from 'react-redux';

import './table.css';
import ListItem from './ListItem';
import { deleteBlog } from '../../../redux/actions/blogActions';

class List extends Component {
  render() {
    let { blog } = this.props.blog.blog;
    blog = blog ? blog : [];
    return (
      <div>
        {blog.length > 0 ? (
          <div className="wrapper">
            <div className="Rtable Rtable--collapse">
              <div className="Rtable-row Rtable-row--head">
                <div className="Rtable-cell date-cell column-heading">Date</div>
                <div className="Rtable-cell topic-cell column-heading">
                  Title
                </div>
                <div className="Rtable-cell cagtegory-cell column-heading">
                  Category
                </div>
                <div className="Rtable-cell edit-cell column-heading">Edit</div>
                <div className="Rtable-cell delete-cell column-heading">
                  Delete
                </div>
              </div>
              {/* Start Row */}
              {blog.map((singleItem, index) => (
                <ListItem
                  deleteBlog={this.props.deleteBlog}
                  data={singleItem}
                  number={index + 1}
                  key={index}
                />
              ))}
              {/* End Row*/}
            </div>
          </div>
        ) : (
          <div>No Blog Post! Create One !</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blog: state.blog
  };
};

export default connect(mapStateToProps, { deleteBlog })(List);
