import {Node} from './graph.js';
import {ParseMcf} from './parse-mcf.js';
import * as ParseTMCF from './parse-tmcf.js';

/**
 * Parses App state's fileList to find either one mcf file or one set of
 * tmcf+csv. Parses the files according to their file type.
 * @param {Array<FileBlob>} fileList The list of files to load into memory.
 * @return {Array<string>} An array of local ids from Node.nodeLocalHash.
 */
async function readFileList(fileList) {
  let tmcfFile;
  let csvFile;
  let mcfFile;
  for (const file of fileList) {
    if (file.name.endsWith('.tmcf')) {
      tmcfFile = file;
    } else if (file.name.endsWith('.csv')) {
      csvFile = file;
    } else {
      mcfFile = file;
    }
  }

  if (mcfFile) {
    return ParseMcf.readFile(mcfFile).then((localHash) =>
                                               Object.keys(localHash));
  }

  if (tmcfFile && csvFile) {
    return ParseTMCF.tmcfCSVToMCF(tmcfFile, csvFile)
        .then((mcf) => {
          console.log(mcf);
          const mcfParser = new ParseMcf(tmcfFile.name + '&' + csvFile.name);
          return mcfParser.parseMcfStr(mcf);
        })
        .then((localHash) => Object.keys(localHash));
  }
  return [];
}

function clearFiles() {
  Node.nodeHash = {};
  ParseMcf.localNodeHash = {};
}

function retrieveNode(id, shouldCreateRemote) {
  const foundNode = Node.getNode(id);
  // should make dcid from search bar
  if (shouldCreateRemote && !(foundNode.dcid)) {
    foundNode.setDCID(id);
  }
  console.log('retrieve');
  console.log(foundNode);
  return foundNode;
}

function isNodeObj(obj) { return Node.isNode(obj); }

async function getElemId(target) {
  if (!target) {
    return null;
  }
  if (target.existsInKG) {
    return 'blue';
  }

  return target.setExistsInKG().then(() => {
    if (target.existsInKG) {
      return 'blue';
    }

    if (!target.dcid && target.localId &&
        target.localId in ParseMcf.localNodeHash) {
      return 'purple';
    }

    if (!target.dcid && !(target.localId in ParseMcf.localNodeHash)) {
      return 'orange';
    }
    return 'red';
  });
}

function localNodeHashExists() {
  return (ParseMcf.localNodeHash) ? true : false;
}
export {
  readFileList,
  clearFiles,
  retrieveNode,
  isNodeObj,
  getElemId,
  localNodeHashExists,
};
