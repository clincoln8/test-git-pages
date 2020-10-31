/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Parses an mcf file and creates local knowledge graph of the parsed data
 * using Node and Assertion Class objects.
 */

import {Assertion, Node} from './graph.js';
import {shouldReadLine} from './utils.js';
const NAMESPACES = [ 'l', 'schema', 'dcs', 'dcid' ];
const LOCAL_NS = 'l';

/** Class responsible for parsing an mcf file. */
class ParseMcf {
  /**
   * Provenance to be used for any Assertion objects created during parsing,
   * based off of the mcf file name.
   * @type {string}
   */
  prov;
  /**
   * Current subject Node for any Assertion created. Set when a 'Node:' property
   * label is parsed.
   * @type {Node}
   */
  curNode;
  /**
   * Current line number of the line being parsed, used for identifying location
   * of syntax error in the mcf file.
   * @type {number}
   */

  lineNum;
  /**
   * Create a ParseMcf object which keeps tracks of the current source node of
   * each triple in the mcf and the provenance, which is the mcf file name.
   * @param {string} fileFullName Name of file to be converted to a provenance
   *     representing the file in teh Assertion Objects created while parsing.
   */
  constructor(fileName) {

    this.prov = fileName;
    this.curNode = null;
    this.lineNum = -1;
  }

  /**
   * Parses a string represetnaing a comma separated list of property values
   * from a line of an mcf file. Returns a list having either a string or
   * <namespace, reference> pair.
   *
   * @param {string} propValues A comma separated list of property values.
   * @return {Array<(string|Object)>} Array of
   *     parsed values.
   */
  parsePropValues(propValues) {
    const values = [];
    // split propValues on commas which are not enclosed by double quotes
    for (const propValue of propValues.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)) {
      const namespace = propValue.split(':')[0].trim();
      if (NAMESPACES.includes(namespace)) {
        values.push({
          'ns' : namespace,
          'ref' : propValue.substring(propValue.indexOf(':') + 1).trim(),
        });
      } else{
      values.push(propValue.trim());
    }
  }
    return values;
  }

  /**
   * Sets curNode variable of the calling ParseMcf object based on the passed in
   * parsed values of a line of mcf, given the property label for the line was
   * 'Node'. The parsed value either is a local reference with or without the
   * 'l' namespace, or it has a remote namespace. If the namespace is remote,
   * then the dcid for curNode is set. Updates localNodeHash mapping to store
   * the subject nodes to be displayed in home screen of browser.
   *
   * @param {Array<string|Object>} parsedValues The array of parsed values from
   *     a line of mcf with property label of 'Node'.
   */
  setCurNode(parsedValues) {
    if (parsedValues.length !== 1) {
      throw new Error('Error in declaring node (line ' + this.lineNum +
                      '): ' + parsedValues.toString());
    }

    let nodeId = parsedValues[0];
    let dcid = '';


    if (parsedValues[0] instanceof Object) {
      let ns = parsedValues[0]['ns'];
      if (ns === 'dcid') {
        dcid = parsedValues[0]['ref'];
        nodeId = 'dcid:' + parsedValues[0]['ref'];
      } else if (NAMESPACES.includes(ns)) {
        throw new Error('Error with namespace in declaring node (line ' +
          this.lineNum +  '): namespace: ' + parsedValues[0]['ns']);
      }
    }

    this.curNode = Node.getNode(nodeId);
    if (dcid) this.curNode.setDCID(dcid);

    ParseMcf.localNodeHash[nodeId] = this.curNode;
  }

  /**
   * Sets the dcid of the curNode variable of the calling ParseMcf object given
   * the property label of the line being parsed is 'dcid'.
   * @param {Array<string|Object>} parsedValues The array of parsed values from
   *     a line of mcf with property label of 'dcid'.
   */
  setCurNodeDCID(parsedValues) {
    const errStrEnding = '(line ' + this.lineNum +'): ' + parsedValues;
    if (!this.curNode) {
      throw new Error('ERROR (line ' + this.lineNum +'): ' +
       'current node must be set before setting dcid');
    }
    if (parsedValues.length !== 1) {
      throw new Error('ERROR (line ' + this.lineNum +'): ' +
      'a node can only have one dcid');
    }
    if (typeof parsedValues[0] !== 'string') {
      throw new Error('ERROR (line ' + this.lineNum +'): ' +
      'dcid property must be a string, not a node reference');
    }

    this.curNode.setDCID(parsedValues[0].replace(/"/g, ''));
  }

  /**
   * Create Assertion objects using curNode variable of calling ParseMcf object
   * as the source of the triple and the prov variable of the ParseMcf object
   * as the provenance of the triple.One Assertion object is created for each
   * parsed value given in the array parsedValues.
   *
   * @param {string} propLabel The property label of the triple to be created.
   * @param {Array<string|Object>} parsedValues The parsed values from a line of
   *     mcf, used to create the target for each created triple.
   */
  createAssertionsFromParsedValues(propLabel, parsedValues) {
    for (const val of parsedValues) {
      let target = val;
      if (val instanceof Object) {
        target = Node.getNode(val['ref']);
        if (val['ns'] !== LOCAL_NS) {
          target.setDCID(val['ref']);
        }
      }
      new Assertion(this.curNode, propLabel, target, this.prov);
    }
  }

  /**
   * Parses a single line of an mcf file. First determines if the line should be
   * read, then finds the property label, then the property values and creates
   * an Assertion object based on the triple, given the calling object has a
   * curNode property that acts as the source  and a prov property that gives
   * the provenance for the triple.
   *
   * @param {string} line The line of mcf to be parsed.
   */
  parseLine(line) {
    line = line.trim();

    if (!shouldReadLine(line)) {
      return;
    } // not an error

    if (!line.includes(':')) {
      throw new Error('Error, line ' + this.lineNum + ' does not contain ":"');
    }

    const propLabel = line.split(':', 1)[0].trim();
    const propValues = line.substring(line.indexOf(':') + 1);

    if (!propLabel || !propValues){
      throw new Error('Error, (line ' + this.lineNum + '): ' + line);
    }

    // parsePropValues() returns a list having either a string or <namespace,
    // reference> pair.
    const parsedValues = this.parsePropValues(propValues);

    switch (propLabel) {

    case 'Node':
      this.setCurNode(parsedValues);
      break;

    case 'dcid':
      this.setCurNodeDCID(parsedValues);
      break;

    default:
      this.createAssertionsFromParsedValues(propLabel, parsedValues);
    }
  }

  /**
   * Parses each line of the given string of an mcf file after setting the prov
   * property of the calling ParseMcf object.
   * @param {string} mcf The string representation of an mcf file to parse.
   * @param {string} fileName The name of file that mcf string comes from.
   * @return {Object} The mapping from local subject id to node, for home page.
   */
  parseMcfStr(mcf) {
    const lines = mcf.split('\n');
    this.lineNum = 1;

    lines.forEach((line) => {
      this.parseLine(line);
      this.lineNum++;
    });

    return ParseMcf.localNodeHash;
  }

  /**
   * Reads an mcf file into a string, then creates ParseMcf object to parse the
   * string.
   * @param {FileObject} file An mcf file from the html file-input element.
   * @return {Promise} Promise resolves to Node.nodeLocalHash after parsing mcf.
   */
  static readFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    return new Promise((res, rej) => {
      fileReader.addEventListener('loadend', (result) => {
        const mcfParser = new ParseMcf(file.name);
        res(mcfParser.parseMcfStr(fileReader.result));
      });

      fileReader.addEventListener('error', rej);
    });
  }
}

ParseMcf.localNodeHash = {}; // stores mapping of mcf subject IDs to the Node

export {ParseMcf};