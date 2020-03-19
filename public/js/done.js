'use strict';
const socket = io();


let userCode = localStorage.getItem('code');

let dateCodes = JSON.parse(localStorage.getItem('dateCodes'));

let alreadyPrinted = [];

socket.emit('getSharedContacts', userCode);

socket.on('sharedContactsResponse', function(sharedContacts) {
    for (let dateCode of dateCodes) {
	console.log("before check");
	console.log(sharedContacts);
	console.log(userCode);
	console.log(dateCodes);
	console.log(sharedContacts.includes(dateCode.toString()));
	if (checkSharedContacts(sharedContacts, dateCode.toString())) {
	    console.log("after check");
	    createParagraph(dateCode);
	    alreadyPrinted.push(dateCode);
	}
    }
});

function checkSharedContacts(sharedContacts, dateCode) {
    return (sharedContacts && sharedContacts.includes(dateCode) && !alreadyPrinted.includes(dateCode));
} 
    
function createParagraph(dateCode) { 
    console.log("Printing " + dateCode);
    
    let div = document.getElementById('sharedContacts');

    let container = document.createElement('div');
    container.setAttribute("class", "shareContactContainer");
    let nParagraph = document.createElement('p');
    let pParagraph = document.createElement('p');
    nParagraph.setAttribute("class", "shareContactText");
    pParagraph.setAttribute("class", "shareContactText");

    socket.emit('getUserData', dateCode);

    socket.on('userDataResponse', function(user) {

	let name = document.createTextNode(user["profile"]["name"]);
	let phonenr = document.createTextNode("Telefonnummer: " + user["profile"]["phoneNr"]);

	nParagraph.appendChild(name);
	pParagraph.appendChild(phonenr);
	container.appendChild(nParagraph);
	container.appendChild(pParagraph);
	div.appendChild(container);
    });
    
    
}

/*
socket.emit('getDateCodes', userCode);

socket.on('dateCodeResponse', function(dateCodes) {

    let sharedContactsDiv = document.getElementById('sharedContacts');
    
    for (let dateCode of dateCodes) {
	socket.emit('getSharedContacts', dateCode);

	console.log(dateCode);

	socket.on('sharedContactsResponse', function(sharedContacts) {
	    console.log(sharedContacts);
	    
	    let intUserCode = parseInt(userCode, 10);
	    console.log(sharedContacts.includes(intUserCode));
	    if (sharedContacts.includes(intUserCode)) {
		console.log("hej");
		socket.emit('getUserData', dateCode);

		socket.on('userDataResponse', function(userData) {
		    
		    let paragraph = document.createElement('p');
		    let text = document.createTextNode(userData["profile"]["name"] + " vill dela kontakt med dig. Telefonnummer: " + userData["profile"]["phoneNr"]);

		    paragraph.appendChild(text);
		    sharedContactsDiv.appendChild(paragraph);

		    console.log(userData["profile"]["name"]);
		});

		
	    }
	});
	
    }
});

*/
