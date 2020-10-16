import * as API from './back-end/server-api.js';
import React, {Component} from 'react';
import {Header} from './Header.js';
import {TriplesTable} from './TriplesTable.js';
import './App.css';

/** Displays node data for a given node passed in through props. */
class DisplayNode extends Component {
  /** Creates DisplayNode component. */
  constructor(props) {
    super(props);
    this.state = {
      ref: null,
      asserts: [],
      invAsserts: [],
      fetching: true,
    };
  }

  /** Sets node data when the component mounts. */
  componentDidMount() {
    this.setNodeData();
  }

  /**
   * Sets node data when the node to display changes.
   * @param {Object} prevProps The previous props before the component updated,
   *     used to compare if the passed in node has changed.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.node !== this.props.node) {
      this.setNodeData();
    }
  }

  /**
   * Loads data to display for the node passed in through props. This includes
   * fetching the remote data from DC KG for the node.
   */
  setNodeData() {
    console.log(this.props.node);

    const curNode = this.props.node;
    this.setState({ref: curNode.getRef(), fetching: true});

    API.getElemId(curNode)
        .then((elemId) => this.setState({elemId: elemId}) );

    curNode.fetchRemoteData().then( () => {
      this.setState({fetching: false});
     const assertList = curNode.getAssertions();
     this.setState({asserts: assertList});
     const invAssertList = curNode.getInvAssertions();
     this.setState({invAsserts: invAssertList});
    });
  }

  /** Renders the DisplayNode component. */
  render() {
    let table;
    if (this.state.fetching) {
      table = (
        <div className='div-col'>
          <br></br>
            <div className='loadingSpinner'></div>
            <h2>...fetching triples...</h2>

        </div>
      );
    } else {
      table = (
        <div className='node'>
          <h3 className='inline'>Assertions</h3>
          <p className='inline'> - current node is source</p>
          <TriplesTable triples={this.state.asserts} inverse={false}/>
          <br></br>
          <h3 className='inline'>Inverse Assertions</h3>
          <p className='inline'> - current node is target</p>
          <TriplesTable triples={this.state.invAsserts} inverse={true}/>
        </div>
      );
    }

    return (
      <div>
        <p className='inline'> | </p>
        <p className='inline' id='blue'>Node has dcid that exists in DC KG</p>
        <p className='inline'> | </p>
        <p className='inline' id='purple'>Node has resolved local reference and no dcid</p>
        <p className='inline'> | </p>
        <p className='inline' id='orange'>Node has unresolved local reference and no dcid</p>
        <p className='inline'> | </p>
        <p className='inline' id='red'>Default; Node has dcid which does not exist in DC KG</p>
        <p className='inline'> | </p>
        <br></br>
        <br></br>
        <h1 className='inline'>Currently Viewing: </h1>
        <h1 className='inline' id={this.state.elemId}>{this.state.ref}</h1>
      <br></br>
      {table}

    </div>
    );
  }
}
export default DisplayNode;
