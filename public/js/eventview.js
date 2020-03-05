'use strict';
const socket = io();


function ProfileComplete(profileCode, profile) {
    this.profileCode = profileCode;
    this.profile = profile;
}


socket.on('newUserCreated', function(userData) {
    let userCodeContainers = document.getElementsByClassName('userCodes');
    let userTextContainers = document.getElementsByClassName('userText');
    for (let i = 0; i < userCodeContainers.length; ++i) {
        if (userData.profileCode == userCodeContainers[i].textContent) {
            showNameAge(userData, userTextContainers[i], userCodeContainers[i]);
        }
    }
});

function showNameAge(data, textDiv, codeDiv) {
    textDiv.innerHTML = data.profile.name + ", " + data.profile.age;
    textDiv.removeAttribute("hidden");
    codeDiv.setAttribute("hidden", "");
}

/// Gets the round number that is stored in localstorage, if it does not exist  inititalize it as 1.
let roundNumber = parseInt(localStorage.getItem("roundNumber"));
if (!roundNumber) {
    roundNumber = 1;
}

// ändra så att den går tillbaka till rätt adminsida
function goBack() {
    window.location.href = 'http://localhost:3000/admin/start#admin';
}

async function initEventView() {
    let eventname  = window.location.hash.substring(1);
    let eventPopulation;

    let mainView = document.getElementById('mainView');
    let view = document.getElementById('tableGrid');
    let roundTitle = document.createElement('h1');
    roundTitle.setAttribute("id", "eventViewTitle");
    roundTitle.innerHTML = "Runda #" + (roundNumber);
    mainView.prepend(roundTitle);
    	
    socket.emit('getUsers');
    socket.on('profileDataResponse', function(users) {
	if (view.children.length < 2) {
	    initTables(Object.keys(users).length / 2);
	    initUsers(users);
	}
    });
    
    if (roundNumber > 3) {
	showFinishedEventPopup();
	await new Promise(r => setTimeout(r, 3000));  // Works as sleep(3000 ms)
	exitEvent();
    }
}

function initTables(amountOfTables) {
    let view = document.getElementById('tableGrid');
    for (let i = 0; i < amountOfTables; ++i) {
	createTableContainer(view, i);
    }
}

function initUsers(users) {
    let view = document.getElementById('sidebar');
    for (let user in users) {
	   createUserContainer(view, user, users[user]);
    }
    
}

function createTableContainer(view, index) {
    let container = document.createElement('div');
    
    let header = document.createElement('div');
    let headerP = document.createElement('p');
    let headerText = document.createTextNode(index+1);
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
    profile1.ondblclick = function() {onDoubleClick(this)};
    profile2.ondblclick = function() {onDoubleClick(this)};
    
    container.setAttribute('class', 'table');
    container.appendChild(header);
    container.appendChild(profile1);
    container.appendChild(profile2);
    view.appendChild(container);
}

function createUserContainer(view, userKey, userObj) {
    let backgroundContainer = document.createElement('div');
    backgroundContainer.onclick = function() {onSingleClick(this)};
    backgroundContainer.ondblclick = function() {onDoubleClick(this)};
    backgroundContainer.setAttribute('hasProfile', 'true');
    
    let userContainer = document.createElement('div');
    userContainer.setAttribute('class', 'user');
    
    let imageContainer = document.createElement('img');
    imageContainer.src = '/img/aubergine_logo.png';
    
    let codeContainer = document.createElement('p');
    codeContainer.setAttribute("class", "userCode");
    let nameAgeContainer = document.createElement('p');
    nameAgeContainer.setAttribute("class", "userText");

    //har ändrat så det är två divvar för text, en med kod och en med namn+ålder, den som inte visas ska vara hidden, man måste ta bort hidden helt, gå inte att sätta till false bara
    var userCode = document.createTextNode(userKey); //den slumpade koden
    nameAgeContainer.setAttribute("hidden", "");
    codeContainer.appendChild(userCode);
    if (userObj != "") {
        var nameAge = document.createTextNode(userObj.profile.name + ", " + userObj.profile.age);
	nameAgeContainer.appendChild(nameAge);
	codeContainer.setAttribute("hidden", "");
	nameAgeContainer.removeAttribute("hidden");
    }
    userContainer.appendChild(imageContainer);
    userContainer.appendChild(codeContainer);
    userContainer.appendChild(nameAgeContainer);
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
	    selectedDiv.children[0].style.backgroundColor = '#d6d6d6';
	    selectedDiv.children[0].style.border = 'solid thin black';
	    
	}
    } else if (selectedDiv == null){
	return;
    } else {
	selectedDiv.children[0].style.backgroundColor = '';
	selectedDiv.children[0].style.border = '';
	moveUser(div);
    }
}

//fanns det ingen user i div och selected inte är null så flyttar vi till den divven istället
function moveUser(div) {
    selectedDiv.children[0].style.backgroundColor = '';
    selectedDiv.children[0].style.border = '';
    div.appendChild(selectedDiv.children[0]);
    selectedDiv.setAttribute('hasProfile', 'false');
    selectedDiv = null;
    div.setAttribute('hasProfile', 'true');
    sortUserList();
}

// innehöll båda divvarna en profile kommer vi in hit.
function swapUsers(div) {
    selectedDiv.children[0].style.backgroundColor = 'white';
    selectedDiv.children[0].style.border = '';
    let tempUser = div.children[0];
    div.appendChild(selectedDiv.children[0]);
    selectedDiv.appendChild(tempUser);
    selectedDiv = null;
}

//flyttar man en div kommer man in hit så att listan med divvar sorteras uppåt
function sortUserList() {
    let sidebar = document.getElementById('sidebar');
    let total = sidebar.childElementCount;
    for (let i = 0; i < total; ++i) { /*tydligen är det första elementet nån form utav text som man inte ens ser när man inspectar, därför börjar jag räkna från element 1 istället för 0 */
	let current = sidebar.children[i];
	if (current.getAttribute('hasProfile') == "false") {
	    if (sidebar.children[i+1]) { //check så att det inte krachar vid slutet av listan
		let next = sidebar.children[i+1]
		if (next.getAttribute('hasProfile') == "true") {
		    current.appendChild(next.children[0]);
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
    cleanPopupProfile();
    let profilePopup = document.getElementById('profilePopup');
    let popupBody = profilePopup.children[0];
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    profilePopup.style.display = 'block';

    //Här måste vi hämta profilinfon från servern och displaya den
    let paragraph1 = document.createElement('p');
    let paragraph2 = document.createElement('p');
    let profileImgClone = div.children[0].children[0].cloneNode(true);
    let profileNameAgeClone = div.children[0].children[1].cloneNode(true);
    let tempInfo1 = document.createTextNode('Info om rökning');
    let tempInfo2 = document.createTextNode('Info om barn');
    
    popupBody.appendChild(profileImgClone);
    popupBody.appendChild(profileNameAgeClone);
    paragraph1.appendChild(tempInfo1);
    popupBody.appendChild(paragraph1);
    paragraph2.appendChild(tempInfo2)
    popupBody.appendChild(paragraph2);
}

function cleanPopupProfile() {
    let profilePopup = document.getElementById('profilePopup');
    let popupBody = profilePopup.children[0];
    popupBody.innerHTML = '';
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

//visar popupen om att informationen skickas till deltagarna
function sendTableInfoPopup() {
    let tables = document.getElementsByClassName('table');
    if (getFirstNonFullTable(tables) != null) {
	return popupDenied();
    }
    let popup = document.getElementById('sendingInfoPopup');
    let popupInfo = document.getElementById('sendingInfoInfo');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    popup.style.display = 'block';

    let header = document.createElement('h2');
    let headerText= document.createTextNode('Skickar ut bordsplaceringar till användarna, starta när alla är på plats');
    header.appendChild(headerText);
    popupInfo.prepend(header);

    sendTableAndName();
}

//funktion som skickar infon om vilket bord och date som deltagarna har till databasen innan rundan startar
function sendTableAndName() {
    socket.emit('getUsers');
    socket.on('profileDataResponse', function(data) {
	let tables = document.getElementsByClassName('table');
	let users = data;
	let index = 1;
	for (let table of tables) {
	    let right = table.children[1];
	    let left = table.children[2];
	    let codeRight = parseInt(right.children[0].children[1].textContent);
	    let codeLeft = left.children[0].children[1].textContent;
	    let nameRight = right.children[0].children[2].textContent.split(",")[0];
	    let nameLeft = left.children[0].children[2].textContent.split(",")[0];

	    let userRight = users[codeRight];
	    let userLeft = users[codeLeft];
	    sendInfoToDatabase(codeRight, userRight, nameLeft, index);
	    sendInfoToDatabase(codeLeft, userLeft, nameRight, index);
	    ++index;
	}
    });   
}

function sendInfoToDatabase(code, user, dateName, table) {
    if (user.profile) {
	let profile = user.profile;
	profile.dateName = dateName;
	profile.table = table;
	let profileComplete = new ProfileComplete(code, profile);
	socket.emit('addProfile', profileComplete);
    }
}

/// Denna funktion simulerar en rundomgång
function startRound() {
    //för att ta bort föregående popup
    let sendingpopup = document.getElementById('sendingInfoPopup');
    sendingpopup.style.display = 'none';
    
    let startRoundPopup = document.getElementById('ongoingRoundPopup');
    let startRoundInfo = document.getElementById('ongoingRoundInfo');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    startRoundPopup.style.display = 'block';

    let header = document.createElement('h2');
    let headerText= document.createTextNode('Runda #' + roundNumber + ' pågår...');
    header.appendChild(headerText);

    startRoundInfo.prepend(header);

    let timer = document.getElementById('timer');
    displayTimer(60 * 5, timer, function() {skipRound()}); // first argument is the duration of the timer (60 * 5 = 60 seconds * 5 = 5 minutes)
}

// displays a timer which will execute yourFunction when the timer reaches 0.
function displayTimer(duration, display, yourFunction) {
    let timer = duration, minutes, seconds;

    setInterval(function() {
	minutes = parseInt(timer / 60, 10);
	seconds = parseInt(timer % 60, 10);

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
	
        if (--timer < 0) {
	    yourFunction();
        }
    }, 1000);
}

function popupDenied() {
    let startRoundPopup = document.getElementById('ongoingRoundDenied');
    let startRoundInfo = document.getElementById('ongoingDeniedInfo');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    startRoundPopup.style.display = 'block';
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

//Go to the next round
function skipRound() {
    let startRoundPopup = document.getElementById('ongoingRoundPopup');
    let startRoundInfo = document.getElementById('ongoingRoundInfo');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'none';
    startRoundPopup.style.display = 'none';

    roundNumber += 1;
    localStorage.setItem("roundNumber", roundNumber);

    let timer = document.getElementById('timer');
    timer.innerHTML = '00:00';
    
    location.reload();
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

let bestMatch = null;

function algorithm() {
    let tables = document.getElementsByClassName('table');
    while (getFirstNonFullTable(tables) != null) {
	let table = getFirstNonFullTable(tables);
	let left = table.children[1];
	let right = table.children[2];
	if (left.getAttribute('hasProfile') == 'true') {
	    matchOnTable(table, left);
	} else if (right.getAttribute('hasProfile') == 'true') {
	    matchOnTable(table, right);
	}
	else {
	    matchInSidebar(table);
	}
    }
}

//kollar alla tables och returnar det första som inte är fullt, är alla fulla returnar det null
function getFirstNonFullTable(tables) {
    for (let table of tables) {
	let right = table.children[1];
	let left = table.children[2];
	if (right.getAttribute('hasProfile') == 'false' || left.getAttribute('hasProfile') == 'false') {
	    return table;
	}
    }
    return null;
}

function matchOnTable(table, tableDiv) {
    let sidebarDivs = document.getElementById('sidebar').children;
    let tableAge = getAgeFromProfile(tableDiv);
    for (let sidebarDiv of sidebarDivs) {
	if (sidebarDiv.getAttribute('hasProfile') == 'true') {
	    let sidebarAge = getAgeFromProfile(sidebarDiv);
	    if (bestMatch == null) {
		bestMatch = sidebarDiv;
	    }
	    else if (Math.abs(getAgeFromProfile(bestMatch) - tableAge) > Math.abs(sidebarAge - tableAge)) {
		bestMatch = sidebarDiv;
	    }
	}
    }
    if (table.children[1].getAttribute('hasProfile') == 'false') {
	table.children[1].appendChild(bestMatch.children[0]);
	table.children[1].setAttribute('hasProfile', 'true');
	bestMatch.setAttribute('hasProfile', 'false');
    } else {
	table.children[2].appendChild(bestMatch.children[0]);
	table.children[2].setAttribute('hasProfile', 'true');
	bestMatch.setAttribute('hasProfile', 'false');
    }
    bestMatch = null;
}

//Assumes table is empty
function matchInSidebar(table) {
    let sidebarDivs = document.getElementById('sidebar').children;
    let index = getFirstSidebarProfile();
    let indexAge = getAgeFromProfile(sidebarDivs[index]);
    for (let i = parseInt(index, 10)+1; i < sidebarDivs.length; ++i) {
	if (sidebarDivs[i].getAttribute('hasProfile') == 'true') {
	    let sidebarAge = getAgeFromProfile(sidebarDivs[i]);
	    if (bestMatch == null) {
		bestMatch = sidebarDivs[i];
	    }
	    else if (Math.abs(getAgeFromProfile(bestMatch) - indexAge) > Math.abs(sidebarAge - indexAge)) {
		bestMatch = sidebarDivs[i];
	    }
	}
    }
    table.children[1].appendChild(bestMatch.children[0]);
    table.children[2].appendChild(sidebarDivs[index].children[0]);
    table.children[1].setAttribute('hasProfile', 'true');
    table.children[2].setAttribute('hasProfile', 'true');
    bestMatch.setAttribute('hasProfile', 'false');
    sidebarDivs[index].setAttribute('hasProfile', 'false');
    bestMatch = null;
}

function getFirstSidebarProfile() {
    let sidebarDivs = document.getElementById('sidebar').children;
    for (let index in sidebarDivs) {
	if (sidebarDivs[index].getAttribute('hasProfile') == 'true') {
	    return index;
	}
    }
}

//divven måste vara den utanför profilen och måste innehålla en profil, children 1 måste vara namn/ålder
//returnar ålder som int inte str
function getAgeFromProfile(div) {
    let info = div.children[0].children[2].textContent;
    let strAge = info.split(",").pop();
    return parseInt(strAge, 10);
}
