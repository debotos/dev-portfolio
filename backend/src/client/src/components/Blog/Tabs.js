import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import BlogItemsPanel from './BlogPanel/BlogItemsPanel';
import CreateBlog from './BlogPanel/CreateBlog';

class BlogTab extends Component {
  state = {
    navbarTabId: 'BlogItemsPanel'
  };
  handleTabChange = navbarTabId => this.setState({ navbarTabId });
  render() {
    return (
      <Tabs id="blog_page_tab" onChange={this.handleTabChange}>
        <Tab id="BlogItemsPanel" title="Blog List" panel={<BlogItemsPanel />} />
        <Tab id="CreateBlog" title="Create" panel={<CreateBlog />} />
      </Tabs>
    );
  }
}

export default BlogTab;
