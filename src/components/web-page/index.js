import React from 'react';
import PropTypes from 'prop-types';
import * as NProgress from 'nprogress';

import './style.scss';
import NavBar from '../nav-bar';

const { ipcRenderer } = window.require('electron');

// Used by WebView while loading any pages
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';

class WebPage extends React.Component {
  webView = React.createRef();
  state = {
    url: this.props.url,
    showNav: true
  };

  /**
   * Configures the loader and binds it to
   * the webview
   */
  configureLoader() {
    NProgress.configure({
      easing: 'ease',
      speed: 800,
      minimum: 0.2,
      showSpinner: false
    });

    const currentWebView = this.webView.current;
    currentWebView.addEventListener('did-start-loading', () => {
      NProgress.start();
    });

    currentWebView.addEventListener('did-stop-loading', () => {
      NProgress.done();
    });
  }

  onReload = () => {
    this.webView.current.reloadIgnoringCache();
  };

  onBack = () => {
    if (!this.webView.current.canGoBack()) {
      return;
    }

    this.webView.current.goBack();
  };

  onForward = () => {
    if (!this.webView.current.canGoForward()) {
      return;
    }

    this.webView.current.goForward();
  };

  bindNavBar() {
    ipcRenderer.on('nav.toggle', () => {
      this.setState(state => ({
        showNav: !state.showNav
      }));
    });

    ipcRenderer.on('nav.show', () => {
      this.setState({
        showNav: true
      });
    });
  }

  componentDidMount() {
    this.configureLoader();
    this.bindNavBar();
  }

  render() {
    return (
      <div className='webpage'>
        {
          this.state.showNav && <NavBar
            url={ this.state.url }
            onUrl={ this.props.onUrl }
            onReload={ this.onReload }
            onBack={ this.onBack }
            onForward={ this.onForward }
          />
        }
        <webview
          plugins={ true }
          userAgent={ USER_AGENT }
          ref={ this.webView }
          id="view"
          className="page"
          src={ this.props.url }
          autosize="on"
        />
      </div>
    );
  }
}

WebPage.propTypes = {
  url: PropTypes.string.isRequired,
  onUrl: PropTypes.func.isRequired
};

export default WebPage;
