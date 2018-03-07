//全页面
import React, { Component } from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import JParticles from "jparticles";
import ToolbarActions from "../ToolbarActions/ToolbarActions";
import Footer from "../Footer/Footer";
import GetNavList from "./NavList";
import { userLinks } from '../../../data/SiteConfig';
import "./Navigation.scss";



class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particleStyleWidth: 1000,
      particleStyleHeight: 1000,
    }
  }
  componentDidMount() {
    const particleStyle = document.getElementById("JParticles").style;
    this.setState({
      particleStyleWidth: body.offsetWidth,
      particleStyleHeight: body.offsetHeight,
    });
    new JParticles.snow('#JParticles'); 
  }
  render() {
    const { children, config, LocalTitle } = this.props;
    const footerLinks = LocalTitle !== "About";
    return (
      <NavigationDrawer
        drawerTitle={config.siteTitle}
        toolbarTitle={LocalTitle}
        contentClassName="main-content"
        navItems={GetNavList(config)}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        toolbarActions={<ToolbarActions config={config} />}
        id="body"
      >
        <div id="JParticles" 
          className="JParticles" 
          style={{width: this.state.particleStyleWidth, height: this.state.particleStyleHeight}}
          ></div>
        <div className="main-container">{children}</div>
        <Footer userLinks={userLinks} />
      </NavigationDrawer>
    );
  }
}

export default Navigation;
