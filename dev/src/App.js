import React, {Component} from 'react';
import './App.css';
import * as API from './back-end/server-api.js';
import * as utils from './utils.js';
import {Header} from './Header.js';
import DisplayNode from './DisplayNode.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjNodes: [],
      curNode: null,
      fileList: [],
      loading: null,
      fileHash: '',
      firstLoad: true,
      searchErrMsg: '',
    };
  }
  /** Adds an event listener to the window to respond to url hash changes. */
  componentDidMount() {
    window.addEventListener('hashchange', () => this.handleHashChange(), false);
    if(this.state.firstLoad){
      console.log('first app load')
      this.loadUrlFiles();
      this.setState({firstLoad:false});
    }
  }

  loadUrlFiles(){
    const params = new URLSearchParams(window.location.hash.split('#')[1]);

    // get path to file(s) from urls
    const fileUrls = params.getAll('file');
    if (!fileUrls.length) return;

    this.loadRemoteFiles(0, fileUrls);

    utils.setFileHash(fileUrls);

    // get node to display from url
    let node;
    const searchDCId = params.get('dcid');
    if (searchDCId) {
       node = API.retrieveNode(searchDCId, /* shouldCreateRemote */ true);
     this.setState({curNode: node});
      console.log(node)
    }

  }

  /**
   * Sets App state according to url parameters 'id' and 'file'. The param 'id'
   * will cause the display node page to appear with the node of the specified
   * id. The 'file' param followed by url to a file will cause that file to be
   * loaded and parsed if it is one url to mcf or two 'file' params with one a
   * url to a tmcf and the other a url to a csv file.
   */
  handleHashChange() {
    const params = new URLSearchParams(window.location.hash.split('#')[1]);
    // get node to display from url

    let searchId = params.get('id');
    let shouldCreateRemote = false;
    if (!searchId) {
      searchId = params.get('dcid');
      shouldCreateRemote = true;
    }

    let node = null;
    if (searchId) {
       node = API.retrieveNode(searchId, shouldCreateRemote);
    }
    this.setState({curNode: node});

    const err = params.get('error');
    console.log(err)
    let errMsg = '';
    if( err === 'noLocalFiles'){
      console.log('errMsg')
       errMsg = 'Use dcid namespace if searching for remote node or '
        + 'load a file to search for a local id.'
    } else if(err){
      errMsg = 'Error occured in search. Verify node you are trying to find.'
    }
    this.setState({searchErrMsg: errMsg});
  }

  /**
   * Gets a remote file from an Array of urls at index i and appends the
   * retrieved file to App state's fileList. This is a recursive method that
   * calls itself to iterate through the entire Array of fileUrls.
   * @param {number} i The index of the url to get from fileUrls array.
   * @param {Array<string>} fileUrls The array of file urls to load and append
   *     to App state's fileList.
   */
  loadRemoteFiles(i, fileUrls) {
    if (i >= fileUrls.length) {
      this.submitFileList();
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.open('GET', fileUrls[i]);
    console.log('loading: ' + fileUrls[i]);
    xhr.onload = () => {
      console.log('finished loading');
      console.log(xhr.response);
      const fileUrl = new URL(fileUrls[i])
      xhr.response.name=fileUrls[i];
      console.log(xhr.response.name)
      this.setState({fileList: this.state.fileList.concat(xhr.response)});
      this.loadRemoteFiles(i+1, fileUrls);
    };
    xhr.send();
  }

  /**
   * Passes App state's fileList array to the 'back-end' API to be parsed and
   * the files loaded into memory.
   */
  submitFileList() {
    this.setState({loading: (
      <div>
        <div className='loadingSpinner'></div>
        <h2>...loading mcf...</h2>
      </div>)});

    API.readFileList(this.state.fileList)
        .then( (subjList) => {
          this.setState({subjNodes: subjList, loading: null})
          this.handleHashChange();
        });
  }

  /**
   * Clear App state and calls the 'back-end' API clearFiles method.
   */
  onClearPress() {
    this.setState({subjNodes: [], fileList: [], loading: null});
    API.clearFiles();
  }
  /** Renders the browser by displaying a specific node or the homepage. */
  render() {

    let display;
    if (this.state.curNode) {
      display =  (
      	<DisplayNode node={this.state.curNode} />
      );
    } else{
      display = (
        <div className='Home'>
        <h3>{this.state.searchErrMsg}</h3>
        <div className='div-row'>

          <div id='curFiles'>
          <h3>Current Files:</h3>
          <ul >{this.state.fileList.map( (file) =>
            <li className='clickable' onClick={()=>utils.openFile(file.name)} key={file.name}>{file.name}</li>,
          )}</ul>
          <br></br>
          <button onClick={() => this.onClearPress()} >Clear</button>
          <br></br>
          <h3>Subject Nodes:</h3>
          <ul>{this.state.subjNodes.map( (dcid) =>
            <li className='clickable' key={dcid} onClick={() => utils.goToId(dcid)}>{dcid}</li>,
          )}</ul>
          {this.state.loading}
      </div>

          <div id='uploadFiles'>
            <h3>Upload one MCF file or one set of TMCF+CSV files to preview in Data Commons.</h3>
            <div>
          <input id="file-select" onChange={ (event) =>{
              this.setState({fileList: this.state.fileList.concat(Array.from(event.target.files))})
            } }
            type="file" name="UploadFile" accept=".mcf,.tmcf,.csv" required multiple />
            <button onClick={() => this.submitFileList()} >Submit</button>
            </div>
          </div>
              </div>
        </div>
      )
    }

    return (
      <div className="App">
        <Header />
        {display}
      </div>

    );
  }
}
export default App;
