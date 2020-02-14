
function logout() {
    window.location.href = "http://localhost:3000/";
}

function showCreateEvent() {
    let eventPopup = document.getElementById('createEventPopup');
    eventPopup.style.display = "block";
}

function createNewEvent() {
    let eventName = document.getElementById('eventName');
    let eventPopulation = document.getElementById('eventPopulation');

    if (eventName.value.length < 1 || eventPopulation.value.length < 1) {
	let errorMsgNode = document.getElementById('createEventError');
	printErrorMsg(errorMsgNode, "Kan ej skapa event, var vänlig fyll i alla fält!");
	return;
    }

    initEvent(eventName.value, eventPopulation.value);
    
}

function initEvent(eventName, eventPopulation) {
    let eventButton = document.createElement('button');
    let currentEventsDiv = document.getElementById('currentEvents');
    eventButton.innerHTML = eventName;
    eventButton.setAttribute("onclick", `goToEvent(${eventName}, ${eventPopulation})`);
    
    currentEventsDiv.appendChild(eventButton);
}
