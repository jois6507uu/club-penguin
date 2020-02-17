// node måste vara en node och erroMsg en sträng, noden ska bara ha ett eller noll barn
function printErrorMsg(node, errorMsg) {
    if (node.hasChildNodes()) {
	node.removeChild(node.childNodes[0]);
    }
    let errorTxt = document.createTextNode(errorMsg);
    node.appendChild(errorTxt);
}
