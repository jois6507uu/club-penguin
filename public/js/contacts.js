'use strict';
const socket = io();

function onLoad() {
    let labels = document.getElementsByClassName('label');

    let label1 = labels[0];
    let label2 = labels[1];
    let label3 = labels[2];
    
    let userCode = localStorage.getItem('code');

    socket.emit('getDateCodes', userCode);

    socket.on('dateCodeResponse', function(dateCodes) {
	console.log(dateCodes);

	if (dateCodes[0]) {
	    socket.emit('getUserName', dateCodes[0]);
	    
	    socket.on('userNameResponse', function(name) {
		label1.textContent = "Vill du dela din kontaktinformation med " + name + "?";
	    });

	}

	if (dateCodes[1]) {
	    socket.emit('getUserName', dateCodes[1]);
	    
	    socket.on('userNameResponse', function(name) {
		label2.textContent = "Vill du dela din kontaktinformation med " + name + "?";
	    });
	}

	if (dateCodes[2]) {
	    socket.emit('getUserName', dateCodes[2]);
	    
	    socket.on('userNameResponse', function(name) {
		label3.textContent = "Vill du dela din kontaktinformation med " + name + "?";
	    });
	}
    });
}



function done() {
    
    let dropdowns = document.getElementsByClassName('dropdown');
    let dropdown1 = dropdowns[0];
    let dropdown2 = dropdowns[1];
    let dropdown3 = dropdowns[2];

    socket.emit('getDateCodes', localStorage.getItem('code'));

    socket.on('dateCodeResponse', function(dateCodes) {

	
	
	let result = [[dateCodes[0], dropdown1.options[dropdown1.selectedIndex].text], [dateCodes[1], dropdown2.options[dropdown2.selectedIndex].text], [dateCodes[2], dropdown3.options[dropdown3.selectedIndex].text]];
	console.log(result);
	
	
	socket.emit('addSharedUsers', result);
    });
    //window.location.href = 'http://localhost:3000/user/Done';
}
