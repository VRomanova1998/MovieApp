import React, { Component } from 'react';
import './request-form.css';

export default class RequestForm extends Component {
  changeRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeLabel(e.target.value);
  };
  render() {
    return (
      <React.Fragment>
        <input
          className="input"
          type="search"
          value={this.props.label}
          placeholder="Type to search..."
          onChange={this.changeRequest}
        />
      </React.Fragment>
    );
  }
}
