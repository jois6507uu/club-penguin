
let preGenUserCodes = [129,123,234,765]; // Test array
let preGenAdminLogin = ["admin", "password"];



function loginUser() {
    let userInput = document.getElementById('userInput');
    let userLogin = document.getElementById('userLogin');
    let errorMsgNode = document.getElementById('userError');
    
    for (let code of preGenUserCodes) {
	if (userInput.value == code) {
	    // goto next page'
	    window.location.href = "http://localhost:3000/user";
	    return;
	}
    }
    printErrorMsg(errorMsgNode,"Ogitltig kod!");
    userInput.value = "";

}

function showAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    popup.style.display = "block";
}

function closeAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    let errorMsg = document.getElementById('adminError');
    popup.style.display = "none";
    if (errorMsg.childNodes[0]) {
	errorMsg.removeChild(errorMsg.childNodes[0]);
    }
}

function loginAdmin() {
    let adminUsername = document.getElementById('adminUsername');
    let adminPassword = document.getElementById('adminPassword');
    let errorMsgNode = document.getElementById('adminError');
    
    if (preGenAdminLogin[0] == adminUsername.value && preGenAdminLogin[1] == adminPassword.value) {
	window.location.href = "http://localhost:3000/admin/start"
    } else {
	printErrorMsg(errorMsgNode, "Felaktigt lösenord");
	adminUsername.value = "";
	adminPassword.value = "";
    }
    
}
