// node måste vara en node och erroMsg en sträng, printar bara om noden inte redan har en node
function printErrorMsg(node, errorMsg) {
    if (!node.hasChildNodes()) {
	let errorTxt = document.createTextNode(errorMsg);
	node.appendChild(errorTxt);
    }
}
