function timer() {
    var totSec = 11;
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
            window.location.href = 'http://localhost:3000/user/contacts';
        }
    }

}
window.onload = timer(); // Tillfällig. Timern ska starta när den får en ping från arrangören
