'use strict';
const socket = io();


let userCode = localStorage.getItem('code');

let dateCodes = [];

if (localStorage.getItem('dateCode0')) {
    dateCodes.push(localStorage.getItem('dateCode0'));
}

if (localStorage.getItem('dateCode1')) {
    dateCodes.push(localStorage.getItem('dateCode1'));
}

if (localStorage.getItem('dateCode2')) {
    dateCodes.push(localStorage.getItem('dateCode2'));
}



let alreadyPrinted = [];


socket.emit('getSharedContacts', userCode);

socket.on('sharedContactsResponse', function(sharedContacts) {
    for (let dateCode of dateCodes) {
	console.log("before check");
	console.log(sharedContacts);
	console.log(userCode);
	console.log(dateCodes);
	if (sharedContacts && sharedContacts.includes(dateCode)) {
	    console.log("after check");
	    createParagraph(dateCode);
	    alreadyPrinted.push(dateCode);
	}
    }
});

    
function resetLocal() {
    localStorage.removeItem('dateCode0');
    localStorage.removeItem('dateCode1');
    localStorage.removeItem('dateCode2');
}

function createParagraph(dateCode) {
    console.log("Printing " + dateCode);
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
