'use strict';
const socket = io();

//Så att man kan skriva .remove() på en nodelist med object
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

socket.on('newUserCreated', function(userData) {
    
    let userCodeContainers = document.getElementsByClassName('userCode');
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
	    initTables(10);
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
	if (!Number.isInteger(users[user])){
	    createUserContainer(view, user, users[user]);
	} 
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
	console.log(div.children[0].children[1]);
	console.log(div.children[0].children[1].getAttribute("hidden"));
	if (div.children[0].children[2].getAttribute("hidden") == null) {
	    showProfile(div);
	    selectedDiv = null;
	}
    }
}

function showProfile(div) {
    let profilePopup = document.getElementById('profilePopup');
    let popupBody = profilePopup.children[0];
    let overlay = document.getElementsByClassName('overlay')[0];
    
    overlay.style.display = 'block';
    profilePopup.style.display = 'block';
    
    socket.emit('getUsers');
    socket.on('profileDataResponse', function(data) {
	if (profilePopup.style.display == 'block') {
	    if (div.getAttribute("hasprofile") == "true") {
		writeInfoInPopup(popupBody, data, div);
	    }
	}
    });
}

//skriver ut all info från databasen in i profilpopupen
function writeInfoInPopup(popupBody , data, div) {
    cleanPopupProfile();
    let code = parseInt(div.children[0].children[1].textContent, 10);
    let user = data[code];
    let profileImgClone = div.children[0].children[0].cloneNode(true);
    let name = user["profile"]["name"];
    let age = user["profile"]["age"];
    let gender = user["profile"]["gender"];
    let tobacco = parseInt(user["profile"]["tobacco"], 10);
    let questions = user["profile"]["profileQuestions"];
    
    let nameAgeGenderSmokerParagraph = document.createElement('p');
    nameAgeGenderSmokerParagraph.setAttribute("class", "popupMainParagraph");
    if (tobacco == 1) {
	nameAgeGenderSmokerParagraph.appendChild(document.createTextNode(name + " " + age + "år " + gender + " Röker"));
    }
    else {
	nameAgeGenderSmokerParagraph.appendChild(document.createTextNode(name + " " + age + "år " + gender + " Röker ej"));
    }
    popupBody.appendChild(profileImgClone);
    popupBody.appendChild(nameAgeGenderSmokerParagraph);

    let profileQuestionsP = document.createElement('p');
    profileQuestionsP.setAttribute("class", "questionHeader");
    profileQuestionsP.appendChild(document.createTextNode("Profilfrågor: 1 = Stämmer inte, 7 = Stämmer"));
    popupBody.appendChild(profileQuestionsP);
    let questionsArray = ["Bjuder ofta in till samtal: ", "Att vara organiserad är viktigare än att vara anpassningsbar: ", "Har svårt att presentera sig för andra människor: ", "Har svårt att presentera sig för andra människor: ", "Anser sig själv vara mer praktisk än kreativ: ", "Resplaner är vanligtvis väl genomtänkta: ", "Humör kan ändras mycket snabbt: "]
    for (let question in questions) {
	let questionParagraph = document.createElement('p');
	questionParagraph.setAttribute("class", "popupParagraph");
	questionParagraph.appendChild(document.createTextNode(questionsArray[question] + questions[question]));
	popupBody.appendChild(questionParagraph);
    }
    socket.emit('getDateNamesFromDateCodes', code);
    socket.on('dateNamesResponse', function (response) {
	cleanQuestionsAndParagraphs();
	let dateNames = response;
	for (let i = 1; i < roundNumber; i++) {
	    let roundNumberP = document.createElement('p');
	    roundNumberP.setAttribute("class", "questionHeader");
	    roundNumberP.appendChild(document.createTextNode("Svar efter dejt " + i + " med " + dateNames[i-1]));
	    popupBody.appendChild(roundNumberP);
	    writeRoundQuestionsPopup(i, user, popupBody);
	};
    });
    
}

//rensar questionHeader och popupParagraphAnswers
function cleanQuestionsAndParagraphs() {
    let questions = document.getElementsByClassName("questionHeader").remove();
    let answers = document.getElementsByClassName("popupParagraphAnswers").remove();
    
}

//skriver ut en rundas frågor i profil popupen
function writeRoundQuestionsPopup(round, user, popupBody) {
    let roundQuestionsArray = ["Nöjdhet med dejten: ", "Var dejten en bra matchning: "];
    let roundQuestions = user["questions" + round];
    for (let question in roundQuestions) {
	let questionParagraph = document.createElement('p');
	questionParagraph.setAttribute("class", "popupParagraphAnswers");
	questionParagraph.appendChild(document.createTextNode(roundQuestionsArray[question] + roundQuestions[question]));
	popupBody.appendChild(questionParagraph);
    }
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
    socket.emit("setRoundNumber", roundNumber);
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
    let profilePopup = document.getElementById('profilePopup');
    if (profilePopup.style.display != 'block') {   
	let tables = document.getElementsByClassName('table');
	let index = 1;
	for (let table of tables) {
	    let right = table.children[1];
	    let left = table.children[2];
	    let codeRight = parseInt(right.children[0].children[1].textContent, 10);
	    let codeLeft = parseInt(left.children[0].children[1].textContent, 10);
	    socket.emit('addDateAndTable', codeRight, codeLeft, index);
	    ++index;
	}
	socket.emit('pingUserRoundInfo');
    }
}

/// Denna funktion simulerar en rundomgång
function startRound() {
    //för att ta bort föregående popup
    let sendingpopup = document.getElementById('sendingInfoPopup');
    sendingpopup.style.display = 'none';

    socket.emit('pingUserRoundStart');
    
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
    displayTimer(10, timer, function() {skipRound()}); // first argument is the duration of the timer (60 * 5 = 60 seconds * 5 = 5 minutes)
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
    let eventname  = window.location.hash.substring(1);
    removeUserData(eventname);
    window.location.href = "http://localhost:3000/admin/start#admin";
}

function removeUserData(eventname) {
    socket.emit('removeUserData', eventname);
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
