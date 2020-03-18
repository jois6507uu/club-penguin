'use strict';
const socket = io();

var tips = ["tips1", "tips2", "tips3"]; 

let nummer = 0;
let random = Math.floor(Math.random() * tips.length);
document.getElementById("smallTips").innerHTML = tips[random];

setInterval(function () {
    let rand = Math.floor(Math.random() * tips.length);
    while (nummer == rand) {
        rand = Math.floor(Math.random() * tips.length);
    }
    document.getElementById("smallTips").innerHTML = tips[rand];
    nummer = rand;
}, 10000);




//"väntar på ping" (för workshop)

socket.on('userPingRoundReady', function() {
    window.location.href = "http://localhost:3000/user/meeting";
});
