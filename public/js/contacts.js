'use strict';
const socket = io();

function onLoad() {
    let labels = document.getElementsByClassName('label');

    let label1 = labels[0];
    let label2 = labels[1];
    let label3 = labels[2];
    
    let userCode = localStorage.getItem('code');

    socket.emit('getDateNamesFromCodes', userCode);

    socket.on('dateNamesResponse', function(code, dateNames) {
	if (userCode == code) {
	    label1.textContent = "Vill du dela din kontaktinformation med " + dateNames[0] + "?";
	    label2.textContent = "Vill du dela din kontaktinformation med " + dateNames[1] + "?";
	    label3.textContent = "Vill du dela din kontaktinformation med " + dateNames[2] + "?";
	}
    });
}



function done() {
    
    let dropdowns = document.getElementsByClassName('dropdown');

    socket.emit('getDateCodes', localStorage.getItem('code'));

    socket.on('dateCodeResponse', function(code, dateCodes) {
	if (code = localStorage.getItem('code')) {
	    let dates = []
	    let userCode = localStorage.getItem('code');
	    for (let i = 0; i < dropdowns.length; ++i) {
		if (dropdowns[i].options[dropdowns[i].selectedIndex].text == "Ja") {
		    dates.push(dateCodes[i]);
		    socket.emit('shareMyCode', dateCodes[i], userCode);
		}
		
	    }
	    localStorage.setItem("dateCodes", JSON.stringify(dates));
	}
	window.location.href = 'http://localhost:3000/user/Done';
    });
}
