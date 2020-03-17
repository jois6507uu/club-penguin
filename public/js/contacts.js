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

    socket.emit('getDateCodes', localStorage.getItem('code'));

    socket.on('dateCodeResponse', function(dateCodes) {

	let userCode = localStorage.getItem('code');
	for (let i = 0; i < dropdowns.length; ++i) {
	    if (dropdowns[i].options[dropdowns[i].selectedIndex].text == "Ja") {
		localStorage.setItem("dateCodes" + i, dateCodes[i]);
		socket.emit('shareMyCode', dateCodes[i], userCode);
	    }
	}
    });
    
    window.location.href = 'http://localhost:3000/user/Done';
}
