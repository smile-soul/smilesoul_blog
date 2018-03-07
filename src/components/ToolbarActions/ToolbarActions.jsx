import React, { Component } from "react";
import UserLinks from "../UserLinks/UserLinks";
import isUndefined from 'lodash/isUndefined';
import 'gitment/style/default.css'
import Gitment from 'gitment'
import "./ToolbarActions.scss";

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
//右上角登录
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFlag: true,
    }
  }

  gitLogin() {
    gitment.login('comments');
    sessionStorage.setItem('login', 'false');
  }

  gitLogout() {
    gitment.logout('comments');
    sessionStorage.setItem('login', 'true');
  }
  render() {
    const { config } = this.props;
    let login;
    if(isUndefined(sessionStorage.login)) {
      login = (<div onClick={this.gitLogin}>登录</div>);
    } else {
      login = JSON.parse(sessionStorage.login) ? 
      (<div onClick={this.gitLogin}>登录</div>) :
      (<div onClick={this.gitLogout}>登出</div>) 
    }
    return (
      <div className="toolbar-actions">
        <div className="userlinks-container">
          {login}
          {/* <UserLinks config={config} /> */}
        </div>
      </div>
    );
  }
}

export default Toolbar;
