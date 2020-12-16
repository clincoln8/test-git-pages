# Local MCF Browser

This web application overlays data from local MCF or TMCF+CSV files onto the Data Commons Knowledge Graph (DC KG) in order to preview the data without needing access to write to the graph.

Try it out now: https://datacommonsorg.github.io/tools/mcf-browser/

### Features
  - Directly upload one MCF file or one pair of TMCF+CSV files or specify URL(s) for the file(s).
  - Navigate the nodes from the local file data and the Data Commons KG.
  - Search by local or dcid IDs.
  - Color coding indicates if a node exists in the Data Commons KG and alerts user of potential errors.
  
### How to Use
  - Directly upload one MCF file or one pair of TMCF+CSV files by clicking the button 'Choose files' in the upper left corner.
  - -OR-
  - Refer to file by their url by adding '&file=' parameters to 'https://datacommonsorg.github.io/tools/mcf-browser/#'
    - For example: https://datacommonsorg.github.io/tools/mcf-browser/#&file=https://raw.githubusercontent.com/clincoln8/test-git-pages/master/main-test.mcf
  - Once files are loaded, click a displayed node to view it or use the search bar to search for a local id or dcid (include the namespace 'l' if you are looking for a local id)
  - Once viewing a single node, click other nodes to navigate the graph or return Home to see the list of subject nodes again. 

### Design

The files responsible for this application are split into two sections: front-end and back-end. The front-end files, found in `/src/`, use React to implement the user interface. The back-end files, found in `/src/back-end`, serve as the functional implementation of the tool by creating a local version of the Data Commons KG within the browser and incorporates the local data parsed from the passed in files.

##### Back-end
<insert general descriptuon of backend flow>

Brief description of each file:
  - graph.js - Contains the implementation of the Node and Assertion classes. Each node represents a single entity within the Data Commons KG and each Assertion represents a triple by storing a source (Node), property(Text), and target(Node or Text).
  - parse-mcf.js - Implements the ParseMcf class which parses an MCF file and creates a local Knowledge Graph using the Node and Assertion classes.
  - parse-tmcf.js - Implements the ParseTmcf class which creates a template string from one TMCF file and fills in the template based on each row of a given CSV file to create an MCF String.
  - utils.js - Contains various helper functions, including those used to query the Data Commons KG.
  - server-api.js - Acts as a wrapper for the functions needed by the front-end so that only this file is imported into the front-end files.

##### Front-end
<insert general descriptuon of backend flow>
The front end has the starting point: index.js created with create react app

Brief description of each JSX file:
  - App.jsx - Maintains the overall state of the application, including loaded files and which node should be displayed. Renders the Header component followed by DisplayNode if a node has been selected by the user and Home otherwise.
  - Header.jsx - Displays the header containing the 'Return Home' button and search bar.
  - Home.jsx - If no files have been indicated by user, displays file entry options. Otherwise, displays the currently loaded files and their subject nodes.
  - DisplayNode.jsx - Retrieves data for a given dcid from the back-end and displays the triples associated with the node via TriplesTable components.
  - TriplesTable.jsx - Renders a table where each row represents a triple from a given list of Assertions.

### Testing

The back-end is tested using npm test....

Test a local version of the tool with npm start...
