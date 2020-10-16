import * as API from './back-end/server-api.js';

let fileHash ='#';
/**
 * Sets the window hash value to query a given id.
 * @param {string} id The id of the desired node to display. This can be either
 *     a dcid or a local id.
 */
function goToId(id) {
  if(id.includes('dcid:')){
  window.location.hash = fileHash + '&dcid=' + id.replace('dcid:', '');
} else if (API.localNodeHashExists()){
  window.location.hash = fileHash + '&id=' + id;
} else{
  window.location.hash = fileHash + '&error=noLocalFiles';
}
}

/**
 * Sets the window hash value to empty to redirect user to home page.
 */
function goToHome() {
  console.log(fileHash)
  window.location.hash = fileHash;
}

function setFileHash(fileUrlList){
  fileHash = '#'
  for (const fileUrl of fileUrlList){
    fileHash += '&file=' + fileUrl;
  }
}

function openFile(fileUrl){
  if (!fileUrl.includes('&')){
    window.open(fileUrl);
    return;
  }

  window.open(fileUrl.split('&')[0]);
  const secondWindow = window.open(fileUrl.split('&')[1]);
  if(!secondWindow || secondWindow.closed || typeof secondWindow.closed=='undefined'){
    //POPUP BLOCKED
    alert('Tab blocked to open file:\n' + fileUrl.split('&')[1] + '\n\nEnable PopUps to open both .csv and .tmcf files!')
  }
}

export {goToId, goToHome, setFileHash, openFile};
