'use strict';
const socket = io();

let userCode = localStorage.getItem('code');

let alreadyPrinted = [];

socket.emit('getSharedContacts', userCode);

socket.on('sharedContactsResponse', function(code, sharedContacts) {
    if (userCode == code) {
	let dateCodes = JSON.parse(localStorage.getItem('dateCodes'));
	for (let dateCode in dateCodes) {
	    if (checkSharedContacts(sharedContacts, dateCodes[dateCode].toString())) {
		createParagraph(dateCodes[dateCode], dateCode);
		alreadyPrinted.push(dateCodes[dateCode]);
	    } else {
		console.log("sharedContacts is null or already printed");
	    }
	}
    }
});

function checkSharedContacts(sharedContacts, dateCode) {
    return (sharedContacts && sharedContacts.includes(dateCode) && !alreadyPrinted.includes(dateCode));
} 
    
function createParagraph(dateCode, index) { 
    let div = document.getElementById('sharedContacts');

    let container = document.createElement('div');
    container.setAttribute("class", "shareContactContainer");
    let nParagraph = document.createElement('p');
    let pParagraph = document.createElement('p');
    nParagraph.setAttribute("class", "shareContactText");
    pParagraph.setAttribute("class", "shareContactText");

    socket.emit('getUserData2', dateCode, index);

    socket.on('userDataResponse2', function(user, returnIndex) {
	if (index == returnIndex) {
	    let name = document.createTextNode(user["profile"]["name"]);
	    let phonenr = document.createTextNode("Telefonnummer: " + user["profile"]["phoneNr"]);

	    nParagraph.appendChild(name);
	    pParagraph.appendChild(phonenr);
	    container.appendChild(nParagraph);
	    container.appendChild(pParagraph);
	    div.appendChild(container);
	}
    });
}
