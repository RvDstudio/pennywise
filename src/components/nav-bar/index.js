import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class NavBar extends Component {
  state = {
    url: this.props.url,
    isDirty: false
  };

  onChange = (e) => {
    this.setState({
      url: e.target.value
    });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onUrl(e.target.value);
    }
  };

  render() {
    return (
      <div className='top-nav'>
        <button className="btn btn-dark" onClick={ this.props.onBack }><i className="fa fa-arrow-left"/></button>
        <button className="btn btn-dark" onClick={ this.props.onForward }><i className="fa fa-arrow-right"/></button>
        <button className="btn btn-dark" onClick={ this.props.onReload }><i className="fa fa-refresh"/></button>
        <div className="search-field">
          <input type="text"
                 placeholder='Enter the URL to load'
                 value={ this.state.url }
                 onChange={ this.onChange }
                 onKeyPress={ this.onKeyPress }/>
        </div>
        <button className="btn btn-danger btn-go" onClick={ () => this.props.onUrl('') }><i className='fa fa-times'/></button>
        <button className="btn btn-dark"><i className="fa fa-cog"></i></button>
      </div>
    );
  }
}

NavBar.propTypes = {
  url: PropTypes.string.isRequired,
  onUrl: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
};

export default NavBar;