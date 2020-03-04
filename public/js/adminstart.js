'use strict';
const socket = io();


function Event(eventName, eventPopulation, userArray) {
    this.eventName = eventName;
    this.eventPopulation = eventPopulation;
    this.userArray = userArray; // alla användar-koder (endast koder) i en array
}

function User(userCode) {
    this.userCode = userCode;
}

function getEvents() {
    let username = window.location.hash.substring(1);
    socket.emit('loadEvents', username);
    socket.on('getEvents', function(events) {
	console.log(events);
    });
}


function logout() {
    window.location.href = "http://localhost:3000/";
}

function showCreateEvent() {
    let eventPopup = document.getElementById('createEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    eventPopup.style.display = "block";
}

function hideCreateEvent() {
    let eventPopup = document.getElementById('createEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'none';
    eventPopup.style.display = 'none';
}

function createNewEvent() {
    let eventName = document.getElementById('eventName');
    let eventPopulation = document.getElementById('eventPopulation');
    let currentEventsDiv = document.createElement('currentEvents');
    let errorMsgNode = document.getElementById('createEventError');

    if (eventName.value.length < 1 || eventPopulation.value.length < 1) {
	printErrorMsg(errorMsgNode, "Var vänlig fyll i alla fält!");
    } else if (eventPopulation.value < 3) {
	printErrorMsg(errorMsgNode, "Ett event måste ha 3 eller fler deltagare");
    } else {
	let buttons = document.getElementsByClassName('eventButtons');
	for (let child = 0; child < buttons.length; child++) {
	    if (buttons[child].value == eventName.value) {
		printErrorMsg(errorMsgNode, "Finns redan ett event med det namnet");
		return;
	    }
	}
	initEvent(eventName.value, eventPopulation.value);
	hideCreateEvent();
    }
}

function initEvent(eventName, eventPopulation) {
    let currentEventsDiv = document.getElementById('currentEvents');
    let eventButton = document.createElement('button');
    let linebreak = document.createElement('br');
    let eventNameInside = document.createTextNode(`${eventName}`);
    eventButton.setAttribute("value", `${eventName}`);
    eventButton.setAttribute("class", "eventButtons");
    eventButton.setAttribute("onclick", `goToEvent('${eventName}', '${eventPopulation}')`);
    eventButton.appendChild(eventNameInside);
    
    currentEventsDiv.appendChild(eventButton);
    currentEventsDiv.appendChild(linebreak);
}

function goToEvent(eventName, eventPopulation) {
    let userArray = [];
    for (let i = 0; i < 20; i++) {
	let rand = Math.floor((Math.random() * 90000) + 9999);
	let user = new User(rand);
	userArray[i] = rand;
	socket.emit('addUser', user); //skriver koden i users.json
    }
    let event = new Event(eventName, eventPopulation, userArray);
    socket.emit('addEvent', event);
    window.location.href = "http://localhost:3000/admin/eventview" + '#' + eventName;
}
