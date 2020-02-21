'use strict';
const socket = io();

/// Gets the round number that is stored in localstorage, if it does not exist  inititalize it as 1.
let roundNumber = parseInt(localStorage.getItem("roundNumber"));
if (!roundNumber) {
    roundNumber = 1;
}

function goBack() {
    // ändra så att den går tillbaka till rätt adminsida
    window.location.href = 'http://localhost:3000/admin/start#admin';
}

async function initEventView() {

    let eventname  = window.location.hash.substring(1);
    let eventPopulation;

    let mainView = document.getElementById('mainView');
    let roundTitle = document.createElement('h1');
    roundTitle.setAttribute("id", "eventViewTitle");
    roundTitle.innerHTML = "Runda #" + (roundNumber);

    mainView.prepend(roundTitle);
    
    socket.emit('getEventData', eventname);

    socket.on('eventDataResponse', function(eventData) {

	initTables(eventData);
	initUsers(eventData);
    });

    if (roundNumber > 3) {
	showFinishedEventPopup();
	await new Promise(r => setTimeout(r, 3000));  // Works as sleep(3000 ms)
	exitEvent();
    }
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
	createUserContainer(view, i);
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
    profile1.setAttribute('hasProfile', 'false');
    profile2.setAttribute('hasProfile', 'false');
    profile1.onclick = function() {onSingleClick(this)};
    profile2.onclick = function() {onSingleClick(this)};
    
    container.setAttribute('class', 'table');
    container.appendChild(header);
    container.appendChild(profile1);
    container.appendChild(profile2);
    view.appendChild(container);
}

function createUserContainer(view, index) {
    let backgroundContainer = document.createElement('div');
    backgroundContainer.onclick = function() {onSingleClick(this)};
    backgroundContainer.ondblclick = function() {onDoubleClick(this)};
    backgroundContainer.setAttribute('hasProfile', 'true');
    
    let userContainer = document.createElement('div');
    userContainer.setAttribute('class', 'user');

    /// Måste hämta info om alla användare här! ///
    let imageContainer = document.createElement('img');
    imageContainer.src = '/img/aubergine_logo.png';
    
    let textContainer = document.createElement('p');
    let text = document.createTextNode('Namn, ' + index);
    textContainer.setAttribute("class", "userText");
    textContainer.appendChild(text);

    userContainer.appendChild(imageContainer);
    userContainer.appendChild(textContainer);
    backgroundContainer.appendChild(userContainer);
    view.appendChild(backgroundContainer);
}

// det är är divven ovanför usern
let selectedDiv = null;

//kommer in hit om man klickar på en div
function onSingleClick(div) {
    if (div.getAttribute('hasProfile') == "true") {
	if (selectedDiv && selectedDiv.getAttribute('hasProfile') == "true") {
	    swapUsers(div);
	} else {
	    selectedDiv = div;
	}
    } else if (selectedDiv == null){
	return;
    } else {
	moveUser(div);
    }
}

//fanns det ingen user i div och selected inte är null så flyttar vi till den divven istället
function moveUser(div) {
    div.appendChild(selectedDiv.childNodes[0]);
    selectedDiv.setAttribute('hasProfile', 'false');
    selectedDiv = null;
    div.setAttribute('hasProfile', 'true');
    sortUserList();
}

// innehöll båda divvarna en profile kommer vi in hit.
function swapUsers(div) {
    let tempUser = div.childNodes[0];
    div.appendChild(selectedDiv.childNodes[0]);
    selectedDiv.appendChild(tempUser);
    selectedDiv = null;
}

//flyttar man en div kommer man in hit så att listan med divvar sorteras uppåt
function sortUserList() {
    let sidebar = document.getElementById('sidebar');
    let total = sidebar.childElementCount;
    for (let i = 1; i < total+1; ++i) { /*tydligen är det första elementet nån form utav text som man inte ens ser när man inspectar, därför börjar jag räkna från element 1 istället för 0 */
	let current = sidebar.childNodes[i];
	if (current.getAttribute('hasProfile') == "false") {
	    if (sidebar.childNodes[i+1]) { //check så att det inte krachar vid slutet av listan
		let next = sidebar.childNodes[i+1]
		if (next.getAttribute('hasProfile') == "true") {
		    current.appendChild(next.childNodes[0]);
		    current.setAttribute('hasProfile', 'true');
		    next.setAttribute('hasProfile', 'false');
		}
	    }
	}
    }
}

function onDoubleClick(div) {
    if (div.getAttribute('hasProfile') == "true") {
	showProfile(div);
	selectedDiv = null;
    }
}

function showProfile(div) {
    let profilePopup = document.getElementById('profilePopup');
    let popupBody = profilePopup.childNodes[0];
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    profilePopup.style.display = 'block';
}

//gömmer vissa popups om man klickar utanför dom
function hidePopup() {
    let allPopups = document.getElementsByClassName('popup');
    let overlay = document.getElementsByClassName('overlay')[0];
    for (let popup of allPopups) {
	if (popup.hasAttribute("overlaySafe")) {
	    //Do nothing
	}
	else if (popup.style.display == 'block') {
	    popup.style.display = 'none';
	    overlay.style.display = 'none';
	}
    }
}

//////////SKRIV FUNKTIONERN UNDER HÄR ///////////////////


/// Denna funktion simulerar en rundomgång
async function startRound() {
    
    let startRoundPopup = document.getElementById('ongoingRoundPopup');
    let startRoundInfo = document.getElementById('ongoingRoundInfo');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    startRoundPopup.style.display = 'block';

    let header = document.createElement('h2');
    let headerText= document.createTextNode('Runda #' + roundNumber + ' pågår...');
    

    header.appendChild(headerText);

    startRoundInfo.appendChild(header);

    await new Promise(r => setTimeout(r, 5000));  // Works as sleep(5000 ms)

    startRoundInfo.removeChild(header);
    overlay.style.display = 'none';
    startRoundPopup.style.display = 'none';

    roundNumber += 1;
    localStorage.setItem("roundNumber", roundNumber);

    location.reload(); // Laddar om sidan för att placera deltagarna i sidebaren, behövs nog ändras efter workshopen.
    
    
}


/// Resets the global round number in localstorage and in this file to 1
function resetRoundNumber() {
    roundNumber = 1;
    localStorage.setItem("roundNumber", 1);
}

// Shows the popup where the admin can choose to exit the event or to cancel the popup
function showExitEvent() {
    let exitEventPopup = document.getElementById('exitEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    exitEventPopup.style.display = 'block';
}

// Hides the exit event popup
function hideExitEventPopup() {
    let exitEventPopup = document.getElementById('exitEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'none';
    exitEventPopup.style.display = 'none';
}

// Directs the browser to admin start page
function exitEvent() {
    resetRoundNumber();
    window.location.href = "http://localhost:3000/admin/start#admin";
}

// Shows a popup that tells the admin that the event is over, and he/she wil be redirected to admin start page
function showFinishedEventPopup() {
    let finishedEventPopup = document.getElementById('finishedEventPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    finishedEventPopup.style.display = 'block';
}

