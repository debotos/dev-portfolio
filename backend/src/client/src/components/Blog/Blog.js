import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getCurrentBlog } from '../../redux/actions/blogActions';

import BlogTabs from './Tabs';
import './blog.css';

class Blog extends Component {
  componentDidMount() {
    this.props.getCurrentBlog();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.blog.blog === null && this.props.blog.loading) {
  //     this.props.history.push('/');
  //   }
  // }
  render() {
    const { blog, loading } = this.props.blog;

    return blog === null || loading ? (
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
          paddingLeft: '10px'
        }}
      >
        <BlogTabs blog={blog} />
      </div>
    );
  }
}

Blog.propTypes = {
  getCurrentBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, { getCurrentBlog })(Blog);
