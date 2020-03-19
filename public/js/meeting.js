'use strict';
const socket = io();

/*function timer() {
    var totSec = 10; // Kanske kan vara timer(totSec) ifall arrangören vill ändra tiden?
    var totalSeconds = totSec;
    timeInterval = setInterval(countAndDisplay, 1000);

    function countAndDisplay() {
        totalSeconds = totalSeconds - 1;
        var seconds = totalSeconds % 60;
        var minutes = Math.floor((totalSeconds / 60) % 60); // Ser till så att det bara är hela minuter som visas.
        if (minutes.toString().length < 2) minutes = "0" + minutes;
        if (seconds.toString().length < 2) seconds = "0" + seconds;
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        if (totalSeconds == 0) {
            clearInterval(timeInterval);
            // Lägg till adress till frågor efter date
            window.location.href = 'http://localhost:3000/user/dating';
        }
    }

}
window.onload = timer(); // Tillfällig. Timern ska starta när den får en ping från arrangören
*/

socket.emit('getUserData', localStorage.getItem("code"));

socket.on('userDataResponse', function (data) {
    console.log(localStorage.getItem("code"), data.code);   
    if (localStorage.getItem("code") == data["profile"]["code"]) {
        document.getElementById("tableNumber").innerHTML = data["profile"]["table"];
	let date;
	let roundNumber = localStorage.getItem("RoundNumber");
	if (roundNumber == 0) {
	    date = data["profile"]["dateCode1"];
	    console.log("case 1");
	} else if (roundNumber == 1) {
	    console.log("case 2");
	    date = data["profile"]["dateCode2"];
	} else {
	    console.log("case 3");
	    date = data["profile"]["dateCode3"];
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

