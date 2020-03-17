'use strict';
const socket = io();

socket.emit('getUserData', localStorage.getItem("code"));

socket.on('userDataResponse', function (data, roundNumberResp) { 
    if (localStorage.getItem("code") == data["profile"]["code"]) {
        document.getElementById("tableNumber").innerHTML = data["profile"]["table"];
	let date;
	if (roundNumberResp == 1) {
	    date = data["profile"]["dateCode1"];
	} else if (roundNumberResp == 2) {
	    date = data["profile"]["dateCode2"];
	} else if (roundNumberResp == 3) {
	    date = data["profile"]["dateCode3"];
	} else {
	    console.log("roundNumber is not 1-3");
	}

	socket.emit('getUserName', date);

	socket.on('userNameResponse', function(dateName) {
	    document.getElementById("meetingName").innerHTML = dateName;
            
	});
	
        document.getElementById("table"+ data["profile"]["table"]).style.background = "cyan";
    }
})

socket.on('userPingRoundStart', function() {     
    window.location.href = 'http://localhost:3000/user/dating'
}); 

var c = document.getElementById("stage");
var stage = c.getContext("2d");
stage.font = "90px arial";
stage.fillText("stage", 30, 100);


// -------------------------------------------------
// Tillfällig funktion för att kunna påskynda testet
function ping() {
    window.location.href = 'http://localhost:3000/user/dating';
}

