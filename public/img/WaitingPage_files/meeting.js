function timer() {
    var totSec = 100; // Kanske kan vara timer(totSec) ifall arrangören vill ändra tiden?
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

var c = document.getElementById("stage");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.rect(50, 20, 200, 15);
ctx.fillStyle = "black";
ctx.fill();


window.onload = timer(); // Tillfällig. Timern ska starta när den får en ping från arrangören



// -------------------------------------------------
// Tillfällig funktion för att kunna påskynda testet

function nextPage() {
    // Lägg till adress till frågor efter date
    // window.location.href = 'http://localhost:3000/user/...'; 
}

// -------------------------------------------------