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
            window.location.href = 'http://localhost:3000/user/evaluationQuestions';
        }
    }

}

window.onload = timer(); // Tillfällig. Timern ska starta när den får en ping från arrangören
*/

socket.on('userPingRoundStart', function() {
    let popup = document.getElementById('timerPopup');

    popup.style.display = 'block';

    let timer = document.getElementById('timer');
    displayTimer(10, timer, function() {skipRound()});
}); 


// -------------------------------------------------
// Tillfällig funktion för att kunna påskynda testet

function nextPage() {
    // Lägg till adress till frågor efter date
    // window.location.href = 'http://localhost:3000/user/...'; 
}

// -------------------------------------------------




function displayTimer(duration, display, yourFunction) {
    let timer = duration, minutes, seconds;

    setInterval(function() {
	minutes = parseInt(timer / 60, 10);
	seconds = parseInt(timer % 60, 10);

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
	
        if (--timer < 0) {
	    yourFunction();
        }
    }, 1000);
}


function skipRound() {
    window.location.href = "http://localhost:3000/user/evaluationQuestions";
}
