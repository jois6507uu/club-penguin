'use strict';
const socket = io();

function showExitPopup() {
    let popup = document.getElementById('exitEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hideExitEvent() {
    let popup = document.getElementById('exitEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// Directs the browser to admin start page
function exitEvent() {
    let eventname  = window.location.hash.substring(1);
    removeUserData(eventname);
    window.location.href = "http://localhost:3000/admin/start#admin";
}

function removeUserData(eventname) {
    socket.emit('removeUserData', eventname);
}
