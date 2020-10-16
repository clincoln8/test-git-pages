import React, {Component} from 'react';
import * as utils from './utils.js';
import './App.css';

/** Header component contains the id search bar and return home button. */
class Header extends Component {
  /**
   * Calls utils method goToId to search for an id when the user presses enter.
   * @param {Event} event OnKeyUp  event from html search input element.
   */
  handleSearch(event) {
    if (event.keyCode === 13) {
      utils.goToId(event.target.value);
    }
  }
  /** Renders header element. */
  render() {
    return (
      <div className='header'>
        <button onClick = {() => utils.goToHome() }>Return Home</button>
        <input type="search" onKeyUp={this.handleSearch}
          placeholder="Search id, use 'dcid:' namespace for remote lookup..." />
      </div>
    );
  }
}
export {Header};
