'use strict';
const socket = io();

function timer() {
    var totSec = 301;
    var totalSeconds = totSec;
    var timeInterval = setInterval(countAndDisplay, 1000);

    function countAndDisplay() {
        totalSeconds = totalSeconds - 1;
        var seconds = totalSeconds % 60;
        var minutes = Math.floor((totalSeconds / 60) % 60); // Ser till så att det bara är hela minuter som visas.
        if (minutes.toString().length < 2) minutes = "0" + minutes;
        if (seconds.toString().length < 2) seconds = "0" + seconds;
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
	socket.on('userPingRoundEnd', function() {
	    window.location.href = 'http://localhost:3000/user/evaluationQuestions';
	});
    }
}

//reason for having two socket on is if we would happen to be outside of the function when the ping arrives (for example if the ping arrvies too quickly)
socket.on('userPingRoundEnd', function() {
    console.log("ping");
    window.location.href = 'http://localhost:3000/user/evaluationQuestions';
});

window.onload = timer();


