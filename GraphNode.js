const API_ROOT = 'https://api.datacommons.org';
const LOCAL_PROVENANCE = 'local mcf';
//const readline = require('readline');
//const fs = require('fs');
let readline;
let fs;
// JS representation of a single Node in the KG
class Node {
  constructor (dcid) {
    this.dcid = dcid;
    this.alreadyFetched = false;
  }

  // if Node with dcid already exists, return the node
  // if node DNE and createp is true, then create new Node with dcid, add to
  // Node class dictionary and return the new Node
  // otherwise return null
  static getNode (dcid, createp) {
    var existing = Node.nodeHash[dcid];
    if (existing) {
      return existing;
    } else if (createp) {
      var newNode = new Node(dcid);
      Node.nodeHash[dcid] = newNode;
      return newNode;
    } else {
      return null;
    }
  }

  // TODO fill in shouldDisplay
  //TODO verify the async/awaits

  static isNode(obj){
    return obj instanceof Node;
  }
}

export async function fetchRemoteData(curNode, shouldDisplay){
  if (!this.alreadyFetched){

    await getRemotePropertyLabels(curNode.dcid)
    .then(async allLabels => {
      // create Assertions for each triple current node is source
      for(const label of allLabels['outLabels']) {
        await getRemotePropertyValues(curNode.dcid, label, true)
        .then( valueList => {
          for(const valueObj of valueList) {
            Assertion.createAssertionFromValueObj(curNode, label, valueObj);
          }
        });
      }
      // create Inverse Assertion for each triple current node is target
      for (const label of allLabels['inLabels']) {
        await getRemotePropertyValues(curNode.dcid, label, false)
        .then( valueList => {
          for( const valueObj of valueList) {
          Assertion.createInvAssertionFromValueObj(curNode, label, valueObj);
        }
      })
    }
  });
    curNode.alreadyFetched = true;
  }
}

function getLabelsRemoteTarget(dcid){
  let target = (API_ROOT + '/node/property-labels?dcids=' + dcid)
  return target;
}

function getValuesRemoteTarget(dcid, property, out){
  let target = (API_ROOT + '/node/property-values?dcids=' + dcid +
  '&property=' +   property + '&direction=');
  if (out){
    target += 'out'
  } else{
    target += 'in'
  }
  target += '&limit=500';
  return target;
}

function getRemotePropertyLabels(dcid){
  const target = getLabelsRemoteTarget(dcid);
  return fetch(target)
  .then( res => res.json())
  .then( data => JSON.parse(data['payload'])[dcid]);
}

function getRemotePropertyValues(dcid, label, out){
  const target = getValuesRemoteTarget(dcid, label, out);
  return fetch(target)
  .then( res => res.json())
  .then( data => JSON.parse(data['payload'])[dcid])
  .then( bothDirections => {
    if (out){
      return bothDirections['out'];
    } else{
      return bothDirections['in'];
    }
  });
}

// Node class property to store all Node objects, dcid --> Node dictionary
Node.nodeHash = {}
class Assertion {
  constructor(src, property, target, provenance) {
    this.src = src;
    this.property = property;
    this.provenance = provenance;
    this.target = target;
    this.nextAssertion = src.assertions;
    src.assertions = this;

    if (Node.isNode(target)) {
      this.invNextAssertion = target.invAssertions;
      target.invAssertions = this;
    }
  }
  static addAssertion(src, property, target, provenance){
    new Assertion(src, property, target, provenance)
  }

  static createAssertionFromValueObj(source, label, valueObj){
    let target;
    if ('dcid' in valueObj) {
      target = Node.getNode(valueObj['dcid'], true);
    } else if ('value' in valueObj) {
      target = valueObj['value'];
    } else{
      console.log("Node has no 'dcid' or 'value' prop: " +  valueObj);
    }
    //console.log('Creating new Assertion');
    //console.log('src: ' + source.dcid + ', prop: ' + label + ', target: ' +
    //target.dcid +  ', prov: ' + valueObj['provenanceId']);
    Assertion.addAssertion(source, label, target,
      valueObj['provenanceId']);
    }

    static createInvAssertionFromValueObj(target, label, valueObj){
      let source;
      if ('dcid' in valueObj) {
        source = Node.getNode(valueObj['dcid'], true);
      } else{
        console.log("Node has no 'dcid' for inverse: " +  valueObj);
      }
      //console.log('Creating new Inv Assertion');
      //console.log('src: ' + source.dcid + ', prop: ' + label + ', target: ' +
      //target.dcid +  ', prov: ' + valueObj['provenanceId']);
      Assertion.addAssertion(source, label, target,
        valueObj['provenanceId']);
      }
}

function get_property_labels (dcid) {
  var node = Node.getNode(dcid, null);
  // use dictionary to create set
  var ans = {};
  var assertion = node.assertions;
  while (assertion) {
    ans[assertion.property] = 1;
    assertion = assertion.nextAssertion;
  }
  assertion = node.invAssertions;
  while (assertion) {
    ans[assertion.property] = 1;
    assertion = assertion.invNextAssertion;
  }
  return Object.keys(ans);
}

function get_property_values (dcid, property, out) {
  var node = Node.getNode(dcid, null);
  var ans = [];
  let assertion;
  if (out) {
    assertion = node.assertions;
    while (assertion) {
      if (assertion.property === property) ans.push(assertion.target);
      assertion = assertion.nextAssertion;
    }
  } else {
    assertion = node.invAssertions;
    while (assertion) {
      if (assertion.property === property) ans.push(assertion.source);
      assertion = assertion.invNextAssertion;
    }
  }
  return ans;
}

export function readFile(file){
  let curNode;
  const fileReader = new FileReader();

  fileReader.readAsText(file);
  return new Promise( (res,rej) => {
    fileReader.addEventListener("loadend", result => {
      console.log(result);
      console.log(fileReader.result);
      const lines = fileReader.result.split('\n');
      let curNode;
      for (const line of lines){
        console.log(line);
        curNode = parseLine(line, curNode);
        console.log(curNode);
      }
      res(Node.subjNodes);
    });
    fileReader.addEventListener('error', rej);
  });
}

function shouldReadLine(line){
  if (line.startsWith('#') || line.startsWith("//") || line.length === 0){
    return false;
  }
  return true;
}

function readPropLabel(line){
  let prop;
  let splitLineOnColon = line.split(':');
  if (splitLineOnColon.length < 2){
    console.log('Line does not contain colon: ' + line);
    // TODO change to MCF Syntax Error
    return prop;
  }
  prop = splitLineOnColon[0];
  return prop;
}

function readNodeValue(val){
  let node;
  if(val.split(':').length === 2 && val.split(':')[0] === 'dcid'){
    const dcid = val.split(':')[1];
    node = Node.getNode(dcid, true); //TODO might cause duplicate triples here by pushing to list
    return node;
  } else{
    console.log('Incorrect number of colons in node declaration: ' + val);
    // TODO change to MCF Syntax Error
    return node;
  }
}

function readPropValues(line){
  let values;
  let lineSplitOnColon = line.split(':');
  if (lineSplitOnColon.length < 2 || lineSplitOnColon[1] === ''){
    console.log('Line does not contain value: ' + line);
    // TODO change to MCF Syntax Error
    return values;
  }
  const splitValsByComma = lineSplitOnColon.slice(1).join(':').split(',');
  values = [];
  splitValsByComma.forEach( rawVal => {
    let val = rawVal.trim();
    if(val.includes(':')){
      val = readNodeValue(val);
      if (val) values.push(val);
    } else{
      values.push(val.replace(/"/g, ''));
    }
  });
  return values
}

function readDCID(line){
  let dcid;
  const lineSplitByColon = line.split(':');
  if (lineSplitByColon.length !== 3){
    console.log('Node declaration, incorrect num of colons: ' + line);
    return dcid;
  }
  return lineSplitByColon[lineSplitByColon.length -1].trim();
}

//TODO check for ill formatted lines!!
function parseLine(line, prevNode){
  let curNode;
  if( prevNode) curNode = prevNode;
  line = line.trim();
  if(shouldReadLine(line)){
    let prop = readPropLabel(line);
    if (!prop) return curNode;
    if (prop === 'Node'){
      let dcid = readDCID(line);
      if (!dcid) return curNode;
      curNode = Node.getNode(dcid, true);
      if (! (dcid in Node.subjNodes)){
        Node.subjNodes[dcid] = curNode;
      }
      return curNode;
    }
    let values = readPropValues(line);
    if (!values) return curNode;

    values.forEach(value => Assertion.addAssertion(curNode, prop, value,
      LOCAL_PROVENANCE));
    }
    return curNode;
  }

// store all local subject Node objects, dcid --> Node dictionary
Node.subjNodes = {};
export {Node, Assertion}

//TODO switch subjNodes to list, not set?
// Todo typeOf:schema:drug is causing too many colons error --> need to fix
