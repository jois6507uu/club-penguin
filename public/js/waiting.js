'use strict';
const socket = io();


//"väntar på ping" (för workshop)

socket.on('userPingRoundReady', function() {
    window.location.href = "http://localhost:3000/user/meeting";
});
