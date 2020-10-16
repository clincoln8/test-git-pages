import React, {Component} from 'react';
import './App.css';
import * as API from './back-end/server-api.js';
import * as utils from './utils.js';

/**
 * Returns an html element of the missing cell value in a triple. If the current
 * triple is an outgoing assertion (current node displayed is the source of the
 * triple) then this method will be called on the target. If the current triple
 * is an inverse assertions, then this method is called on the source of the
 * triple.
 * Determines if the target is another node and should be
 * clickable, what color it should be, and the node reference that should be
 * displayed (dcid vs dcid [l:localId] vs [l:localId]). If the target is not
 * another node, then an html element of pure text is returned.
 * @param {Node|string} target The source of an inverse assertion or the target
 *     of a direct assertion.
 * @return {HtmlElement} A single cell of an html row representing a triple.
 *     Either the source or target of the triple depending if the triple is
 *     inverse or not.
 */
async function getMissingVal(target) {
  if (API.isNodeObj(target)) {
    const elemId = await API.getElemId(target);
    return (
      <td><p id={elemId} className='clickable' onClick={() =>
        utils.goToId(target.localId)}>{target.getRef()}</p></td>
    );
  }
  return (<td >{target}</td>);
}
function onProvClick(elemId, prov){
  if(elemId){
    utils.goToId(prov)
  } else{
    utils.openFile(prov)
  }
}
/**
 * Returns an html element row representing the given assertion.
 * @param {Assertion} assert The assertion/triple to create the html row from.
 * @param {boolean} isInverse True if the assertion is inverse, meaning the
 *     currently displayed node is the target of the triple.
 * @param {number} index Used to create a unique key for the html row element.
 * @return {HtmlElement} A row represeting the given triple.
 */
async function getRowFromTriple(assert, isInverse, index ) {
  const missingVal = isInverse ? assert.src : assert.target;
  const val = await getMissingVal(missingVal);

  let rowClassName;
  let provId = 'black';
  let provName = assert.provenance;
  if(provName.startsWith('https')){
    rowClassName = 'bold';
    provId = '';
    const provNames = [];
    for (const fileName of provName.split('&')){
      provNames.push(fileName.split('/').pop());
    }
    provName = provNames.join(', ');
  }
  return (
    <tr className={rowClassName} key={assert.property + index}>
      <td>{assert.property}</td>
      {val}
      <td><p id={provId} className='clickable'
         onClick={() => onProvClick(provId, assert.provenance)}>{provName}</p></td>
    </tr>
  );
}

/**
 * Converts a list of Assertion objects to an array of HTML row elements that is
 * displyed in the TriplesTable.
 * @param {Array<Assertion>} asserts An array of Assertion objects to display in
 *     the TriplesTable component.
 * @param {boolean} isInverse True if the current node displayed is the target
 *     for each of the assertions.
 * @return {Array<HtmlElement>} The array of HTML row elements representing each
 *     triple.
 */
async function getTripleRows(asserts, isInverse) {
  const tripleRows = [];
  let index = 0; // used to create a unique key for each row element

  for (const assert of asserts) {
    const tripleRow = await getRowFromTriple(assert, isInverse, index);
    tripleRows.push(tripleRow);
    index += 1;
  }
  return tripleRows;
}

function getTableHeaders(isInverse) {
  if (isInverse) {
    return (
      <tr>
        <th>Property</th>
        <th>Source</th>
        <th>Provenance</th>
      </tr>
    );
  }
  return (
    <tr>
      <th>Property</th>
      <th>Target</th>
      <th>Provenance</th>
    </tr>
  );
}

/** Displays all given triples as a table */
export class TriplesTable extends Component {
  /** Creates TriplesTable component. */
  constructor(props) {
    super(props);

    this.state = {
      tableRows: null,
      loading: true,
    };
  }

  /**
   * Gets rows of triples when the array of Assertions from props is updated.
   * @param {Object} prevProps The previous props before the component updated,
   *     used to compare if the passed in triples have been modified.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.triples !== this.props.triples) {
      this.setState({loading: true});
      getTripleRows(this.props.triples, this.props.inverse).then((rows) => {
        this.setState({tableRows: rows, loading: false});
      });
    }
  }

  /** Renders TriplesTable component.   */
  render() {
    if (this.state.loading) return null;

    const tableHeaders = getTableHeaders(this.props.inverse);

    return (
      <table>
        <thead>
          {tableHeaders}
        </thead>
        <tbody>{this.state.tableRows}</tbody>
      </table>
    );
  }
}
