(this["webpackJsonpmcf-browser"]=this["webpackJsonpmcf-browser"]||[]).push([[0],{12:function(e,t,n){e.exports=n(19)},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(10),i=n.n(s),c=(n(17),n(4)),o=n(5),l=n(7),u=n(6),d=(n(8),n(1)),f=n.n(d),h=n(3),p=n(2),v="https://api.datacommons.org";function m(e){return b.apply(this,arguments)}function b(){return(b=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=v+"/node/property-labels?dcids="+t,e.abrupt("return",fetch(n).then((function(e){return e.json()})).then((function(e){return JSON.parse(e.payload)[t]})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e,t,n){return E.apply(this,arguments)}function E(){return(E=Object(p.a)(f.a.mark((function e(t,n,r){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=v+"/node/property-values?limit=500&dcids="+t+"&property="+n+"&direction="+(r?"in":"out"),e.abrupt("return",fetch(a).then((function(e){return e.json()})).then((function(e){return JSON.parse(e.payload)[t]})).then((function(e){return r?e.in:e.out})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){if(!("dcid"in e)&&!("value"in e))throw new Error("ERROR remote fetch no dcid or value prop: "+e);if("dcid"in e){var t=j.getNode(e.dcid);return t.setDCID(e.dcid),t.existsInKG=!0,t}return e.value}function g(e){return N.apply(this,arguments)}function N(){return(N=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=v+"/node/triples?dcids="+t+"&limit=1",e.abrupt("return",fetch(n).then((function(e){return e.json()})).then((function(e){return!!JSON.parse(e.payload)[t]})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){return!e.startsWith("//")&&0!==e.length&&!e.startsWith("#")}var j=function(){function e(t){Object(c.a)(this,e),this.localId=t,this.alreadyFetched=!1,this.existsInKG=!1,this.dcid=null,this.assertions=null,this.invAssertions=null}return Object(o.a)(e,[{key:"getRef",value:function(){var e=this.dcid?this.dcid:"",t="";return this.dcid&&this.dcid===this.localId||(t="[l:"+this.localId+"]"),[e,t].join(" ").trim()}},{key:"setDCID",value:function(t){var n=e.nodeHash[t];n&&n!=this&&this.mergeNode(n),this.dcid=t,e.nodeHash[t]=this}},{key:"mergeNode",value:function(e){var t=this;this.localId!==e.localId&&(e.getAssertions().forEach((function(e){e.src=t,e.nextAssertion=t.assertions,t.assertions=e})),e.getInvAssertions().forEach((function(e){e.target=t,e.invNextAssertion=t.invAssertions,t.invAssertions=e})))}},{key:"setExistsInKG",value:function(){var e=Object(p.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.dcid&&!this.existsInKG){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,g(this.dcid);case 4:this.existsInKG=e.sent;case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"createAssertionsFromLabels",value:function(){var t=Object(p.a)(f.a.mark((function t(n,r){var a,s,i,c=this;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=Object(h.a)(n),t.prev=1,i=f.a.mark((function t(){var n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.value,t.next=3,y(c.dcid,n,r).then((function(t){if(!t)throw new Error("No property values for dcid: "+c.dcid+" label: "+n);t.forEach((function(t){var a=w(t);if(r&&!e.isNode(a))throw new Error("Error creating assertion with non Node source");var s,i=r?a:c,o=r?c:a;if(r){var l,u=Object(h.a)(c.getInvAssertions());try{for(u.s();!(l=u.n()).done;){var d=l.value;d.src===i&&d.property===n&&d.provenance===t.provenanceId&&(s=!0)}}catch(m){u.e(m)}finally{u.f()}s||new O(i,n,o,t.provenanceId)}else{var f,p=Object(h.a)(c.getAssertions());try{for(p.s();!(f=p.n()).done;){var v=f.value;v.target===o&&v.property===n&&v.provenance===t.provenanceId&&(s=!0)}}catch(m){p.e(m)}finally{p.f()}s||new O(i,n,o,t.provenanceId)}}))}));case 3:case"end":return t.stop()}}),t)})),a.s();case 4:if((s=a.n()).done){t.next=8;break}return t.delegateYield(i(),"t0",6);case 6:t.next=4;break;case 8:t.next=13;break;case 10:t.prev=10,t.t1=t.catch(1),a.e(t.t1);case 13:return t.prev=13,a.f(),t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[1,10,13,16]])})));return function(e,n){return t.apply(this,arguments)}}()},{key:"fetchRemoteData",value:function(){var e=Object(p.a)(f.a.mark((function e(){var t=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.alreadyFetched&&this.dcid){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,m(this.dcid).then(function(){var e=Object(p.a)(f.a.mark((function e(n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.createAssertionsFromLabels(n.outLabels,!1);case 2:return e.next=4,t.createAssertionsFromLabels(n.inLabels,!0);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:this.alreadyFetched=!0;case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getAssertions",value:function(){for(var e=[],t=this.assertions;t;)e.push(t),t=t.nextAssertion;return e}},{key:"getInvAssertions",value:function(){for(var e=[],t=this.invAssertions;t;)e.push(t),t=t.invNextAssertion;return e}}],[{key:"isNode",value:function(t){return t instanceof e}},{key:"getNode",value:function(t){var n=e.nodeHash[t];if(n)return n;var r=new e(t);return e.nodeHash[t]=r,r}}]),e}();j.nodeHash={};var O=function e(t,n,r,a){Object(c.a)(this,e),this.src=t,this.property=n,this.provenance=a,this.target=r,this.nextAssertion=t.assertions,t.assertions=this,r instanceof Object&&(this.invNextAssertion=r.invAssertions,r.invAssertions=this)},x=["l","schema","dcs","dcid"],C=function(){function e(t){Object(c.a)(this,e),this.prov=t,this.curNode=null,this.lineNum=-1}return Object(o.a)(e,[{key:"parsePropValues",value:function(e){var t,n=[],r=Object(h.a)(e.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));try{for(r.s();!(t=r.n()).done;){var a=t.value,s=a.split(":")[0].trim();x.includes(s)?n.push({ns:s,ref:a.substring(a.indexOf(":")+1).trim()}):n.push(a.trim())}}catch(i){r.e(i)}finally{r.f()}return n}},{key:"setCurNode",value:function(t){if(1!==t.length)throw new Error("Error in declaring node (line "+this.lineNum+"): "+t.toString());var n=t[0],r="";if(t[0]instanceof Object){var a=t[0].ns;if("dcid"===a)r=t[0].ref,n="dcid:"+t[0].ref;else if(x.includes(a))throw new Error("Error with namespace in declaring node (line "+this.lineNum+"): namespace: "+t[0].ns)}this.curNode=j.getNode(n),r&&this.curNode.setDCID(r),e.localNodeHash[n]=this.curNode}},{key:"setCurNodeDCID",value:function(e){this.lineNum;if(!this.curNode)throw new Error("ERROR (line "+this.lineNum+"): current node must be set before setting dcid");if(1!==e.length)throw new Error("ERROR (line "+this.lineNum+"): a node can only have one dcid");if("string"!==typeof e[0])throw new Error("ERROR (line "+this.lineNum+"): dcid property must be a string, not a node reference");this.curNode.setDCID(e[0].replace(/"/g,""))}},{key:"createAssertionsFromParsedValues",value:function(e,t){var n,r=Object(h.a)(t);try{for(r.s();!(n=r.n()).done;){var a=n.value,s=a;a instanceof Object&&(s=j.getNode(a.ref),"l"!==a.ns&&s.setDCID(a.ref)),new O(this.curNode,e,s,this.prov)}}catch(i){r.e(i)}finally{r.f()}}},{key:"parseLine",value:function(e){if(k(e=e.trim())){if(!e.includes(":"))throw new Error("Error, line "+this.lineNum+' does not contain ":"');var t=e.split(":",1)[0].trim(),n=e.substring(e.indexOf(":")+1);if(!t||!n)throw new Error("Error, (line "+this.lineNum+"): "+e);var r=this.parsePropValues(n);switch(t){case"Node":this.setCurNode(r);break;case"dcid":this.setCurNodeDCID(r);break;default:this.createAssertionsFromParsedValues(t,r)}}}},{key:"parseMcfStr",value:function(t){var n=this,r=t.split("\n");return this.lineNum=1,r.forEach((function(e){n.parseLine(e),n.lineNum++})),e.localNodeHash}}],[{key:"readFile",value:function(t){var n=new FileReader;return n.readAsText(t),new Promise((function(r,a){n.addEventListener("loadend",(function(a){var s=new e(t.name);r(s.parseMcfStr(n.result))})),n.addEventListener("error",a)}))}}]),e}();C.localNodeHash={};var I=n(11);function A(e){return e.includes("->")?e.split("->")[1]:null}function S(e){var t=e.match("E:(.*)->(.*)");return t?t[0]:null}function L(e,t){return e?e.replace("->","_").replace("E:","")+"_R"+t:null}function R(e,t,n){var r,a=[],s=Object(h.a)(e.split(","));try{for(s.s();!(r=s.n()).done;){var i=r.value,c=i,o=S(i);if(o){var l="l:"+L(o,n);c=c.replace(o,l)}else{var u=A(i);c=c.replace(/C:(.*)->(.*)/,t[u])}a.push(c)}}catch(d){s.e(d)}finally{s.f()}return a.join(",")}function F(e,t,n){var r,a=[],s=Object(h.a)(e.split("\n"));try{for(s.s();!(r=s.n()).done;){var i=r.value;if(i.trim()){if(k(i)){var c=i.split(":")[0].trim(),o=i.replace(c+":","").trim();if("Node"===c){if(o.includes(","))throw new Error("cannot have multiple ids for Node declaration");var l=o,u=S(o);u&&(l=L(u,n)),a.push(c+": "+l)}else{var d=R(o,t,n);a.push(c+": "+d)}}}else a.push("")}}catch(f){s.e(f)}finally{s.f()}return a.join("\n")}function D(e,t){var n,r=1,a=[],s=Object(h.a)(t);try{for(s.s();!(n=s.n()).done;){var i=n.value;a.push(F(e,i,r)),r+=1}}catch(c){s.e(c)}finally{s.f()}return a.join("\n")}function H(e,t){return P.apply(this,arguments)}function P(){return(P=Object(p.a)(f.a.mark((function e(t,n){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FileReader).readAsText(n),e.abrupt("return",new Promise((function(e,a){r.addEventListener("loadend",(function(a){I().fromString(r.result).then((function(r){console.log("csvFile: "+n.name);var a=D(t,r);e(a)}))})),r.addEventListener("error",a)})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e){return U.apply(this,arguments)}function U(){return(U=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FileReader).readAsText(t),e.abrupt("return",new Promise((function(e,t){n.addEventListener("loadend",(function(t){e(n.result)})),n.addEventListener("error",t)})));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function G(e,t){return K.apply(this,arguments)}function K(){return(K=Object(p.a)(f.a.mark((function e(t,n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",M(t).then((function(e){return H(e,n)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(p.a)(f.a.mark((function e(t){var n,r,a,s,i,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=Object(h.a)(t);try{for(s.s();!(i=s.n()).done;)(c=i.value).name.endsWith(".tmcf")?n=c:c.name.endsWith(".csv")?r=c:a=c}catch(o){s.e(o)}finally{s.f()}if(!a){e.next=4;break}return e.abrupt("return",C.readFile(a).then((function(e){return Object.keys(e)})));case 4:if(!n||!r){e.next=6;break}return e.abrupt("return",G(n,r).then((function(e){return console.log(e),new C(n.name+"&"+r.name).parseMcfStr(e)})).then((function(e){return Object.keys(e)})));case 6:return e.abrupt("return",[]);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e,t){var n=j.getNode(e);return t&&!n.dcid&&n.setDCID(e),console.log("retrieve"),console.log(n),n}function J(e){return j.isNode(e)}function W(e){return q.apply(this,arguments)}function q(){return(q=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",null);case 2:if(!t.existsInKG){e.next=4;break}return e.abrupt("return","blue");case 4:return e.abrupt("return",t.setExistsInKG().then((function(){return t.existsInKG?"blue":!t.dcid&&t.localId&&t.localId in C.localNodeHash?"purple":t.dcid||t.localId in C.localNodeHash?"red":"orange"})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var _="#";function B(e){e.includes("dcid:")?window.location.hash=_+"&dcid="+e.replace("dcid:",""):C.localNodeHash?window.location.hash=_+"&id="+e:window.location.hash=_+"&error=noLocalFiles"}function X(e){if(e.includes("&")){window.open(e.split("&")[0]);var t=window.open(e.split("&")[1]);t&&!t.closed&&"undefined"!=typeof t.closed||alert("Tab blocked to open file:\n"+e.split("&")[1]+"\n\nEnable PopUps to open both .csv and .tmcf files!")}else window.open(e)}var Y=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"handleSearch",value:function(e){13===e.keyCode&&B(e.target.value)}},{key:"render",value:function(){return a.a.createElement("div",{className:"header"},a.a.createElement("button",{onClick:function(){return console.log(_),void(window.location.hash=_)}},"Return Home"),a.a.createElement("input",{type:"search",onKeyUp:this.handleSearch,placeholder:"Search id, use 'dcid:' namespace for remote lookup..."}))}}]),n}(r.Component);function $(e){return z.apply(this,arguments)}function z(){return(z=Object(p.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!J(t)){e.next=5;break}return e.next=3,W(t);case 3:return n=e.sent,e.abrupt("return",a.a.createElement("td",null,a.a.createElement("p",{id:n,className:"clickable",onClick:function(){return B(t.localId)}},t.getRef())));case 5:return e.abrupt("return",a.a.createElement("td",null,t));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e,t){e?B(t):X(t)}function Z(e,t,n){return ee.apply(this,arguments)}function ee(){return(ee=Object(p.a)(f.a.mark((function e(t,n,r){var s,i,c,o,l,u,d,p,v;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=n?t.src:t.target,e.next=3,$(s);case 3:if(i=e.sent,o="black",(l=t.provenance).startsWith("https")){c="bold",o="",u=[],d=Object(h.a)(l.split("&"));try{for(d.s();!(p=d.n()).done;)v=p.value,u.push(v.split("/").pop())}catch(f){d.e(f)}finally{d.f()}l=u.join(", ")}return e.abrupt("return",a.a.createElement("tr",{className:c,key:t.property+r},a.a.createElement("td",null,t.property),i,a.a.createElement("td",null,a.a.createElement("p",{id:o,className:"clickable",onClick:function(){return Q(o,t.provenance)}},l))));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function te(){return(te=Object(p.a)(f.a.mark((function e(t,n){var r,a,s,i,c,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[],a=0,s=Object(h.a)(t),e.prev=3,s.s();case 5:if((i=s.n()).done){e.next=14;break}return c=i.value,e.next=9,Z(c,n,a);case 9:o=e.sent,r.push(o),a+=1;case 12:e.next=5;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(3),s.e(e.t0);case 19:return e.prev=19,s.f(),e.finish(19);case 22:return e.abrupt("return",r);case 23:case"end":return e.stop()}}),e,null,[[3,16,19,22]])})))).apply(this,arguments)}var ne=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={tableRows:null,loading:!0},r}return Object(o.a)(n,[{key:"componentDidUpdate",value:function(e){var t=this;e.triples!==this.props.triples&&(this.setState({loading:!0}),function(e,t){return te.apply(this,arguments)}(this.props.triples,this.props.inverse).then((function(e){t.setState({tableRows:e,loading:!1})})))}},{key:"render",value:function(){if(this.state.loading)return null;var e=this.props.inverse?a.a.createElement("tr",null,a.a.createElement("th",null,"Property"),a.a.createElement("th",null,"Source"),a.a.createElement("th",null,"Provenance")):a.a.createElement("tr",null,a.a.createElement("th",null,"Property"),a.a.createElement("th",null,"Target"),a.a.createElement("th",null,"Provenance"));return a.a.createElement("table",null,a.a.createElement("thead",null,e),a.a.createElement("tbody",null,this.state.tableRows))}}]),n}(r.Component),re=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={ref:null,asserts:[],invAsserts:[],fetching:!0},r}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.setNodeData()}},{key:"componentDidUpdate",value:function(e){e.node!==this.props.node&&this.setNodeData()}},{key:"setNodeData",value:function(){var e=this;console.log(this.props.node);var t=this.props.node;this.setState({ref:t.getRef(),fetching:!0}),W(t).then((function(t){return e.setState({elemId:t})})),t.fetchRemoteData().then((function(){e.setState({fetching:!1});var n=t.getAssertions();e.setState({asserts:n});var r=t.getInvAssertions();e.setState({invAsserts:r})}))}},{key:"render",value:function(){var e;return e=this.state.fetching?a.a.createElement("div",{className:"div-col"},a.a.createElement("br",null),a.a.createElement("div",{className:"loadingSpinner"}),a.a.createElement("h2",null,"...fetching triples...")):a.a.createElement("div",{className:"node"},a.a.createElement("h3",{className:"inline"},"Assertions"),a.a.createElement("p",{className:"inline"}," - current node is source"),a.a.createElement(ne,{triples:this.state.asserts,inverse:!1}),a.a.createElement("br",null),a.a.createElement("h3",{className:"inline"},"Inverse Assertions"),a.a.createElement("p",{className:"inline"}," - current node is target"),a.a.createElement(ne,{triples:this.state.invAsserts,inverse:!0})),a.a.createElement("div",null,a.a.createElement("p",{className:"inline"}," | "),a.a.createElement("p",{className:"inline",id:"blue"},"Node has dcid that exists in DC KG"),a.a.createElement("p",{className:"inline"}," | "),a.a.createElement("p",{className:"inline",id:"purple"},"Node has resolved local reference and no dcid"),a.a.createElement("p",{className:"inline"}," | "),a.a.createElement("p",{className:"inline",id:"orange"},"Node has unresolved local reference and no dcid"),a.a.createElement("p",{className:"inline"}," | "),a.a.createElement("p",{className:"inline",id:"red"},"Default; Node has dcid which does not exist in DC KG"),a.a.createElement("p",{className:"inline"}," | "),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("h1",{className:"inline"},"Currently Viewing: "),a.a.createElement("h1",{className:"inline",id:this.state.elemId},this.state.ref),a.a.createElement("br",null),e)}}]),n}(r.Component),ae=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={subjNodes:[],curNode:null,fileList:[],loading:null,fileHash:"",firstLoad:!0,searchErrMsg:""},r}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("hashchange",(function(){return e.handleHashChange()}),!1),this.state.firstLoad&&(console.log("first app load"),this.loadUrlFiles(),this.setState({firstLoad:!1}))}},{key:"loadUrlFiles",value:function(){var e=new URLSearchParams(window.location.hash.split("#")[1]),t=e.getAll("file");if(t.length){var n;this.loadRemoteFiles(0,t),function(e){_="#";var t,n=Object(h.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;_+="&file="+r}}catch(a){n.e(a)}finally{n.f()}}(t);var r=e.get("dcid");r&&(n=V(r,!0),this.setState({curNode:n}),console.log(n))}}},{key:"handleHashChange",value:function(){var e=new URLSearchParams(window.location.hash.split("#")[1]),t=e.get("id"),n=!1;t||(t=e.get("dcid"),n=!0);var r=null;t&&(r=V(t,n)),this.setState({curNode:r});var a=e.get("error");console.log(a);var s="";"noLocalFiles"===a?(console.log("errMsg"),s="Use dcid namespace if searching for remote node or load a file to search for a local id."):a&&(s="Error occured in search. Verify node you are trying to find."),this.setState({searchErrMsg:s})}},{key:"loadRemoteFiles",value:function(e,t){var n=this;if(e>=t.length)this.submitFileList();else{var r=new XMLHttpRequest;r.responseType="blob",r.open("GET",t[e]),console.log("loading: "+t[e]),r.onload=function(){console.log("finished loading"),console.log(r.response);new URL(t[e]);r.response.name=t[e],console.log(r.response.name),n.setState({fileList:n.state.fileList.concat(r.response)}),n.loadRemoteFiles(e+1,t)},r.send()}}},{key:"submitFileList",value:function(){var e=this;this.setState({loading:a.a.createElement("div",null,a.a.createElement("div",{className:"loadingSpinner"}),a.a.createElement("h2",null,"...loading mcf..."))}),function(e){return T.apply(this,arguments)}(this.state.fileList).then((function(t){e.setState({subjNodes:t,loading:null}),e.handleHashChange()}))}},{key:"onClearPress",value:function(){this.setState({subjNodes:[],fileList:[],loading:null}),j.nodeHash={},C.localNodeHash={}}},{key:"render",value:function(){var e,t=this;return e=this.state.curNode?a.a.createElement(re,{node:this.state.curNode}):a.a.createElement("div",{className:"Home"},a.a.createElement("h3",null,this.state.searchErrMsg),a.a.createElement("div",{className:"div-row"},a.a.createElement("div",{id:"curFiles"},a.a.createElement("h3",null,"Current Files:"),a.a.createElement("ul",null,this.state.fileList.map((function(e){return a.a.createElement("li",{className:"clickable",onClick:function(){return X(e.name)},key:e.name},e.name)}))),a.a.createElement("br",null),a.a.createElement("button",{onClick:function(){return t.onClearPress()}},"Clear"),a.a.createElement("br",null),a.a.createElement("h3",null,"Subject Nodes:"),a.a.createElement("ul",null,this.state.subjNodes.map((function(e){return a.a.createElement("li",{className:"clickable",key:e,onClick:function(){return B(e)}},e)}))),this.state.loading),a.a.createElement("div",{id:"uploadFiles"},a.a.createElement("h3",null,"Upload one MCF file or one set of TMCF+CSV files to preview in Data Commons."),a.a.createElement("div",null,a.a.createElement("input",{id:"file-select",onChange:function(e){t.setState({fileList:t.state.fileList.concat(Array.from(e.target.files))})},type:"file",name:"UploadFile",accept:".mcf,.tmcf,.csv",required:!0,multiple:!0}),a.a.createElement("button",{onClick:function(){return t.submitFileList()}},"Submit"))))),a.a.createElement("div",{className:"App"},a.a.createElement(Y,null),e)}}]),n}(r.Component);i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ae,null)),document.getElementById("root"))},8:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.a3027592.chunk.js.map