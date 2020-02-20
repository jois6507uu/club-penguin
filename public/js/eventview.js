'use strict';
const socket = io();

function goBack() {
    // ändra så att den går tillbaka till rätt adminsida
    window.location.href = 'http://localhost:3000/admin/start#admin';
}

function initEventView() {

    let eventname  = window.location.hash.substring(1);
    let eventPopulation;
   
    socket.emit('getEventData', eventname);

    socket.on('eventDataResponse', function(eventData) {

	initTables(eventData);
	initUsers(eventData);
    });
}

function initTables(eventPopulation) {
    let view = document.getElementById('tableGrid');
    for (let i = 0; i < eventPopulation / 2; ++i) {
	createTableContainer(view, i);
    }
}

function initUsers(eventPopulation) {
    let view = document.getElementById('sidebar');
    for (let i = 0; i < eventPopulation; ++i) {
	createUserContainer(view);
    }
    
}

function createTableContainer(view, index) {
    let container = document.createElement('div');
    
    let header = document.createElement('div');
    let headerP = document.createElement('p');
    let headerText = document.createTextNode("Table " + (index+1));
    header.setAttribute('class', 'tableHeaders');
    header.appendChild(headerP);
    headerP.appendChild(headerText);
    
    let profile1 = document.createElement('div');
    let profile2 = document.createElement('div');
    profile1.setAttribute('class', 'emptyUserLeft');
    profile2.setAttribute('class', 'emptyUserRight');
    
    profile1.onclick = function() {moveUser(this)};
    profile2.onclick = function() {moveUser(this)};
    
    container.setAttribute('class', 'table');
    container.appendChild(header);
    container.appendChild(profile1);
    container.appendChild(profile2);
    view.appendChild(container);
}

function createUserContainer(view) {
    let backgroundContainer = document.createElement('div');
    let container = document.createElement('div');
    
    backgroundContainer.onclick = function() {selectedUser(this)};
    container.setAttribute('class', 'user');
    
    let imageContainer = document.createElement('img');
    imageContainer.src = '/img/aubergine_logo.png';
    
    let textContainer = document.createElement('p');
    
    /// Måste hämta info om alla användare här! ///
    let text = document.createTextNode('Namn, ålder');

    textContainer.setAttribute("class", "userText");
    textContainer.appendChild(text);

    container.appendChild(imageContainer);
    container.appendChild(textContainer);
    backgroundContainer.appendChild(container);
    view.appendChild(backgroundContainer);
}

/* gör så att tabledivvarna har en check om det finns en bild i dom eller inte så att man inte kan appenda ett barn i moveUser om dom har det
*/
let selectedUserDiv;

function selectedUser(user) {
    selectedUserDiv = user.childNodes[0];
}

function moveUser(tableDiv) {
    
    if (!selectedUserDiv) {
	return;
    }

    tableDiv.appendChild(selectedUserDiv);
    
}
