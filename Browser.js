//const { ParseMCF } = require('./ParseMCF');

//const localDCIDs = ParseMCF.readFile('./test.mcf');
import * as API from './GraphNode.js';
//import ReactDOM from "react-dom";
//import React from "react";

//let d = new Date();

//ReactDOM.render(//
  //   <h2>browser</h2> , document.getElementById('root')
  // );
let fileList;
let subjectNodes;
console.log('yee1');
//window.addEventListener('load', console.log('yee2')  )
const fileSelect = document.getElementById('file-select');
fileSelect.addEventListener('change', (event) => {
  fileList = event.target.files;
  console.log(fileList);
});
const submitButton = document.getElementById('submitFile');

submitButton.addEventListener('click', (event) => {
  console.log('parse file!');
  API.readFile(fileList[0]).then( subjList => {
    subjectNodes = subjList;
    console.log(subjectNodes);
    console.log(API.Node.nodeHash);
    displaySubjectNodes();

   });
});


const displaySubjectNodes = () => {
  const listElement = document.createElement('ul');
  document.getElementById('test').appendChild(listElement);
  for (const subj of Object.keys(subjectNodes)) {
    const listItem = document.createElement('li');
    listItem.innerHTML = subj;
    listItem.onclick = function(){
      displayNode(this.innerHTML);
    }
    listElement.appendChild(listItem);

  }
}
let tableElement;
const displayNode = dcid => {
  const container = document.getElementById('test');
  while(container.firstChild){
  container.removeChild(container.firstChild);
}
  tableElement = document.createElement('table');
  container.appendChild(tableElement);
  const tableHeadersElement = document.createElement('tr');
  const col1Element = document.createElement('th');
  const col2Element = document.createElement('th');
  const col3Element = document.createElement('th');
  col1Element.innerHTML = 'property';
  col2Element.innerHTML = 'value';
  col3Element.innerHTML = 'provenance';
  tableElement.appendChild(tableHeadersElement);
  tableHeadersElement.appendChild(col1Element);
  tableHeadersElement.appendChild(col2Element);
  tableHeadersElement.appendChild(col3Element);
  displayNodeData(dcid);
  console.log('display ' + dcid);
}

function displayNodeData(dcid){
  let curNode = API.Node.getNode(dcid, false);
  //dcidURL = dcid;
  //window.location.href = window.location.hostname + '/' + dcid;
  console.log(API.Node.nodeHash);
  console.log(curNode);
  API.fetchRemoteData(curNode, false).then( () => {
      let assert = curNode.assertions;
      while(assert){
        const rowElement = document.createElement('tr');
        const propElement = document.createElement('td');
        propElement.innerHTML = assert.property;
        rowElement.appendChild(propElement);

        const valElement = document.createElement('td');
        if(API.Node.isNode(assert.target)){
          valElement.innerHTML = assert.target.dcid;
          valElement.onclick =  function(){
            displayNode(this.innerHTML);
          }
        } else{
          valElement.innerHTML = assert.target;
        }
        rowElement.appendChild(valElement);

        const provElement = document.createElement('td');
        provElement.innerHTML = assert.provenance;
        rowElement.appendChild(provElement);

        tableElement.appendChild(rowElement);
        assert = assert.nextAssertion;
}

  })
  }
