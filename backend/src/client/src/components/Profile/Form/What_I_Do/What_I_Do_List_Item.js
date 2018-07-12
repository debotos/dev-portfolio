import React, { Component } from 'react';
import { Card, Elevation, Intent, TextArea } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { delete_what_i_do } from '../../../../redux/actions/profileActions';
import './what-i-do.css';

class What_I_Do_List_Item extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      } else {
        this.setState({ errors: {} });
      }
    }
    if (nextProps.data) {
      this.setState({
        title: nextProps.data.title,
        info: nextProps.data.info,
        deleteButtonWorkingState: false
      });
    }
  }
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
    this.props.delete_what_i_do(this.props.id);
    setTimeout(() => {
      this.setState({ deleteButtonWorkingState: false });
    }, 2000);
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  constructor(props) {
    super(props);
    this.state = {
      deleteButtonWorkingState: false,
      errors: {},
      toasts: [
        /* IToastProps[] */
      ],
      title: this.props.data.title ? this.props.data.title : '',
      info: this.props.data.info ? this.props.data.info : ''
    };
  }
  getImageUrl = url => {
    let urlArray = url.split('upload');
    let finalUrl = urlArray[0] + 'upload/w_100,h_100' + urlArray[1];
    return finalUrl;
  };
  render() {
    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <h2 style={{ textAlign: 'center' }}>{this.props.number}</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <input
              readOnly
              onChange={this.onChange}
              value={this.state.title}
              style={{ width: '400px' }}
              className="pt-input .pt-round "
              id="title"
            />
          </div>
          <div style={{ display: 'flex', padding: '10px' }}>
            <div>
              <img
                className="image"
                src={this.getImageUrl(this.props.data.img)}
                alt="Who Give The Testimonial"
              />
            </div>
            <div>
              <TextArea
                readOnly
                value={this.state.info}
                style={{ height: '105px', width: '285px' }}
                id="info"
                className="pt-large pt-fill"
                large={true}
                intent={Intent.PRIMARY}
                onChange={this.onChange}
                placeholder="Details Information"
              />
            </div>
          </div>

          <div style={{ padding: '5px' }}>
            {this.state.deleteButtonWorkingState ? (
              <div style={{ textAlign: 'center' }}>
                <div className="pt-spinner pt-small">
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
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
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
      </Card>
    );
  }
}

export default connect(null, { delete_what_i_do })(
  withRouter(What_I_Do_List_Item)
);
