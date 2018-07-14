import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import PortfolioCategoryPanel from './PortfolioPanel/PortfolioCategoryPanel';
import PortfolioItemWrapper from './PortfolioPanel/PortfolioItemWrapper';
class PortfolioTab extends Component {
  state = {
    navbarTabId: 'PortfolioItemWrapper'
  };
  handleTabChange = navbarTabId => this.setState({ navbarTabId });
  render() {
    const { profile } = this.props;
    console.log(this.props);

    const onlyShowInfoPanel = Object.keys(profile).length === 0;
    let TabContent;
    if (onlyShowInfoPanel) {
    } else {
      TabContent = (
        <Tabs
          id="portfolio_page_tab"
          onChange={this.handleTabChange}
          renderActiveTabPanelOnly={this.state.activePanelOnly}
        >
          <Tab
            id="PortfolioCategoryPanel"
            title="Categories"
            panel={<PortfolioCategoryPanel />}
          />
          <Tab
            id="PortfolioItemWrapper"
            title="Portfolio Items"
            panel={<PortfolioItemWrapper />}
          />
        </Tabs>
      );
    }

    return TabContent;
  }
}

export default PortfolioTab;
