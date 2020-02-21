// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("doneButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// When the user clicks on the button, open the modal
btn.onclick = async function () {
    modal.style.display = "block";
    await sleep(10000);
    console.log("väntat 10 sek");
    window.location.href = 'http://localhost:3000/user/round';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}