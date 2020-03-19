'use strict';
const socket = io();

var tips = ["Tänk på att hålla ögonkontakt", "Slut på samtalsämnen? Här är några: Resor, Camping, Matlagning, Coronaviruset, Musik", "Glöm inte att ge din dejt en komplimang!", "Tänk på att vara självsäker", "Börja inte prata om vädret!", "Visste du att det finns blåa bananer? Dom ska tydligen vara jättesöta!", "Oroa dig inte, arrangören kommer hitta en bra match till dig", "Det är bara dom med ömsesidigt intresse som får se varandras telefonnummer", "Glöm inte att komma hit nästa Söndag också! Om du nu inte hittar din kärlek idag ;)"]; 

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

socket.on('userPingRoundReady', function() {
    window.location.href = "http://localhost:3000/user/meeting";
});

//så att vi kan 'pinga' i consolen för att snabbare testa user delen
function ping() {
    window.location.href = "http://localhost:3000/user/meeting";
}
