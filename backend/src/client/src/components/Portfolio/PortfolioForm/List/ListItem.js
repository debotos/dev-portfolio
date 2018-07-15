import React, { Component } from 'react';
import {
  Card,
  Elevation,
  Tag,
  Position,
  Toast,
  Toaster
} from '@blueprintjs/core';

export default class ListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        deleteButtonWorkingState: false
      });
    }
  }
  state = {
    toasts: [
      /* IToastProps[] */
    ],
    deleteButtonWorkingState: false
  };
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  addToast = toastData => {
    if (Object.keys(this.state.errors).length === 0) {
      this.toaster.show(toastData);
    }
  };
  handleItemDelete = () => {
    // @todo : add a confirm dialog
    this.setState({ deleteButtonWorkingState: true });
    this.props.deletePortfolio(this.props.data._id);
    setTimeout(() => {
      this.setState({ deleteButtonWorkingState: false });
    }, 2000);
  };
  render() {
    let portfolio = this.props.data;
    // console.log(portfolio);

    return (
      <Card
        style={{ margin: '5px' }}
        interactive={true}
        elevation={Elevation.TWO}
      >
        <h2 style={{ textAlign: 'center' }}>{this.props.number}</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h4 style={{ textAlign: 'center' }}>{portfolio.name}</h4>
          <h5 style={{ textAlign: 'center' }}>{portfolio.img.length} Images</h5>
          {portfolio.github && (
            <div style={{ textAlign: 'center' }}>
              <a href={'https://' + portfolio.github} target="_blank">
                Github
              </a>{' '}
              {portfolio.url && (
                <a href={'https://' + portfolio.url} target="_blank">
                  | Visit
                </a>
              )}
            </div>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {portfolio.tag.map(singleItem => (
              <Tag
                style={{ padding: '5px', margin: '4px' }}
                key={singleItem}
                minimal={true}
              >
                {singleItem}
              </Tag>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {portfolio.category.map(singleItem => (
              <Tag
                style={{ padding: '5px', margin: '4px' }}
                key={singleItem}
                minimal={true}
              >
                {singleItem}
              </Tag>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            {this.state.deleteButtonWorkingState ? (
              <div
                style={{
                  marginTop: '10px'
                }}
                className="pt-spinner pt-small"
              >
                <div className="pt-spinner-svg-container">
                  <svg viewBox="0 0 100 100">
                    <path
                      className="pt-spinner-track"
                      d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"
                    />
                    <path
                      className="pt-spinner-head"
                      d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-around'
                }}
              >
                <button
                  onClick={this.onSubmit}
                  style={{ padding: '8px', marginRight: '10px' }}
                  className="pt-button pt-intent-success"
                >
                  Update<span className="pt-icon-standard pt-icon-tick-circle pt-align-right" />
                </button>
                <button
                  onClick={this.handleItemDelete}
                  type="button"
                  className="pt-button pt-intent-danger"
                >
                  Delete<span className="pt-icon-standard pt-icon-trash pt-align-right" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster}>
            {/* "Toasted!" will appear here after clicking button. */}
            {this.state.toasts.map(toast => <Toast {...toast} />)}
          </Toaster>
        </div>
      </Card>
    );
  }
}
