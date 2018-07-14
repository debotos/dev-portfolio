import React from 'react';

export default class SkillsListItem extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ deleteButtonWorkingState: false });
    }
  }
  state = {
    deleteButtonWorkingState: false
  };
  handleItemDelete = () => {
    this.setState({ deleteButtonWorkingState: true });
    this.props.deleteSkills(this.props.id);
    setTimeout(() => {
      this.setState({ deleteButtonWorkingState: false });
    }, 4000);
  };
  render() {
    const { data } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ padding: '5px', paddingTop: '9px' }}>
          {this.props.number}
        </h3>
        <div style={{ padding: '5px' }}>
          <input
            readOnly
            value={data.title}
            className="pt-input"
            style={{ width: '200px' }}
          />
        </div>
        <div style={{ padding: '5px' }}>
          <input
            readOnly
            value={data.percentage + ' %'}
            className="pt-input"
            style={{ width: '100px' }}
          />
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
            <button
              onClick={this.handleItemDelete}
              type="button"
              className="pt-button pt-intent-danger"
            >
              Delete<span className="pt-icon-standard pt-icon-trash pt-align-right" />
            </button>
          )}
        </div>
      </div>
    );
  }
}
