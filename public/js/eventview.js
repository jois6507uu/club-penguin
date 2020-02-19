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
    
    let picture1 = document.createElement('div');
    let picture2 = document.createElement('div');
    picture1.setAttribute('class', 'emptyUserLeft');
    picture2.setAttribute('class', 'emptyUserRight');
    
    
    container.setAttribute('class', 'table');
    container.appendChild(header);
    container.appendChild(picture1);
    container.appendChild(picture2);
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
