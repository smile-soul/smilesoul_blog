import React, { Component } from "react";
import Button from "react-md/lib/Buttons";
import Link from "gatsby-link";
import Dock from "react-osx-dock";
import config from "../../../data/SiteConfig";
import "./Footer.scss";

class Footer extends Component {
  render() {
    const url = config.siteRss;
    const { userLinks } = this.props;
    const fixedFooter = config.fixedFooter;
    const DockerItem = userLinks.map((link, index) => {
      return (<Dock.Item key={index}>
          <Button
            key={link.label}
            iconClassName={link.iconClassName}
            href={link.url}
          >
            {link.label}
          </Button>
      </Dock.Item>)
    })
    return (
      <footer>
      {/* <Dock width={800} magnification={2} magnifyDirection="up">
          {DockerItem}
      </Dock> */}
      </footer>
    );
  }
}

export default Footer;
