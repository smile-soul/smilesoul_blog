import React, { Component } from "react";
import UserLinks from "../UserLinks/UserLinks";
import isUndefined from 'lodash/isUndefined';
import "./ToolbarActions.scss";

//右上角登录
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFlag: true,
    }
  }
  render() {
    const { config } = this.props;
    return (
      <div className="toolbar-actions">
        <div className="userlinks-container">
        </div>
      </div>
    );
  }
}

export default Toolbar;
