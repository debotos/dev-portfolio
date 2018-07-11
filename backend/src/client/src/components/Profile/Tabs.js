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
    const { profile } = this.props;
    const onlyShowInfoPanel = Object.keys(profile).length === 0;
    let TabContent;
    if (onlyShowInfoPanel) {
      TabContent = (
        <div>
          <h1 style={{ textAlign: 'center' }}>First create a basic profile</h1>
          <div style={{ margin: 'auto' }}>
            <InfoPanel />
          </div>
        </div>
      );
    } else {
      TabContent = (
        <Tabs
          vertical={true}
          id="profile_page_tab"
          onChange={this.handleTabChange}
          renderActiveTabPanelOnly={this.state.activePanelOnly}
        >
          <Tab
            id="education"
            title="Education/Experiences"
            panel={<EducationPanel />}
          />
          <Tab
            id="testimonial"
            title="Testimonial"
            panel={<TestimonialPanel />}
          />
          <Tab id="info" title="Basic Info" panel={<InfoPanel />} />
          <Tab id="skills" title="Skills" panel={<Skills />} />
        </Tabs>
      );
    }

    return TabContent;
  }
}
