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
	createTableContainer(view);
    }
}

function initUsers(eventPopulation) {
    let view = document.getElementById('sidebar');
    for (let i = 0; i < eventPopulation; ++i) {
	createUserContainer(view);
    }
    
}

function createTableContainer(view) {
    let container = document.createElement('div');
    container.setAttribute('class', 'table');
    view.appendChild(container);
}

function createUserContainer(view) {
    let container = document.createElement('div');
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
    view.appendChild(container);
}
