import React, { Component } from "react";
import UserLinks from "../UserLinks/UserLinks";
import 'gitment/style/default.css'
import Gitment from 'gitment'
import "./ToolbarActions.scss";

//右上角登录
class Toolbar extends Component {

  gitLogin() {
    const gitment = new Gitment({
      // id: 'Your page ID', // optional
      owner: 'smile-soul',
      repo: 'smilesoul_blog',
      oauth: {
        client_id: 'a567a2d184ead2598ac8',
        client_secret: 'b971544b62639adcb67930e3c1604a67913762d4',
      },
      // ...
      // For more available options, check out the documentation below
    })
    gitment.login('comments');
  }
  render() {
    const { config } = this.props;
    return (
      <div className="toolbar-actions">
        <div className="userlinks-container">
          <div onClick={this.gitLogin}>登录</div>
          {/* <UserLinks config={config} /> */}
        </div>
      </div>
    );
  }
}

export default Toolbar;
