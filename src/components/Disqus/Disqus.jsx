import React, { Component } from "react";
import ReactDisqusComments from "react-disqus-comments";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardText from "react-md/lib/Cards/CardText";
import Avatar from "react-md/lib/Avatars";
import FontIcon from "react-md/lib/FontIcons";
import Snackbar from "react-md/lib/Snackbars";
import 'gitment/style/default.css'
import Gitment from 'gitment'
import config from "../../../data/SiteConfig";

class Disqus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: []
    };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }
  componentDidMount() {
    const myTheme = {
      render(state, instance) {
        const container = document.createElement('div')
        container.lang = "en-US"
        container.className = 'gitment-container gitment-root-container'
        container.appendChild(instance.renderHeader(state, instance))
        container.appendChild(instance.renderEditor(state, instance))
        container.appendChild(instance.renderComments(state, instance))
        container.appendChild(instance.renderFooter(state, instance))
        return container
      },
    };
    const gitment = new Gitment({
      // id: 'Your page ID', // optional
      owner: 'smile-soul',
      repo: 'smilesoul_blog',
      oauth: {
        client_id: 'a567a2d184ead2598ac8',
        client_secret: 'b971544b62639adcb67930e3c1604a67913762d4',
      },
      theme: myTheme,
      // ...
      // For more available options, check out the documentation below
    })
    
    gitment.render('comments')  
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: "New comment available!" });
    this.setState({ toasts });
  }
  render() {
    const { postNode, expanded } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    const post = postNode.frontmatter;
    const url = config.siteUrl + config.pathPrefix + postNode.fields.slug;    
    return (
      <Card className="md-grid md-cell md-cell--12">
        <CardTitle
          title="Comments"
          avatar={<Avatar icon={<FontIcon>comment</FontIcon>} />}
          expander={!expanded}
        />
        <CardText expandable={!expanded}>
          <ReactDisqusComments
            shortname={config.disqusShortname}
            identifier={post.title}
            title={post.title}
            url={url}
            category_id={post.category_id}
            onNewComment={this.notifyAboutComment}
          />
        </CardText>
        <div id="comments"/>
        <Snackbar
          toasts={this.state.toasts}
          onDismiss={this.onSnackbarDismiss}
        />
      </Card>
    );
  }
}

export default Disqus;
