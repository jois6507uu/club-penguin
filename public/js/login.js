
let hasErrorMsg = false;
let preGenUserCodes = [129,123,234,765]; // Test array


function loginUser() {
    let userInput = document.getElementById('userInput');
    let userLogin = document.getElementById('userLogin');
    
    for (let code of preGenUserCodes) {
	if (userInput.value == code) {
	    // goto next page'
	    window.location.href = "http://localhost:3000/user";
	    return;
	}
    }
    
    // För att error-paragrafen endast ska printas en gång.
    if (!hasErrorMsg) {
	
	let errorMsg = document.createElement('p');
	let errorTxt = document.createTextNode("Ogiltig kod!")

	errorMsg.className = "errorMessage";
	
	errorMsg.appendChild(errorTxt);
	userLogin.appendChild(errorMsg);

	hasErrorMsg = true;
    }

    userInput.value = "";

}

function showAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    popup.style.display = "block";
}

function closeAdminLogin() {
    let popup = document.getElementById('adminLoginPopup');
    popup.style.display = "none";
}
