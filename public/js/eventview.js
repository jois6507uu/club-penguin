'use strict';
const socket = io();

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
    let view = document.getElementById('mainView');
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
    
    view.appendChild(container);
}
