import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import InfoPanel from './TabPanel/InfoPanel';
import TestimonialPanel from './TabPanel/TestimonialPanel';
import EducationPanel from './TabPanel/EducationPanel';
import SkillsPanel from './TabPanel/SkillsPanel';
import WhatIDoPanel from './TabPanel/WhatIDoPanel';
import ExperiencesPanel from './TabPanel/ExperiencesPanel';
import CoursesPanel from './TabPanel/CoursesPanel';

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
          <Tab id="courses" title="Courses" panel={<CoursesPanel />} />
          <Tab
            id="experiences"
            title="Experiences"
            panel={<ExperiencesPanel />}
          />
          <Tab id="what_i_do" title="What I Do" panel={<WhatIDoPanel />} />
          <Tab id="education" title="Education" panel={<EducationPanel />} />
          <Tab
            id="testimonial"
            title="Testimonial"
            panel={<TestimonialPanel />}
          />
          <Tab id="info" title="Basic Info" panel={<InfoPanel />} />
          <Tab id="skills" title="Skills" panel={<SkillsPanel />} />
        </Tabs>
      );
    }

    return TabContent;
  }
}
