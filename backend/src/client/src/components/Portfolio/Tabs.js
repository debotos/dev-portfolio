import React, { Component } from 'react';
import { Tab, Tabs } from '@blueprintjs/core';

import PortfolioCategoryPanel from './PortfolioPanel/PortfolioCategoryPanel';
import PortfolioItemsPanel from './PortfolioPanel/PortfolioItemsPanel';
class PortfolioTab extends Component {
  state = {
    navbarTabId: 'PortfolioItemsPanel'
  };
  handleTabChange = navbarTabId => this.setState({ navbarTabId });
  render() {
    /* I don't need this check coz if there is no data of this user
       about category or portfolio i am going to create it on server
       side code and then insert his submitted data
    */
    /*const { portfolio } = this.props;
    const onlyShowInfoPanel = Object.keys(portfolio).length === 0;
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
            id="PortfolioItemsPanel"
            title="Portfolio Items"
            panel={<PortfolioItemsPanel />}
          />
        </Tabs>
      );
    }*/

    return (
      <Tabs id="portfolio_page_tab" onChange={this.handleTabChange}>
        <Tab
          id="PortfolioCategoryPanel"
          title="Categories"
          panel={<PortfolioCategoryPanel />}
        />
        <Tab
          id="PortfolioItemsPanel"
          title="Portfolio Items"
          panel={<PortfolioItemsPanel />}
        />
      </Tabs>
    );
  }
}

export default PortfolioTab;
