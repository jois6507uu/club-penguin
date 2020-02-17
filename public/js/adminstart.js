
function logout() {
    window.location.href = "http://localhost:3000/";
}

function showCreateEvent() {
    let eventPopup = document.getElementById('createEventPopup');
    eventPopup.style.display = "block";
}

function hideCreateEvent() {
    let eventPopup = document.getElementById('createEventPopup');
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
    // CREATE EVENT AND PUT THINGS INTO DATABASE
    window.location.href = "http://localhost:3000/admin/eventview";
}
