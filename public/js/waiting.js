'use strict';
const socket = io();


socket.on('userPingRoundReady', function() {
    window.location.href = "http://localhost:3000/user/meeting";
});

//så att vi kan 'pinga' i consolen för att snabbare testa user delen
function ping() {
    window.location.href = "http://localhost:3000/user/meeting";
}
