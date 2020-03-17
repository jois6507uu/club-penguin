'use strict';
const socket = io();


let userCode = localStorage.getItem('code')

socket.emit('getDateCodes', userCode);

socket.on('dateCodeResponse', function(dateCodes) {

    let sharedContactsDiv = document.getElementById('sharedContacts');
    
    for (let dateCode of dateCodes) {
	socket.emit('getSharedContacts', dateCode);

	console.log(dateCode);

	socket.on('sharedContactsResponse', function(sharedContacts) {
	    console.log(sharedContacts);
	    if (sharedContacts.includes(userCode)) {
		
		socket.emit('getUserData', dateCode);

		socket.on('userDataResponse', function(userData) {
		    let paragraph = document.createElement('p');
		    let text = document.createTextNode(userData["profile"]["name"] + "vill dela kontakt med dig. Telefonnummer: " + userData["profile"]["phoneNr"]);

		    paragraph.appendChild(text);
		    sharedContactsDiv.appendChild(paragraph);

		    console.log(userData["profile"]["name"]);
		});

		
	    }
	});
	
    }
});
