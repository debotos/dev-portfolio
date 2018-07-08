import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import InfoPanel from './TabPanel/InfoPanel';
import TestimonialPanel from './TabPanel/TestimonialPanel';
import EducationPanel from './TabPanel/EducationPanel';
import Skills from './TabPanel/Skills';

export default class VerticalTabs extends Component {
  state = {
    navbarTabId: 'info'
  };
  handleTabChange = navbarTabId => this.setState({ navbarTabId });
  render() {
    return (
      <Tabs
        vertical={true}
        id="profile_page_tab"
        onChange={this.handleTabChange}
        renderActiveTabPanelOnly={this.state.activePanelOnly}
      >
        <Tab id="skills" title="Skills" panel={<Skills />} />
        <Tab id="info" title="Basic Info" panel={<InfoPanel />} />
        <Tab
          id="testimonial"
          title="Testimonial"
          panel={<TestimonialPanel />}
        />
        <Tab
          id="education"
          title="Education/Experiences"
          panel={<EducationPanel />}
        />
      </Tabs>
    );
  }
}
