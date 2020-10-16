import React, {Component} from 'react';
import './App.css';
import * as API from './back-end/server-api.js';
import * as utils from './utils.js';


async function getValueCell(target, prov) {
  if (API.isNodeObj(target)) {
    const className = await API.getClassName(target);
    return (<td className={className} onClick={() =>
      utils.goToId(target.localID)}>{API.getRef(target)}</td>);
  }

  return (<td >{target}</td>);
}
async function mapping(assert, index) {
  return getValueCell(assert.target, assert.provenance).then( (val) =>{
    let className;
    if (assert.provenance.startsWith('local:')) className = 'bold';

    return (
      <tr className={className} key={assert.property + index}>
        <td>{assert.property}</td>
        {val}
        <td>{assert.provenance}</td>
      </tr>
    );
  });
}

async function invMapping(assert, index) {
  return getValueCell(assert.src, assert.provenance).then( (val) =>{
    let className;
    if (assert.provenance.startsWith('local:')) className = 'bold';
    return (
      <tr className={className} key={assert.property + index}>
        {val}
        <td>{assert.property}</td>
        <td>{assert.provenance.replace(/local:/,'')}</td>
      </tr>
    );
  });
}

async function myMap(asserts, isInverse) {
  const mappedArr = [];
  let index = 0;

  for (const assert of asserts) {
    let mappedVal;
    if ( isInverse ) {
      mappedVal = await invMapping(assert, index);
    } else {
      mappedVal = await mapping(assert, index);
    }
    mappedArr.push(mappedVal);
    index += 1;
  }
  console.log(mappedArr);
  return mappedArr;
}

export class TriplesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triplesTable: null,
      loading: true,
      inverse: this.props.inverse,
      triples: this.props.triples,
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.triples !== this.props.triples) {
      this.setState({triples: this.props.triples, loading: true});
    } else if ( prevState.triples !== this.state.triples) {
      myMap(this.state.triples, this.state.inverse).then((table) => {
        console.log(table);
        this.setState({triplesTable: table, loading: false});
      });
    }
  }


  render() {
    if (this.state.loading) return null;

    if (this.state.inverse) {
      return (
        <table>
          <thead><tr>
            <th>source</th>
            <th>property</th>
            <th>provenance</th>
          </tr></thead>
          <tbody>{this.state.triplesTable}</tbody>
        </table>
      );
    }

    return (
      <table>
        <thead><tr>
          <th>property</th>
          <th>target</th>
          <th>provenance</th>
        </tr></thead>
        <tbody>{this.state.triplesTable}</tbody>
      </table>
    );
  }
}
