'use strict';
const socket = io();

let preGenUserCodes = [129,123,234,765]; // Test array

function loginUser() {
    let userInput = document.getElementById('userInput');
    let userLogin = document.getElementById('userLogin');
    let errorMsgNode = document.getElementById('userError');

    socket.emit('getUserCodes');
    socket.on('returnUserCodes', function(userCodes) {
	for (let code of userCodes) {
	    if (userInput.value == code) {
		window.location.href = "http://localhost:3000/user/profile";
		return;
	    }
	}
	printErrorMsg(errorMsgNode,"Ogitltig kod!");
	userInput.value = "";	
    });
}

function showAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'block';
    popup.style.display = "block";
}

function closeAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    let errorMsg = document.getElementById('adminError');
    popup.style.display = "none";
    if (errorMsg.childNodes[0]) {
	errorMsg.removeChild(errorMsg.childNodes[0]);
    }
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.style.display = 'none';
}

function loginAdmin() {
    let adminUsername = document.getElementById('adminUsername');
    let adminPassword = document.getElementById('adminPassword');
    let errorMsgNode = document.getElementById('adminError');
    
    socket.emit('checkLogin', adminUsername.value, adminPassword.value);

    socket.on('adminLoginRes', function(loginOk) {
	let login = loginOk;
	
	if (login) {
	    window.location.href = "http://localhost:3000/admin/start" + '#' + adminUsername.value;
	    
	} else {
	    printErrorMsg(errorMsgNode, "Felaktigt lösenord");
	    adminUsername.value = "";
	    adminPassword.value = "";
	}
    });
        
}
